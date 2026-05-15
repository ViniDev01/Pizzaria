import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";
import { Readable } from "node:stream";

interface ProductProps{
    name: string;
    description: string;
    price: number;
    category_id: string;
    imageBuffer: Buffer;
    imageName: string;
}

class CreateProductService {
    async execute({ name, description, price, category_id, imageBuffer, imageName}: ProductProps) {

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: category_id
            }
        })

        if(!categoryExists) {
            throw new Error("Categoria não encontrada");
        }

        let bannerUrl = "";

        try {

            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "products",
                    resource_type: "image",
                    public_id: `${Date.now()}-${imageName.split(".")[0]}`
                }, (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                });

                const bufferStream = Readable.from(imageBuffer);
                bufferStream.pipe(uploadStream);

            })

            bannerUrl = result.secure_url;

        }catch(error) {
            console.log(error);
            throw new Error("Erro ao fazer o upload da imagem!");
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                description,
                price,
                banner: bannerUrl,
                category_id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                banner: true,
                category_id: true,
                createdAt: true,
            }
        });


        return product;
    }
}

export { CreateProductService };