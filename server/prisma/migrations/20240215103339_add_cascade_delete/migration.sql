-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_replytoId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_replytoId_fkey" FOREIGN KEY ("replytoId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
