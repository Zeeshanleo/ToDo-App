import { useState } from "react";
import { FormControl, Container, Button, TextField } from "@material-ui/core";
import { useTodoContext } from "../hooks/useTodoContext";

export default function InputFrom({ makeTodos }) {
  const { dispatch } = useTodoContext();
  const [title, setText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const todo = { title };

    const response = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setText("");

      console.log("New todo added", json);
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth={true}>
            <TextField
              label="Enter Todo"
              variant="standard"
              onChange={(event) => setText(event.target.value)}
              required={true}
              value={title}
            />

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              Add Todo
            </Button>
            {error && <p>{error}</p>}
          </FormControl>
        </form>
      </Container>
    </div>
  );
}
