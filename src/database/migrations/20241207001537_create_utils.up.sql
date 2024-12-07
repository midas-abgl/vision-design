CREATE OR REPLACE FUNCTION generate_tsid(table_name TEXT) RETURNS BIGINT AS
$$
DECLARE
    C_MILLI_PREC          BIGINT := 10 ^ 3;
    C_RANDOM_LEN          BIGINT := 2 ^ 12;
    C_TSID_EPOCH          BIGINT := 1733011200; -- 2024-12-01 00:00:00

    C_TIMESTAMP_COMPONENT BIGINT := floor((extract('epoch' from clock_timestamp()) - C_TSID_EPOCH) * C_MILLI_PREC);
    C_RANDOM_COMPONENT    BIGINT := floor(random() * C_RANDOM_LEN);
    C_COUNTER_COMPONENT   BIGINT;
    seq_name              TEXT;
BEGIN
    seq_name := table_name || '_tsid_seq';

    -- Check if the sequence already exists
    IF NOT EXISTS (SELECT 1
                   FROM pg_catalog.pg_sequences
                   WHERE sequencename = seq_name
                     AND schemaname = 'public') THEN
        -- Create the sequence if it doesn't exist
        EXECUTE format('CREATE SEQUENCE %I MAXVALUE 1024 AS SMALLINT CYCLE', seq_name);
    END IF;

    EXECUTE format('SELECT nextval(%L)', 'public."' || seq_name || '"') INTO C_COUNTER_COMPONENT;

    C_COUNTER_COMPONENT := C_COUNTER_COMPONENT - 1;

    RETURN ((C_TIMESTAMP_COMPONENT << 22) | (C_RANDOM_COMPONENT << 10) | C_COUNTER_COMPONENT);
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION updated_at() RETURNS TRIGGER AS
$$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
