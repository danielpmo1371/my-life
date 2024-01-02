/* eslint-disable import/no-anonymous-default-export */
import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export function getCrudRestApi(dbEntityName: keyof PrismaClient) {
  const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

  const prismaEntity = prisma[dbEntityName] as any;

  const getUserFromSession = async () => {
    const session = await getSession();
    const user = session?.user;

    return user;
  };

  const getAllForUser = async (global?: boolean) => {
    const user = await getUserFromSession();

    if (!user) return;

    const filterParentId = (result: any[]) => {
      return result.filter((x: { parentId: any }) => !x.parentId);
    };

    if (global) {
      return await prismaEntity.findMany().then(filterParentId);
    }

    return await prismaEntity
      .findMany({
        where: { ownerEmail: { equals: user.email } },
      })
      .then(filterParentId);
  };

  const getChildrenFor = async (parentId: string) => {
    const user = await getUserFromSession();
    if (!user) return;
    return await prismaEntity.findMany({
      where: {
        ownerEmail: { equals: user.email },
        OR: [
          { parentId: { equals: parentId } },
          { id: { equals: parentId.toString() } },
        ],
      },
    });
  };

  const getItemById = async (itemId: string) => {
    const user = await getUserFromSession();
    if (!user) return;
    return await prismaEntity.findUniqueOrThrow({
      where: {
        _id: { equals: itemId.toString() },
      },
    });
  };

  return {
    GET: async function (
      request: NextRequest,
      res: { json: (arg0: any) => void }
    ) {
      const user = await getUserFromSession();

      const itemId = request.nextUrl.searchParams.get("itemId") as string;
      const parentId = request.nextUrl.searchParams.get("parentId") as string;
      const isGlobal =
        (request.nextUrl.searchParams.get("global") as string) === "true";

      if (!user) return;

      let dbResponse;
      try {
        await prisma.$connect();

        if (itemId) {
          dbResponse = await getItemById(itemId);
        } else if (parentId) {
          dbResponse = await getChildrenFor(parentId);
        } else {
          dbResponse = await getAllForUser(isGlobal);
        }

        prisma.$disconnect();
        return Response.json(dbResponse);
      } catch (e) {
        console.error(e);
      }
    },
    POST: async function (request: Request) {
      const user = await getUserFromSession();

      if (!user) return;

      const res = await request.json();
      if (!res.id) {
        try {
          await prisma.$connect();

          await prismaEntity.create({ data: res });

          const dbResponse = await prismaEntity.findMany({
            where: { ownerEmail: { equals: user.email } },
          });

          prisma.$disconnect();
          // return projects;
          return Response.json(dbResponse);
        } catch (e) {
          console.error(e);
        }
        return Response.json({ res });
      }
      try {
        await prisma.$connect();

        const objToSave = getObjectToSave(res);

        const updateResponse = await prismaEntity.update({
          data: objToSave,
          where: {
            id: res.id,
          },
        });

        console.log(updateResponse);

        const dbResponse = await prismaEntity.findMany({
          where: { ownerEmail: { equals: user.email } },
        });

        prisma.$disconnect();
        // return projects;
        return Response.json(dbResponse);
      } catch (e) {
        console.error(e);
      }
      return Response.json({ res });
    },
    DELETE: async function (request: Request) {
      const user = await getUserFromSession();

      if (!user) return;

      const res = await request.json();

      if (!res.id) return;

      try {
        await prisma.$connect();

        await prismaEntity.delete({ where: { id: res.id } });

        const dbResponse = await prismaEntity.findMany({
          where: { ownerEmail: { equals: user.email } },
        });
        prisma.$disconnect();

        return Response.json(dbResponse);
      } catch (e) {
        console.error(e);
      }
      return Response.json({ res });
    },
  };
}

function getObjectToSave<T extends { id?: string | undefined }>(newEntity: T) {
  let result;
  result = { ...newEntity };
  delete result.id;
  return result;
}
