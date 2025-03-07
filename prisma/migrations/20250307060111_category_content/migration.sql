-- CreateTable
CREATE TABLE "category_content" (
    "id" SERIAL NOT NULL,
    "categoryId" BIGINT NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "category_content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_content" ADD CONSTRAINT "category_content_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_content" ADD CONSTRAINT "category_content_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
