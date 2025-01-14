import React from 'react'
import { TaskCardContainer } from '../../styles';
import { Card, CardContent, Typography } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

// Task Card: Each individual task
const TaskCard = ({ task, fromColumnId, moveTask, bgColor }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "TASK",
      item: { id: task.id, fromColumnId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: "TASK",
      drop: (item) => {
        if (item.fromColumnId !== fromColumnId) {
          moveTask(item.id, item.fromColumnId, fromColumnId);
        }
      },
    });
  
    return (
      <TaskCardContainer ref={(node) => drag(drop(node))} isDragging={isDragging}>
        <Card
          sx={{
            backgroundColor: bgColor,
            boxShadow: 2,
            textAlign: "center",
          }}
          variant="outlined"
          bgColor={bgColor}
        >
          <CardContent>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Assignee: {task.assignee} | Priority: {task.priority}
            </Typography>
            <Typography variant="body2">{task.description}</Typography>
          </CardContent>
        </Card>
      </TaskCardContainer>
    );
  };

export default TaskCard;