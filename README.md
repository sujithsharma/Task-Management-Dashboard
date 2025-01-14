# Task-Management-Dashboard

A Kanban-style board to manage tasks across different columns (To Do, In Progress, Done). This project is built using React, Material-UI, and React DnD for drag-and-drop functionality. The board allows users to add

Features:
1)Add new tasks with title(required), description(optional), assignee, priority, and status.
2)Drag and drop tasks between columns (To Do, In Progress, Done).
3)View tasks categorized by their current status.
4)Responsive and interactive design for an intuitive user experience.

Prerequisites
To run this project locally, make sure you have the following installed:

1)Node.js (LTS version recommended) - Download here
2)npm (Node package manager, comes bundled with Node.js)

Instructions to Run the Project Locally

1. Clone the Repository - Start by cloning the repository to your local machine.

git clone https://github.com/sujithsharma/Task-Management-Dashboard.git
cd Task-Management-Dashboard

2. Install Dependencies
Run the following command to install the necessary dependencies:

npm install

3. Run the Development Server
Start the development server using this command:

npm start
This will run the project on http://localhost:4200.

4. Setup Backend (Mock data)
you can set up a simple mock server (using JSON Server or a similar tool) or adjust the API URLs for your own server if necessary. For local mock data, follow these instructions:

Install json-server:

npm install -g json-server
there is db.json file with the required data:

Start the json-server:

 npx json-server --watch db.json

This will serve the mock data at http://localhost:3000/sprints.

Architecture and Approach

1. Folder Structure:
The folder structure is organized to separate concerns and maintain scalability:

bash
Copy code
/src
  /components        # Reusable UI components like Navbar, TaskCard, ColumnDropZone
  /context           # React context for managing global state (Sprint data)
  /dialogs           # Components for handling task creation and other dialogs
  /styles            # Styled-components for custom styling
  /utils             # Utility functions (e.g., for handling API requests)
  App.js             # Main entry point for the React app
  index.js           # ReactDOM render entry

2. State Management:
React Context: The project uses a SprintContext to manage the sprint data (tasks, columns) across the app. This allows components like TaskBoard, ColumnDropZone, and TaskCard to access and update the sprint data globally.

React Hook Form: Used for managing forms, like adding a new task. It provides an easy way to handle input validation and submission.

3. Drag-and-Drop:

React DnD: The project utilizes React DnD for drag-and-drop functionality. Tasks can be moved between columns (e.g., from "To Do" to "In Progress") with seamless state updates.

4. API Interaction:

The project interacts with an external API or mock server (e.g., using JSON Server) to persist sprint data. API calls for fetching, updating, and creating tasks are handled with fetch requests.

5. UI Framework:

Material-UI: Used for building the UI components with a consistent look and feel. Buttons, Dialogs, Typography, and Cards are all from Material-UI, making the app visually appealing and user-friendly.

How It Works
Fetching Sprint Data: On component mount (useEffect), the app fetches sprint data from the server and updates the global state using React Context.

Drag-and-Drop: Tasks can be dragged and dropped between columns, with the state being updated both locally and on the server.

Adding New Tasks: Users can open the "Add New Task" dialog, input the task details, and submit the form to add the task to the correct column. This action updates both the local state and the backend.

Real-Time UI Updates: As tasks are moved between columns or new tasks are added, the UI automatically updates to reflect the changes.

Technologies Used:

React: For building the user interface.
Material-UI: For UI components and styling.
React DnD: For implementing drag-and-drop functionality.
React Context: For managing global state (tasks, sprints).
React Hook Form: For handling form state and validation.
JSON Server (optional): For mocking a backend API (for local development).


This README provides clear instructions for running the project locally, a brief explanation of the architecture, and a breakdown of the key features and components used in the project. Feel free to adjust based on any additional features or changes to the app!

