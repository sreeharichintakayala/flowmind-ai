-- AlterTable
ALTER TABLE "AIProjectPlan" ADD COLUMN     "generatedTasks" JSONB;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
