import { useReducer, useMemo, useCallback, useState } from "react";

import './App.css';
import styles from './styles.module.scss';

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";

const taskReducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, { id: Date.now(), text: action.payload }];
    case REMOVE_TASK:
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

const TaskManager = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [task, setTask] = useState('');

  // Get pending tasks count
  const pendingTasks = useMemo(() => tasks.length, [tasks]);

  // Form submit handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    addTask();
  });

  // Add task handler
  const addTask = useCallback(() => {
    if (task.trim()) {
      dispatch({ type: 'ADD_TASK', payload: task });
      setTask('');
    }
  }, [task]);

  // Remove task handler
  const removeTask = useCallback(id => {
    dispatch({ type: REMOVE_TASK, payload: id });
  }, []);

  // Check if task input is empty
  const isEmpty = task.trim() === '';

  return (
    <div>
      <h2>Task Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          className={styles.input}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask} disabled={isEmpty}>Add Task</button>
      </form>
      <h3>Pending Tasks: {pendingTasks}</h3>
      <ul className={styles.list}>
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
