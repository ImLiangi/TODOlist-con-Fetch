import React, { useState, useEffect } from "react";

const USER = "ImLiangi";
const BASE_URL = `https://playground.4geeks.com/todo/todos/${USER}`;

const TodoList = () => {
    const [tareas, setTareas] = useState([]);
    const [input, setInput] = useState("");

    const cargarTareas = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/users/${USER}`);
    if (response.ok) {
        const data = await response.json();
        setTareas(data.todos);
    }
};

    useEffect(() => {
        cargarTareas();
    }, []);

    const añadirTarea = async (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            await fetch(BASE_URL, {
                method: "POST",
                body: JSON.stringify({ label: input.trim(), is_done: false }),
                headers: { "Content-Type": "application/json" }
            });
            setInput("");
            cargarTareas();
        }
    };

    const eliminarTarea = async (id) => {
        await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        });
        cargarTareas();
    };

    const limpiarTodo = async () => {
    for (const tarea of tareas) {
        await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
            method: "DELETE"
        });
    }
    cargarTareas();
};

    return (
        <div className="container mt-5" style={{maxWidth: "500px"}}>
            <h2 className="text-center mb-4">Lista de Tareas</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Añade una tarea y pulsa Enter..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={añadirTarea}
            />
            <ul className="list-group">
                {tareas.length === 0 ? (
                    <li className="list-group-item text-center text-muted">No hay tareas, añadir tareas</li>
                ) : (
                    tareas.map((tarea) => (
                        <li key={tarea.id} className="list-group-item d-flex justify-content-between align-items-center todo-item">
                            {tarea.label}
                            <span className="delete-icon text-danger" style={{cursor: "pointer"}} onClick={() => eliminarTarea(tarea.id)}>✕</span>
                        </li>
                    ))
                )}
            </ul>
            <p className="text-muted text-center mt-2">{tareas.length} tarea(s) pendiente(s)</p>
            <button className="btn btn-danger w-100 mt-3" onClick={limpiarTodo}>Limpiar todo</button>
        </div>
    );
};

export default TodoList;