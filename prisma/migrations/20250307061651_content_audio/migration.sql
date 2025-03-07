-- CreateTable
CREATE TABLE "ContentAudio" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContentAudio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentAudio" ADD CONSTRAINT "ContentAudio_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
