import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, {text: inputValue, id: Date.now() }]);
            setInputValue('');
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    }

    return (
        <div id="container">
            <div id="input-container">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Add a todo"></input>
            <button onClick={addTodo}>Add</button>
            </div>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));