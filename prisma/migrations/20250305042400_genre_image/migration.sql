-- CreateTable
CREATE TABLE "genre_image" (
    "id" SERIAL NOT NULL,
    "genreId" INTEGER NOT NULL,
    "is_main" BOOLEAN NOT NULL,

    CONSTRAINT "genre_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "genre_image" ADD CONSTRAINT "genre_image_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
