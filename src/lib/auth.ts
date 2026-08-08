import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export function getAuthUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];

  return verifyToken(token);
}
