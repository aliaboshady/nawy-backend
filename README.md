  ## About The Project
  This is an Apartment listing webapp that's made using Node.JS, Express, Typescript, Next.js, and SQL Server. This is the website backend repo. And here's the [Frontend](https://github.com/aliaboshady/nawy-frontend-web) repo.
  
  In this project, I've learned so much in so little time. I'm very proud to have learned Node.JS, Express, Typescript, and Next.js in as little as 2 days.
  
  ## Completed Features
  1. Built a database to store apartments info.
  2. Created a server with 3 API endpoints to get all apartments, get 1 apartment by ID, and create a new apartment.
  3. Built a website frontend to display the data.
  
  ## Getting Started
  
  In this section, I'll explain how to set up your project to run the database, backend server, and frontend website locally.

  ### SQL Server Setup
  1. Click Start and type Computer Managment and open it.
  2. On the left hand side, find Services and Applications -> SQL Server Configuration Manager -> SQL Server Network Configuration -> Protocols for SQLEXPRESS and click on it.
  3. In the middle section, right click on TCP/IP and click on Enable, then press OK.
  4. Then right click on it again, and click on Properties.
  5. Go to IP Addresses tab and scroll to the bottom to find IPALL.
  6. Below it, set TCP Port to 1433, and press OK. Then press OK again.
  7. Then find Services and Applications -> SQL Server Configuration Manager -> SQL Server Services and click on it.
  8. In the middle section, right click on SQL Server (SQLEXPRESS), and press restart.

  ### Database Setup
  1. Download this rar [file](https://drive.google.com/file/d/1fWcVwytyWu5UV4UQdWF27SDcXJs5_RHy/view?usp=sharing), as we'll need it for installation.
  2. Open SQL Server Managment Studio (SSMS).
  3. Connect to the local network using Windows Authentication.
  4. First, extract the houses images folder in your chosen directory. We'll need to copy the directory later.
  5. Secondly, uncomment the second line (CREATE DATABASE Nawy_Apartments_DB;), highlight it, and press execute. Then comment it again.
  6. Thirdly, copy the directory of which the folder 'HousesImages' is in.
  7. Press CTRL + F, type in PATH, and replace all occurances with the copied directory.
  8. Press Execute.
  9. To make sure the database is populated, run
  ```sh
  SELECT * FROM Apartment
  SELECT * FROM Image
  ```

  ### Authentication Setup
  1. Open SQL Server Managment Studio (SSMS).
  2. In the Object Explorer, find Security -> Logins, and press right click. Then press on New Login.
  3. Set the Login Name (username) to 'admin'.
  4. Select SQL Server Authentication, and set the password to 'admin' as well, and press OK.
  5. Then disconnect from the local network.
  6. Connect again to the local network, but this time select SQL Server Authentication for the Authentication option.
  7. Enter 'admin' for both username and password.
  8. If it asks you to create a new password, just write the same password, and press OK.
  
  ### Projects Installation
  1. Clone the frontend and the backend repos.
  2. Open them both in VSCode.
  3. For both projects, open a new terminal and run
  ```sh
  npm i
  ```

  ## Start Project
  To start the project, we need to run the backend server first by running this in the backend project's terminal
  ```sh
  node server.ts
  ```
  Then in the frontend project's termial, run
  ```sh
  npm run dev
  ```
