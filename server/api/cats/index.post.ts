import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Variáveis SUPABASE_URL e SUPABASE_KEY são obrigatórias.");
}

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  try {
    const body = await readBody(event);
    const { name, description, imageFile } = body;

    if (!imageFile) {
      return {
        status: 400,
        message: "Imagem é necessária para cadastrar o gato.",
      };
    }

    const imageName = `cat-${body.name}.jpg`;

    const imageData = imageFile.split(",")[1];
    const buffer = Buffer.from(imageData, "base64");

    try {
      const transformedBuffer = await sharp(buffer).toFormat("jpg").toBuffer();

      const { data, error } = await supabase.storage
        .from("cats")
        .upload(imageName, transformedBuffer);

      if (error) {
        throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
      }
    } catch (error) {
      console.error(error);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("cats").getPublicUrl(imageName);

    const newCat = await prisma.cat.create({
      data: {
        name,
        description,
        imageUrl: publicUrl,
      },
    });

    return {
      status: 200,
      body: newCat,
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
