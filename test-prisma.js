const { PrismaClient } = require("@prisma/client");

try {
  const prisma = new PrismaClient();
  console.log("Prisma initialized successfully");
} catch (err) {
  console.error(err);
}
