-- Inserting data into user table
-- INSERT INTO "user" (id,name)
-- VALUES
--   (1,'Alice'),
--   (2,'Bob'),
--   (3,'Charlie');
select * from "user"

select * from task

ALTER TABLE task
ALTER COLUMN task_description TYPE VARCHAR(500);




INSERT INTO task (tid, user_id, title, task_description, status,priority)
VALUES
  (1,1, 'Task 1', 'Description for Task 1', 'PENDING', 0),
  (2,1, 'Task 2', 'Description for Task 2', 'INPROGRESS', 1),
  (3,2, 'Task 3', 'Description for Task 3', 'COMPLETED', 2),
  (4,3, 'Task 4', 'Description for Task 4', 'PENDING', 1);
  
select * from task

select "name",tid, title,task_description, status,priority
from task join "user"
on task.user_id = "user".id
where "user".name = 'Alice'


