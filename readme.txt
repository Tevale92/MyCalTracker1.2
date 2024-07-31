MyCalTracker is a web application designed to help users track their calorie intake and expenditure. The application allows users to register, log in, and record their daily calorie consumption and calories burned. Users can view their entries in a calendar format, making it easy to track their progress over time.

User Registration: Users can create a new account by providing a username and password. The registration process stores the user's credentials in the database. The registration endpoint is /register.

User Login: Registered users can log in to their account using their username and password. Upon successful login, the user ID is stored in the browser's local storage for session management. The login endpoint is /login.

Track Calories: Users can save their daily calorie intake and calories burned. The application calculates the net calories and stores the entry in the database. The endpoint for saving an entry is /entry.

View Entries: Users can view their calorie entries in a calendar format. The calendar displays the calories consumed, calories burned, and net calories for each day. The endpoint for fetching entries is /entries.

Reset Entries: Users can reset all their entries for the current month. This action clears all entries from the database and repopulates the calendar to show the current month's view without the previous entries. The endpoint for resetting entries is /reset.

Navigate Calendar: Users can navigate through the calendar to view entries from previous or upcoming months. The calendar is updated dynamically as the user switches months.

Directory Structure: The project includes several key files. The server.js file is a Node.js server file handling API requests and database interactions. The script.js file is a JavaScript file handling client-side logic, including AJAX requests and DOM manipulation. The dashboard.html file is an HTML file displaying the calendar and providing navigation and reset buttons. The database.sql file is an SQL script for creating and managing the database schema.

Setup and Installation: To set up the application, clone the repository and navigate into the directory. Install dependencies using npm install. Set up the database by running the database.sql script in your MySQL database to create the necessary tables. Start the server using node server.js. Open the application by opening dashboard.html in your web browser.

Usage: Register a new account on the registration page. Log in using your credentials on the login page. Track your calories by entering the calories consumed and burned for the day. View your entries in the calendar on the dashboard. Navigate the calendar to view entries from different months. Reset your entries for the current month using the reset button on the dashboard.

Technologies Used: The backend is built using Node.js, Express.js, and MySQL. The frontend is built using HTML, CSS, JavaScript, jQuery, and Bootstrap.

Contributors: David Demers, Meissa Sy, Joseph Ryan Mechavez