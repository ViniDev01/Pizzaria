
import prismaClient from "../../prisma";
import { AuthUserProps } from "../../types/authUser";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"

class authUserService {
    async execute({ email, password } : AuthUserProps) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(!user) {
            throw new Error("Usuário ou senha incorretos!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Senha é obrigatório");
        }

        const token = sign({
            name: user.name,
            email: user.email
        }, `${process.env.JWT_SECRET!}`, {
            subject: user.id,
            expiresIn: "30d"
        })

        return {
            message: `Seja bem-vindo, ${user.name}!`,
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export { authUserService };