-- CreateTable
CREATE TABLE "UserNotion" (
    "email" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "bot_id" TEXT NOT NULL,
    "duplicated_template_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "workspace_name" TEXT NOT NULL,
    "workspace_icon" TEXT NOT NULL,

    CONSTRAINT "UserNotion_pkey" PRIMARY KEY ("email")
);
