import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    // Asegúrate de usar la misma clave secreta que usaste en el backend
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
