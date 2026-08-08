-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "complexity" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "summary" TEXT;

-- CreateTable
CREATE TABLE "TechStack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechStack" ADD CONSTRAINT "TechStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
