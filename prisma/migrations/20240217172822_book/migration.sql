-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "abbrev" JSONB NOT NULL,
    "author" TEXT NOT NULL,
    "chapters" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "testament" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
