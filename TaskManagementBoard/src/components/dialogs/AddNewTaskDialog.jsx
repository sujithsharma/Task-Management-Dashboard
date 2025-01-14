import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useSprints } from '../../context/SprintContext';

const AddTaskDialog = ({ open, handleClose }) => {
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm();
    const { updateSprints } = useSprints(); // Access updateSprints from context

    const onSubmit = async (data) => {
        try {
            const { status, ...taskWithoutSprintNumber } = data;
            const newTask = {
                ...taskWithoutSprintNumber,
                id: `task_${Date.now()}`,
                status,
            };

            // Fetch the current sprint data
            const response = await fetch(`http://localhost:3000/sprints/sprint_1`);
            const sprintData = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch sprint data');
            }

            // Find the column to update based on the selected status
            const updatedColumns = sprintData.columns.map((column) => {
                if (column.id === status) {
                    // Add the new task to the appropriate column
                    return {
                        ...column,
                        tasks: [...column.tasks, newTask],
                    };
                }
                return column; // Keep other columns unchanged
            });

            // Send the updated data back to the server
            const patchResponse = await fetch(`http://localhost:3000/sprints/sprint_1`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    columns: updatedColumns,
                }),
            });

            if (!patchResponse.ok) {
                throw new Error('Failed to update sprint data');
            }

            // Update the sprint data in the context after successful patch
            updateSprints(1, updatedColumns);
            reset();
            handleClose();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the form below to add a new task.
                </DialogContentText>
                <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="dense"
                        label="Title"
                        fullWidth
                        {...register('title', { required: 'Title is required' })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        {...register('description')}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Assignee"
                        fullWidth
                        {...register('assignee', { required: 'Assignee is required' })}
                        error={!!errors.assignee}
                        helperText={errors.assignee?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Priority"
                        fullWidth
                        {...register('priority', { required: 'Priority is required' })}
                        error={!!errors.priority}
                        helperText={errors.priority?.message}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Status</InputLabel>
                        <Controller
                            control={control}
                            name="status"
                            defaultValue="To Do"
                            render={({ field }) => (
                                <Select {...field} label="Status" error={!!errors.status}>
                                    <MenuItem value="todo">To Do</MenuItem>
                                    <MenuItem value="in_progress">In Progress</MenuItem>
                                    <MenuItem value="done">Done</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                    {errors.status && <p>{errors.status.message}</p>}
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add Task
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AddTaskDialog;
