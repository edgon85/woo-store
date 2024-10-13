import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

// Configura Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('images') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ninguna imagen' },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();

    // Procesar la imagen con sharp
    const processedBuffer = await sharp(Buffer.from(buffer))
      .resize({
        width: 800,
        height: 800,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat('webp', { quality: 80 })
      .toBuffer();

    // Convertir la imagen procesada a base64
    const base64Image = processedBuffer.toString('base64');

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/webp;base64,${base64Image}`,
      {
        folder: 'woo-products',
      }
    );

    return NextResponse.json({ urls: [result.secure_url] });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { error: 'Error al procesar la imagen' },
      { status: 500 }
    );
  }
}

/* import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

// Configura Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No se proporcionaron imágenes' },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file) => {
      const buffer = await file.arrayBuffer();

      // Procesar la imagen con sharp
      const processedBuffer = await sharp(Buffer.from(buffer))
        .resize({
          width: 800,
          height: 800,
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFormat('webp', { quality: 80 })
        .toBuffer();

      // Convertir la imagen procesada a base64
      const base64Image = processedBuffer.toString('base64');

      // Subir a Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/webp;base64,${base64Image}`,
        {
          folder: 'woo-products',
        }
      );

      return result.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    return NextResponse.json(
      { error: 'Error al procesar las imágenes' },
      { status: 500 }
    );
  }
}
 */
