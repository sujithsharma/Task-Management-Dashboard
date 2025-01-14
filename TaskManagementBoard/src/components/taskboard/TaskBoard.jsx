import React from "react";
import { Typography } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSprints } from "../../context/SprintContext";
import { BoardContainer } from "../../styles";
import ColumnDropZone from "./ColumnDropZone";

const TaskBoard = () => {
  const { sprints, loading, error, moveTask } = useSprints();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const renderColumns = () => {
    return (
      <>
        <ColumnDropZone
          columnId="todo"
          title="To Do Tasks"
          bgColor="#f4f6f8"
          tasks={sprints.flatMap(
            (sprint) =>
              sprint.columns.find((col) => col.id === "todo")?.tasks || []
          )}
          moveTask={moveTask}
        />
        <ColumnDropZone
          columnId="in_progress"
          title="In Progress Tasks"
          bgColor="#f4f6f8"
          tasks={sprints.flatMap(
            (sprint) =>
              sprint.columns.find((col) => col.id === "in_progress")?.tasks ||
              []
          )}
          moveTask={moveTask}
        />
        <ColumnDropZone
          columnId="done"
          title="Completed Tasks"
          bgColor="#e0f7fa"
          tasks={sprints.flatMap(
            (sprint) =>
              sprint.columns.find((col) => col.id === "done")?.tasks || []
          )}
          moveTask={moveTask}
        />
      </>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardContainer>{renderColumns()}</BoardContainer>
    </DndProvider>
  );
};

export default TaskBoard;
