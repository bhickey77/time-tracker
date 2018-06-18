CREATE TABLE entry (
	id SERIAL PRIMARY KEY,
	item VARCHAR(200) NOT NULL,
	item_date_milli_from_epoch BIGINT NOT NULL,
	entry_time_milliseconds BIGINT NOT NULL
);

CREATE TABLE project (
	id SERIAL PRIMARY KEY,
	project_name VARCHAR(200) 	
);

CREATE TABLE entry_project (
	id SERIAL PRIMARY KEY,
	entry_id INT REFERENCES entry ON DELETE CASCADE,
	project_id INT REFERENCES project ON DELETE CASCADE
);

-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('walk dog', 1528088400000, 3000000);
-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('water flowers', 1628088400000, 4000000);
-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('eat food', 1428088400000, 6120000);
-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('do laundry', 1578088400000, 700000);
-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('dishes', 1628088400000, 9000000);

-- INSERT INTO project(project_name) VALUES ('house chores');

-- INSERT INTO entry_project (entry_id, project_id) VALUES (1,1),(2,1),(3,1),(4,1),(5,1);


-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('added html', 1538088400000, 10000000);
-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('added css', 1529088400000, 12000000);
-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('worked on folder structure', 1728088400000, 15000000);
-- INSERT INTO entry (item, item_date_milli_from_epoch, entry_time_milliseconds) VALUES ('import dependencies', 1558088400000, 4000000);

-- INSERT INTO project(project_name) VALUES ('personal website');

-- INSERT INTO entry_project (entry_id, project_id) VALUES (6,2),(7,2),(8,2),(9,2);



-- SELECT entry.item, entry.item_date_milli_from_epoch, entry.entry_time_milliseconds, project.project_name FROM entry_project
-- JOIN entry ON entry.id = entry_project.entry_id
-- JOIN project ON project.id = entry_project.project_id
-- GROUP BY entry.id, project.project_name ORDER BY entry.item_date_milli_from_epoch DESC;



