-- SELECT column_name,data_type
-- FROM information_schema.columns
-- WHERE table_name = 'task';

--query to check constraint on complete table
SELECT constraint_name FROM information_schema.table_constraints
    WHERE table_name='task'


--query to get constrainy name of each field in front of each column
SELECT
  cols.column_name,
  cols.data_type,
  cols.character_maximum_length AS max_length,
  cols.is_nullable,
  (
    SELECT string_agg(tc.constraint_name, ', ')
    FROM information_schema.constraint_column_usage AS ccu
    JOIN information_schema.table_constraints AS tc
    ON ccu.constraint_name = tc.constraint_name
    WHERE ccu.table_name = 'task' AND ccu.column_name = cols.column_name
  ) AS constraints
FROM information_schema.columns AS cols
WHERE cols.table_name = 'task';
