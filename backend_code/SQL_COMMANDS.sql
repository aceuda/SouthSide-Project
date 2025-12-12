-- Run these commands in your MySQL database to add the login tracking columns

-- Add last_login and login_count columns to users table
ALTER TABLE southside_apparel.users 
ADD COLUMN last_login DATETIME, 
ADD COLUMN login_count INT DEFAULT 0;

-- Verify the columns were added
DESCRIBE southside_apparel.users;

-- Check admin user data
SELECT * FROM southside_apparel.users WHERE role = 'admin';
