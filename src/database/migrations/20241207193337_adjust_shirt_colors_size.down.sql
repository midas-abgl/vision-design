UPDATE "Shirt"
SET "colors" = ARRAY(
    SELECT CASE
        WHEN LENGTH(color) > 15 THEN LEFT(color, 15)
        ELSE color
    END
    FROM unnest("colors") AS color
)
WHERE EXISTS (
    SELECT 1
    FROM unnest("colors") AS color
    WHERE LENGTH(color) > 15
);

ALTER TABLE "Shirt" ALTER COLUMN "colors" TYPE VARCHAR(15)[];
