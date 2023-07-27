import React from "react";
import { TextField, Box, Typography, Button } from "@mui/material";

const Form = ({ handleSubmit, todos, setTodos, error, setError }: any) => {
  return (
    <Box className="form-wrap">
      <Typography variant="h4">ToDo List</Typography>
      <form className="form" action="" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label={todos.id ? "Update Todo" : "Add Todo"}
          name="todo"
          variant="outlined"
          size="small"
          fullWidth
          error={error}
          helperText={error ? "Please enter a todo" : ""}
          value={todos.task}
          onChange={(e: any) => {
            setError(false);
            setTodos({ ...todos, task: e.target.value });
          }}
        />
        <Button sx={{ width: "100px" }} variant="contained" type="submit">
          {todos.id ? "update" : "Add"}
        </Button>
      </form>
    </Box>
  );
};

export default Form;
