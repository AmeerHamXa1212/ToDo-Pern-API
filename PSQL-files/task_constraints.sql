-- ALTER TABLE task
-- ALTER COLUMN status TYPE VARCHAR(20);
alter table task
ADD CONSTRAINT check_status
CHECK (status IN ('PENDING', 'INPROGRESS', 'COMPLETED'));

-- alter table task
-- ADD CONSTRAINT check_priority
-- CHECK (priority IN (0, 1, 2));
