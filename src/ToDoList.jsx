/**
 * The goal is to create a to do app that:
 * allows users to add tasks that are unfinished
 * allows users to remove tasks and see that they are completed
 * allows users to move tasks higher in the list, giving them a higher priority
 * */

import { useState, useEffect } from "react";
import ListItem from "./ListItem.jsx";
import FinishedListItem from "./FinishedListItem.jsx";

export default function ToDoList() {
    /**
     * First I need three stateful variables to store the state of tasks
     * unfinished tasks - array of strings storing tasks to be completed
     * finished tasks - array of completed tasks
     * newTask - new task to be added
     */
    const [unfinished, setUnfinished] = useState(() => {
        /**
         * We get the value from locale storage with the key "unfinishedTasks"
         * If it exists, we store it in the variable saveUnfinished and return it using useState hook,
         * If it does not exist, we return an empty array, meaning that the user hasn't saved
         * any tasks yet.
         */
        const saveUnfinished = localStorage.getItem("unfinishedTasks");
        return saveUnfinished ? JSON.parse(saveUnfinished) : [];
    });

    const [finished, setFinished] = useState(() => {
        /**
         * We do that same thing with the finishedTasks list
         */
        const saveFinished = localStorage.getItem("finishedTasks");
        return saveFinished ? JSON.parse(saveFinished) : [];
    });

    const [newTask, setNewTask] = useState("");

    /**
     * The useEffect hook is useful for declaring code that is excuted 
     * when particular variables change
     * In this case, we store the arrays of tasks in local storage everytime the
     * component mounts, unmounts, or the arrays are changed.
     */
    useEffect(() => {
        localStorage.setItem("unfinishedTasks", JSON.stringify(unfinished));
    }, [unfinished]);
    
    useEffect(() => {
        localStorage.setItem("finishedTasks", JSON.stringify(finished));
    }, [finished]);
    
    function handleInputChange() {
        setNewTask(_ => event.target.value);
    }

    /**
     * Add a new task unfinished task to the unfinshed 
     * array
     */
    function handleAddUnfinishedTask() {
        if (newTask.trim() != ""){
            setUnfinished([...unfinished, newTask]); // Append new task to unfinished tasks
            setNewTask(_ => "");  // Clear input after adding
        }
    }

    /**
     * Mark task as complete and add to finished task list
     */
    function handleFinishedTask(index) {
        const taskToFinish = unfinished[index];
        setFinished([...finished, taskToFinish]);
        setUnfinished(unfinished.filter((_, idx) => idx !== index));
    }

    /**
     * Delete task from finished task list
     */
    function handleDeleteTask(index) {
        setFinished(finished.filter((_, idx) => idx !== index));
    }

    /**
     * Move a Task up the list
     */
    function handleMoveUp(index){
        if (index > 0){
            setUnfinished(unfinished => {
                // Create a copy of unfinished array to avoid mutating array directly
                const newUnfinished = [...unfinished];

                const temp = newUnfinished[index];
                newUnfinished[index] = newUnfinished[index-1];
                newUnfinished[index-1] = temp;
                
                return newUnfinished;
            })
        }
    }

    /**
     * Move a Task down the list
     */
    function handleMoveDown(index){
        if (index < unfinished.length-1){
            setUnfinished(unfinished => {
                // Create a copy of unfinished array to avoid mutating array directly
                const newUnfinished = [...unfinished];

                const temp = newUnfinished[index];
                newUnfinished[index] = newUnfinished[index+1];
                newUnfinished[index+1] = temp;
                
                return newUnfinished;
            })
        }
    }

    function handleTextChange(index, newText){
        const updatedTasks = unfinished.map((task, idx) => idx === index ? newText : task);
        setUnfinished(updatedTasks);
    }

    return(
        <>  
            <section id="upcoming-tasks">
                <h2>To Do List ✅</h2>
                <div className="input-div">
                    <input  value={newTask}
                            placeholder="Enter a new task..." 
                            className="input-box"
                            onChange={handleInputChange}
                            type="text"></input>
                    <button onClick={handleAddUnfinishedTask} className=" enter-btn">Enter</button>
                </div>                
                <h6>UPCOMING</h6>
                <ul>
                    {unfinished.map((task, index) => 
                        <ListItem idx={index + 1} 
                                text={task.toString()}
                                key={index}
                                onDelete={() => handleFinishedTask(index)}
                                onMoveUp={() => handleMoveUp(index)}
                                onMoveDown={() => handleMoveDown(index)}
                                onHandleChangeText={(newTask) => handleTextChange(index, newTask)}/>)}
                </ul>
            </section>
            <section id="finished-tasks">
                <h6>FINISHED</h6>
                <ul>
                    {finished.map((task, index) => 
                        <FinishedListItem idx={index + 1}
                                        text={task}
                                        key={index}
                                        onDelete={() => handleDeleteTask(index)}/>)}
                </ul>
            </section>
        </>
    );

}