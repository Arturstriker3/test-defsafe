import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()

  try {
    // Buscar todos os gatos no banco de dados
    const cats = await prisma.cat.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        adopted: true,
        createdAt: true,
        updatedAt: true
      }
    })

    // Retornar os gatos como resposta
    return {
      status: 200,
      body: cats
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
