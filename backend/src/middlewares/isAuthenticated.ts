
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token!, process.env.JWT_SECRET as string) as Payload;

        req.user_id = sub;
        
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }

    
}