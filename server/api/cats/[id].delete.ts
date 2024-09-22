import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const params = event.context.params;
  if (!params || !params.id) {
    return {
      status: 400,
      body: { error: "ID do gato não fornecido." },
    };
  }
  const { id } = params;

  try {
    const existingCat = await prisma.cat.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCat) {
      return {
        status: 404,
        body: { error: "Gato não encontrado." },
      };
    }

    const deletedCat = await prisma.cat.delete({
      where: { id: Number(id) },
    });

    return {
      status: 200,
      body: "Gato deletado com sucesso",
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: (error as Error).message },
    };
  } finally {
    await prisma.$disconnect();
  }
});
