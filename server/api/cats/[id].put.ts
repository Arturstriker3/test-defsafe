import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  
  const params = event.context.params;
  if (!params || !params.id) {
    return {
      status: 400,
      body: { error: 'ID do gato não fornecido.' }
    }
  }
  const { id } = params; // Obtendo o ID do gato a partir dos parâmetros da rota
  const body = await readBody(event) // Lendo os dados da requisição

  try {
    // Verificar se o gato existe
    const existingCat = await prisma.cat.findUnique({
      where: { id: Number(id) }
    })

    if (!existingCat) {
      return {
        status: 404,
        body: { error: 'Gato não encontrado.' }
      }
    }

    // Atualizar os dados do gato
    const updatedCat = await prisma.cat.update({
      where: { id: Number(id) },
      data: {
        ...body // Presumindo que os dados de atualização estão no corpo da requisição
      }
    })

    // Retornar o gato atualizado
    return {
      status: 200,
      body: updatedCat
    }
  } catch (error) {
    return {
      status: 500,
      body: { error: (error as Error).message }
    }
  } finally {
    await prisma.$disconnect()
  }
})