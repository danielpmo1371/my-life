/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
export default async function GET(
  _req: any,
  res: { json: (arg0: any) => void }
) {
  try {
    await prisma.$connect();
    const projects = await prisma.projects.findMany();

    res.json(projects);
    await prisma.$disconnect();
    // res.json({ title: "title is here" });
  } catch (e) {
    console.error(e);
  }
}
