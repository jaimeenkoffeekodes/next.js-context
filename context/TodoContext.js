"use client"
const { createContext, useState } = require("react");

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([{
        id: 1, name: "first todo", description: "first default todo!"
    }]);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    }

    const editTodo = (id, updateTodo) => {
        setTodos(prevTodo => {
            return prevTodo.map(todo => {
                if (todo.id === id) {
                    return { ...todo, ...updateTodo };
                }
                return todo;
            })
        })
    }

    const deleteTodo = (id) => {
        const updateTodo = todos.filter(todo => todo.id !== id);
        setTodos(updateTodo);
    }

    return <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo }}>
        {children}
    </TodoContext.Provider>
}
