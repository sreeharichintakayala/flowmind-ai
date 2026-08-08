import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(userId: string, email: string) {
  const token = jwt.sign(
    {
      userId,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: "30d",
    },
  );

  return token;
}

export function verifyToken(token: string): JwtUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUser;
  } catch (error) {
    console.log("JWT Verify Error", error);
    return null;
  }
}

export interface JwtUser {
  userId: string;
  email: string;
}
