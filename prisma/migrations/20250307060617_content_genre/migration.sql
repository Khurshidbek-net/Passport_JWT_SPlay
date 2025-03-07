-- CreateTable
CREATE TABLE "content_genre" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "content_genre_pkey" PRIMARY KEY ("id")
);
