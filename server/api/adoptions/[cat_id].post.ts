import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  
  const params = event.context.params;
  if (!params || !params.cat_id) {
    return {
      status: 400,
      body: { error: 'ID do gato não fornecido.' }
    }
  }

  const { cat_id } = params; // Obtendo o ID do gato a partir dos parâmetros da rota
  const body = await readBody(event) // Lendo os dados da requisição

  try {
    // Verificar se o gato existe
    const existingCat = await prisma.cat.findUnique({
      where: { id: Number(cat_id) }
    })

    if (!existingCat) {
      return {
        status: 404,
        body: { error: 'Gato não encontrado.' }
      }
    }

    // Criar a adoção
    const newAdoption = await prisma.adoption.create({
      data: {
        ...body, // Presumindo que os dados de adoção estão no corpo da requisição
        cat: { connect: { id: Number(cat_id) } } // Conectando a adoção ao gato
      }
    })

    // Retornar a adoção criada
    return {
      status: 201,
      body: newAdoption
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