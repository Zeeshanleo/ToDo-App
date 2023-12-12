import { useEffect } from "react";
import { useTodoContext } from "../hooks/useTodoContext";

//components
import Todo from "../components/Todo";
import InputForm from "../components/InputForm";

const Home = () => {
  const { todos, dispatch } = useTodoContext();

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch("/api/todo");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODO", payload: json });
        console.log("Getting all Todos");
      }
    };
    fetchTodo();
  }, []);

  return (
    <div className="home">
      <InputForm />
      <div className="todo">
        {todos &&
          todos.map((todo, index) => (
            <div key={index}>
              <Todo id={todo._id} todos={todo.title} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
