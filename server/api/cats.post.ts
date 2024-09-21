import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

// Configurar Supabase
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) // Leitura dos dados da requisição
    const { name, description, imageFile } = body // Extrair os dados recebidos
    
    // Verificar se o arquivo foi enviado
    
    if (!imageFile) {
      return {
        status: 400,
        message: 'Imagem é necessária para cadastrar o gato.'
      }
    }

    // Criar um nome único para a imagem (ex: usando timestamp)
    const imageName = `cat-${Date.now()}.png`

    // Upload da imagem no Supabase Bucket
    const { data, error } = await supabase
      .storage
      .from('cats') // nome do bucket
      .upload(imageName, Buffer.from(imageFile, 'base64')) // Convertendo a imagem de base64 para Buffer

    if (error) {
      throw new Error(`Erro ao fazer upload da imagem: ${error.message}`)
    }

    // Obter a URL pública da imagem
    const { data: { publicUrl }} = supabase
      .storage
      .from('cats')
      .getPublicUrl(imageName)
    
    // Salvar o gato no banco de dados via Prisma
    const newCat = await prisma.cat.create({
      data: {
        name,
        description,
        imageUrl: publicUrl // Guardar a URL pública da imagem
      }
    })

    // Retornar o novo gato como resposta
    return {
      status: 200,
      body: newCat
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
