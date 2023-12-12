import React, { useState } from "react";
import { Card, CardContent, Typography, Container } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useTodoContext } from "../hooks/useTodoContext";
import { TextField } from "@material-ui/core";

export default function Todo({ todos, id }) {
  const { dispatch } = useTodoContext();

  // editing
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const updateTodo = async (e) => {
    e.preventDefault();

    todos = editingText;
    const body = JSON.stringify({ title: todos });

    const response = await fetch("/api/todo/" + id, {
      method: "PATCH",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_TODO", payload: json });
      console.log(todos, "updated");
    }
  };

  const handleDelete = async () => {
    const response = await fetch("/api/todo/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
      console.log(todos, " Deleted");
    }
  };
  return (
    <Container>
      <Card
        className="root"
        variant="outlined"
        style={{ marginTop: 20, background: "lightgray" }}
      >
        <CardContent>
          <Typography variant="h5">
            {todoEditing === id ? (
              <div>
                <TextField
                  label="Edit here"
                  variant="standard"
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <SendIcon onClick={updateTodo} />
              </div>
            ) : (
              todos
            )}
            <IconButton style={{ float: "right" }} onClick={handleDelete}>
              <Delete />
            </IconButton>
            <IconButton
              style={{ float: "right" }}
              onClick={() => setTodoEditing(id)}
            >
              <EditIcon />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
