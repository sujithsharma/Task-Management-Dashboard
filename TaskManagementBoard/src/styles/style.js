import { Box, Card, Typography } from "@mui/material";
import styled from "styled-components";

// Styled Components
export const BoardContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

export const ColumnContainer = styled(Box)`
  flex: 1;
  min-width: 250px;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Title = styled(Typography)`
  font-weight: 600;
  font-family: "Roboto", "Arial", sans-serif;
  background: linear-gradient(135deg, #4e9af1, #78c0fa);
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #ffffff;
    color: #333;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

export const EmptyCard = styled(Card)`
  background-color: ${({ bgColor }) => bgColor};
  box-shadow: 2;
  text-align: center;
  padding: 16px;
`;

export const TaskCardContainer = styled(Box)`
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  cursor: move;
  margin-bottom: 8px;
`;

export const NavBarWrapper = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
`;