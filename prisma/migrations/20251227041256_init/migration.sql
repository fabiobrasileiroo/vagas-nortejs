-- CreateTable
CREATE TABLE `Job` (
    `id_job` INTEGER NOT NULL AUTO_INCREMENT,
    `title_job` VARCHAR(50) NOT NULL,
    `description_job` VARCHAR(255) NOT NULL,
    `company_job` VARCHAR(100) NOT NULL,
    `company_website_job` VARCHAR(100) NOT NULL,
    `city_job` VARCHAR(100) NOT NULL,
    `state_job` VARCHAR(100) NOT NULL,
    `created_at_job` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at_job` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_job`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
