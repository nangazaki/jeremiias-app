-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `deleted_permanently` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deleted_permanently_at` DATETIME(3) NULL,
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `retention_period` DATETIME(3) NULL;
