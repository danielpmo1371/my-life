/* eslint-disable import/no-anonymous-default-export */
import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";

export function getCrudRestApi(dbEntityName: string) {
  const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

  const getUserFromSession = async () => {
    const session = await getSession();
    const user = session?.user;

    return user;
  };

  const getAllForUser = async () => {
    const user = await getUserFromSession();

    if (!user) return;

    return await prisma[dbEntityName].findMany({
      where: { ownerEmail: { equals: user.email } },
    });
  };

  return {
    GET: async function (_req: any, res: { json: (arg0: any) => void }) {
      const user = await getUserFromSession();

      if (!user) return;

      try {
        await prisma.$connect();
        const dbResponse = await getAllForUser();

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
      try {
        await prisma.$connect();

        await prisma[dbEntityName].create({ data: res });

        const dbResponse = await prisma[dbEntityName].findMany({
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

        await prisma[dbEntityName].delete({ where: { id: res.id } });

        const dbResponse = await prisma[dbEntityName].findMany({
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
