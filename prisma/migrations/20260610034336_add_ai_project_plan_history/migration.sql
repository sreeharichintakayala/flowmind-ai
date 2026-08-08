-- CreateTable
CREATE TABLE "AIProjectPlan" (
    "id" TEXT NOT NULL,
    "idea" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AIProjectPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AIProjectPlan" ADD CONSTRAINT "AIProjectPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
