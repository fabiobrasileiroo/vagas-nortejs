/*
  Warnings:

  - Added the required column `requirements_job` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_job` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule_job` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `requirements_job` VARCHAR(255) NOT NULL,
    ADD COLUMN `salary_job` INTEGER NOT NULL,
    ADD COLUMN `schedule_job` VARCHAR(20) NOT NULL;

-- CreateTable
CREATE TABLE `Comment` (
    `id_comment` INTEGER NOT NULL AUTO_INCREMENT,
    `job_id_comment` INTEGER NOT NULL,
    `author_commment` VARCHAR(100) NOT NULL,
    `content_comment` VARCHAR(255) NOT NULL,
    `created_at_comment` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at_comment` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_comment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_job_id_comment_fkey` FOREIGN KEY (`job_id_comment`) REFERENCES `Job`(`id_job`) ON DELETE RESTRICT ON UPDATE CASCADE;
