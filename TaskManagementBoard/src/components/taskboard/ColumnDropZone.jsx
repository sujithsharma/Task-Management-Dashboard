import React from "react";
import { ColumnContainer, EmptyCard, Title } from "../../styles";
import { CardContent } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

// Column Drop Zone: Handles dropping tasks into the columns
const ColumnDropZone = ({ columnId, title, bgColor, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.fromColumnId !== columnId) {
        moveTask(item.id, item.fromColumnId, columnId);
      }
    },
  });

  return (
    <ColumnContainer ref={drop}>
      <Title variant="h4" gutterBottom>
        {title}
      </Title>

      {tasks.length === 0 ? (
        <EmptyCard variant="outlined" bgColor={bgColor}>
          <CardContent>
            <Typography variant="h6">No tasks available</Typography>
          </CardContent>
        </EmptyCard>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            fromColumnId={columnId}
            moveTask={moveTask}
            bgColor={bgColor}
          />
        ))
      )}
    </ColumnContainer>
  );
};

export default ColumnDropZone;
