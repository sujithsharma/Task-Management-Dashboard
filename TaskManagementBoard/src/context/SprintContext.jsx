import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the sprint data
const SprintContext = createContext();

// Provider component to wrap around the app and provide sprint data
export const SprintProvider = ({ children }) => {
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch sprints from the API
    useEffect(() => {
        const fetchSprints = async () => {
            try {
                const response = await fetch('http://localhost:3000/sprints');
                if (!response.ok) {
                    throw new Error('Failed to fetch sprints');
                }
                const data = await response.json();
                setSprints(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSprints();
    }, []);

    // Function to update the sprint data in the state after a successful task addition
    const updateSprints = (sprintNumber, updatedColumns) => {
        setSprints((prevSprints) =>
            prevSprints.map((sprint) => {
                if (sprint.id === `sprint_${sprintNumber}`) {
                    return {
                        ...sprint,
                        columns: updatedColumns,
                    };
                }
                return sprint;
            })
        );
    };

    // Move task between columns
    const moveTask = async (taskId, fromColumnId, toColumnId) => {
        // Update local state first
        setSprints((prevSprints) =>
            prevSprints.map((sprint) => {
                const fromColumn = sprint.columns.find((col) => col.id === fromColumnId);
                const toColumn = sprint.columns.find((col) => col.id === toColumnId);

                if (!fromColumn || !toColumn) {
                    console.error("Column not found.");
                    return sprint;
                }

                const taskToMove = fromColumn.tasks.find((task) => task.id === taskId);
                if (!taskToMove) {
                    console.error("Task not found.");
                    return sprint;
                }

                // Remove task from the source column
                fromColumn.tasks = fromColumn.tasks.filter((task) => task.id !== taskId);
                // Add task to the destination column
                toColumn.tasks = [...toColumn.tasks, taskToMove];

                return { ...sprint };  // Return a new sprint object with updated columns
            })
        );

        // Now update the server with the changed sprint
        try {
            // Find the sprint that contains the moved task
            const updatedSprint = sprints.find((sprint) =>
                sprint.columns.some((col) => col.tasks.some((task) => task.id === taskId))
            );

            if (!updatedSprint) {
                console.error("Sprint not found.");
                return;
            }

            // Make sure the sprint object has the updated columns with the task move applied
            const response = await fetch(`http://localhost:3000/sprints/${updatedSprint.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSprint),  // Send the updated sprint object
            });

            if (!response.ok) {
                throw new Error('Failed to update tasks on the server');
            }

            console.log('Successfully updated tasks');
        } catch (err) {
            console.error('Error updating tasks on the server:', err);
        }
    };

    return (
        <SprintContext.Provider value={{ sprints, loading, error, moveTask, updateSprints }}>
            {children}
        </SprintContext.Provider>
    );
};

// Custom hook to use sprint context
export const useSprints = () => {
    return useContext(SprintContext);
};
