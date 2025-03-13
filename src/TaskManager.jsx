import { useReducer, useMemo, useCallback, useState } from "react";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: action.payload }];
    case "REMOVE_TASK":
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

const TaskManager = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [task, setTask] = useState("");

  const pendingTasks = useMemo(() => tasks.length, [tasks]);

  const addTask = useCallback(() => {
    if (task.trim()) {
      dispatch({ type: "ADD_TASK", payload: task });
      setTask("");
    }
  }, [task]);

  const removeTask = useCallback(id => {
    dispatch({ type: "REMOVE_TASK", payload: id });
  }, []);

  return (
    <div>
      <h2>Task Manager</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add Task</button>
      <h3>Pending Tasks: {pendingTasks}</h3>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.text} <button onClick={() => removeTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskManager;
