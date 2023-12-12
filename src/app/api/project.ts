/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GET(
  _req: any,
  res: { json: (arg0: any) => void }
) {
  try {
    const projects = await prisma.projects.findMany();

    res.json(projects);
  } catch (e) {
    console.error(e);
  }
}
