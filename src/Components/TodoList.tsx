import {
  Box,
  Typography,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from "@mui/material";
import { Todo } from "../todo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteTodo, updateTodoStatus } from "../model/todoSlice";

const TodoList = ({ handleUpdate }: any) => {
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box className="list-wrap">
      <List>
        {todoList.length > 0 ? (
          todoList.map((todo: Todo, i: number) => (
            <ListItem key={todo.id} className="todo-list">
              <Checkbox
                edge="end"
                defaultChecked={todo.completed}
                value={todo.completed}
                onChange={() => {
                  dispatch(
                    updateTodoStatus({
                      completed: !todo.completed,
                      id: todo.id,
                    })
                  );
                }}
              />
              <Typography fontSize={16} variant="h6">
                {i + 1}.
              </Typography>

              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                className="todo-text"
              >
                {todo.task}
              </span>
              {/* </ListItemText> */}
              <ListItemSecondaryAction>
                <IconButton
                  disabled={todo.completed}
                  onClick={() => {
                    handleUpdate(todo);
                  }}
                >
                  <EditIcon color="action" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    dispatch(deleteTodo(todo.id));
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography color={"gray"}>Add Your Todo</Typography>
        )}
      </List>
    </Box>
  );
};

export default TodoList;
