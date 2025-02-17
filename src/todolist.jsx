import { useState } from 'react';

function Todolist() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTasks] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [newPriority, setNewPriority] = useState("1");
    const priorityLabels = {
        "1": "High",
        "2": "Med",
        "3": "Low"
    };
    const [newDateTime, setNewDateTime] = useState("");

    function InputTask(event) {
        setNewTasks(event.target.value);
    }
    function InputDateTime(event){
        setNewDateTime(event.target.value);
    }
    function InputPriority(event) {
        setNewPriority(event.target.value);
    }
    function AddTask() {
        if ((newTask.trim() !== "") && (newDateTime.trim() !=="")) {
            setTasks([...tasks, { name: newTask, priority: newPriority, completed:false, dateTime:newDateTime }]);
            setNewTasks("");
            setNewPriority("1")
            setNewDateTime("");
        } 
        if ((newTask.trim() === "")) {
            alert("Enter Task")
        }
        if(newDateTime.trim() ===""){
            alert("Enter Date/Time")
        }
        
        
    }
    function EditTask(index) {
        setEditingIndex(index);
        setEditedTask(tasks[index].name);
    }
    function SaveEditTask() {
        if (editedTask.trim() === "") {
            alert("Enter Task");
            return;
        }
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex].name = editedTask;
        setTasks(updatedTasks);
        setEditingIndex(null);
    }
    function DeleteTask(index) {
        setTasks(tasks.filter((element, i) => i !== index));
    }
    function DeleteAllTasks(){
        setTasks([]);
    }
    function ToggleDoneTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }

    return (
        <div className="TodoApp">
            <h1>
                <img src="https://lexmeet.com/images/lexmeet-v2/logo/main.png" 
                alt="Objective Tracker Logo" style={{ height: "50px" }} />
            </h1>

            <h2>Activity Tracker</h2>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter Task"
                    value={newTask}
                    onChange={InputTask}
                />
                <select value={newPriority} onChange={InputPriority}>
                <option value="" disabled selected>Select Priority</option>
                    <option value="3">Low</option>
                    <option value="2">Med</option>
                    <option value="1">High</option>
                </select>
                <input
                    type="datetime-local"
                    value={newDateTime}
                    onChange={InputDateTime}
                    min={new Date().toISOString().slice(0, 16)}
                    />

                <button className="add-button" onClick={AddTask}>+</button>
                <button className='delete-all' onClick={DeleteAllTasks}>🗑️</button>
            </div>

            <ol className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        <div className='DateNPrio'>
                            <div className={`priority-box ${task.completed ? "completed-priority" : `priority-${task.priority}`}`}>
                            {priorityLabels[task.priority]}
                            </div>
                         <div className={`task-datetime ${task.completed ? "completed-date" : ""}`}>
                         {task.dateTime ? (
                                    <>
                                    {new Date(task.dateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                     <br />   
                                    {new Date(task.dateTime).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                       
                                        
                                    </>
                                ) : ""}
                            </div>
                        </div>
                        
                        
                       

                        <div className={`task-content ${task.completed ? "completed" : ""}`}>
                            {editingIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedTask}
                                        onChange={(e) => setEditedTask(e.target.value)}
                                    />
                                    <button className="save-button" onClick={SaveEditTask}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span className="task-text">{task.name}</span>
                                </>
                            )}
                        </div>
                        <div className="button-group">
                                    <button className="done-button" onClick={() => ToggleDoneTask(index)}>
                                            ✔️
                                        </button>
                                        <button className="edit-button" onClick={() => EditTask(index)}>📝</button>
                                        <button className="delete-button" onClick={() => DeleteTask(index)}>✖️</button>
                                    </div>
                    </li>
                ))}
            </ol>
        
        </div>
    );
}
export default Todolist

