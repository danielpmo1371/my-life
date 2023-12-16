/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export async function GET(_req: any, res: { json: (arg0: any) => void }) {
  try {
    await prisma.$connect();
    const projects = await prisma.projects.findMany();

    await prisma.$disconnect();
    // return projects;
    return Response.json(projects);
  } catch (e) {
    console.error(e);
  }
}

export async function POST(request: Request) {
  const res = await request.json();
  return Response.json({ res });
}
