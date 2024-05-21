# Employee List Management Application

This project is a React application for managing the employee list of an organization. It allows adding, deleting, and editing employee details. The server side is implemented using .NET 6 and above.

The server is running on port 7039.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Features

1. Employee list management page including:
   - First name
   - Surname
   - Title
   - Date of Entry
   - Actions for adding, deleting, and editing employees

2. Employee form for adding/editing with the following fields:
   - First name
   - Surname
   - Identity
   - Gender
   - Date of Birth
   - Date of Commencement
   - Roles with dynamic addition:
     - Position name (from pre-defined list)
     - Management/Non-management position
     - Entry date (later than or equal to the start work date)
   
3. Search field to filter the displayed items in the list based on text input.
4. Export functionality to export the list to an Excel file for download.

### Server Side

- API implemented to save the data
- Data stored in a SQL database
- Project structure follows the layer model architecture

- ## System
The system is still under construction.
Please be patient.
For any question or problem you can contact: racheli7601226@gmail.com


## Learn More

For more information, you can refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, visit the [React documentation](https://reactjs.org/).
