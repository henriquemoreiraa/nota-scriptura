/*
  Warnings:

  - You are about to drop the `UserNotion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserNotion";

-- CreateTable
CREATE TABLE "Session" (
    "bot_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "duplicated_template_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("bot_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_access_token_key" ON "Session"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Session_duplicated_template_id_key" ON "Session"("duplicated_template_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_workspace_id_key" ON "Session"("workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_user_id_key" ON "Session"("user_id");
