import React, { useState } from "react";
import TaskFormDialog from "./TaskFormDialog";
import TaskCard from "./TaskCard";
import user from "./user.png";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./style/style.css";

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [startDate, setStartDate] = useState(null); // Declare startDate state
  const [endDate, setEndDate] = useState(null);
  const [tasks, setTasks] = useState({
    Pending: [],
    InProgress: [],
    Completed: [],
    Deployed: [],
    Deferred: [],
  });

  const handleToggleTaskForm = () => {
    setShowTaskForm((prevState) => !prevState);
  };

  const handleAddTask = (task) => {
    const taskId = uuidv4(); // or any other method to generate ID

    // Include the generated ID in the task object
    const taskWithId = { ...task, id: taskId };
    setTasks((prevTasks) => ({
      ...prevTasks,
      Pending: [...prevTasks.Pending, taskWithId],
    }));
    handleToggleTaskForm();
  };

  const handleUpdateTask = (taskId, updatedTaskData) => {
    console.log("Task ID:", taskId);
    console.log("Updated Task Data:", updatedTaskData);

    const updatedTasks = { ...tasks };
    console.log("Current Tasks:", updatedTasks);

    const previousStatus = Object.keys(updatedTasks).find((status) =>
      updatedTasks[status].some((task) => task.id === taskId)
    );
    console.log("Previous Status:", previousStatus);

    if (
      updatedTaskData.status ===
      tasks[previousStatus].find((task) => task.id === taskId).status
    ) {
      updatedTasks[previousStatus] = updatedTasks[previousStatus].map((task) =>
        task.id === taskId ? { ...task, ...updatedTaskData } : task
      );
    } else {
      const updatedStatus = updatedTasks[previousStatus].filter(
        (task) => task.id !== taskId
      );
      updatedTasks[previousStatus] = updatedStatus;

      updatedTasks[updatedTaskData.status] = [
        ...updatedTasks[updatedTaskData.status],
        { id: taskId, ...updatedTaskData },
      ];
    }

    console.log("Updated Tasks:", updatedTasks);
    setTasks(updatedTasks);
  };
  const handleDeleteTask = (taskId) => {
    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach((status) => {
      updatedTasks[status] = updatedTasks[status].filter(
        (task) => task.id !== taskId
      );
    });
    setTasks(updatedTasks);
    console.log("Deleted task with ID:", taskId);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-lightgray";
      case "InProgress":
        return "bg-orange";
      case "Completed":
        return "bg-lightgreen";
      case "Deployed":
        return "bg-purple";
      case "Deferred":
        return "bg-peach";
      default:
        return "bg-secondary";
    }
  };
  const handleSortByPriority = () => {
    setSortByPriority(!sortByPriority);
    setSortByDate(false); // Reset sorting by date
  };

  const handleSortByDate = () => {
    setSortByDate(!sortByDate);
    setSortByPriority(false); // Reset sorting by priority
  };

  const sortedTasks = () => {
    let sorted = tasks;
    if (sortByPriority) {
      sorted = { ...sorted };
      Object.keys(sorted).forEach((status) => {
        sorted[status] = sorted[status].sort((a, b) => a.priority - b.priority);
      });
    } else if (sortByDate) {
      sorted = { ...sorted };
      Object.keys(sorted).forEach((status) => {
        sorted[status] = sorted[status].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      });
    }
    return sorted;
  };
  return (
    <div className="dashboard">
      <nav className="container navbar navbar-light  p-4">
        <h1
          className="navbar-brand mb-0 "
          style={{ color: "#333", fontSize: "2rem" }}
        >
          Task Board
        </h1>
        <img src={user} className="user" alt="Profile Logo" />
      </nav>
      <div className="  box  ">
        <div className="filter-section  p-2">
          {/* Filter by label */}
          <div className="row">
            <div className="col">
              <label htmlFor="assigneeFilter" className="filter-label mb-2">
                Filter by:
              </label>
            </div>
          </div>

          {/* Filter functionality: Priority and Assignee */}
          <div className="row ">
          <div className="col">
              <input
                type="text"
                id="assigneeFilter"
                placeholder="Assignee Name"
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="form-control filter-input mb-2 dynamic-width"
              />
            </div>
            <div className="col">
              <select
                id="priorityFilter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="form-control filter-dropdown mb-2 dynamic-width "
              >
                <option value="">Priority ▼</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
          
          </div>

          {/* Filter functionality: Date */}
          <div className="row">
            <div className="col ">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="form-control mb-2 dynamic-width "
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
              />
            </div>
            <div className="col">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="form-control mb-2 dynamic-width"
                dateFormat="dd/MM/yyyy"
                placeholderText="End Date"
              />
            </div>
          </div>

          {/* Add New Task button at the bottom */}
          <div className="row  ml-auto add-button1">
            <div className="col text-center">
              <button
                className="btn btn-primary"
                onClick={handleToggleTaskForm}
              >
                Add New Task
              </button>
            </div>
          </div>
        </div>

        <div className="sort-section mt-3  ">
          <label htmlFor="sortDropdown" className="sort-label">
            Sort by:
          </label>
          <select
            className="form-control col-sm-3 sort-dropdown ml-2  dropdown-with-caretdynamic-width "
            id="sortDropdown"
            style={{ width: "100px" }}
            onChange={(e) => {
              if (e.target.value === "priority") {
                handleSortByPriority();
              } else if (e.target.value === "date") {
                handleSortByDate();
              }
            }}
          >
            <option value="">Select</option>
            <option value="priority">Priority</option>
            <option value="date">Date</option>
          </select>
        </div>

      {/* Cards section with horizontal scrolling */}
<div className=" mt-4 mb-4 card-scroll" style={{ maxWidth: '100%' }}>
  <div className="row flex-nowrap ">
    {Object.entries(tasks).map(([status, taskList]) => (
      <div className=" col-sm-12 col-md-6 col-lg" key={status}>
        <div className="card">
          <div className={`text-center card-header ${getStatusColor(status)}`}>
            {status}
          </div>
          <div className="card-body">
            {taskList
              .filter(
                (task) =>
                  task.assignee.includes(assigneeFilter) &&
                  (!priorityFilter || task.priority === priorityFilter)
              )
              .sort((a, b) => {
                if (sortByPriority) {
                  return a.priority - b.priority;
                } else if (sortByDate) {
                  return new Date(a.date) - new Date(b.date);
                }
                return 0;
              })
              .map((task, index) => (
                <TaskCard
                  key={index}
                  task={task}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

<div className="row   add-button2">
            <div className="col text-center">
              <button
                className="btn btn-primary"
                onClick={handleToggleTaskForm}
              >
                Add New Task
              </button>
            </div>
          </div>
    {/* Task form dialog */}
    {showTaskForm && (
      <TaskFormDialog
        onAddTask={handleAddTask}
        onClose={handleToggleTaskForm}
      />
    )}
  </div>
</div>
      
  );
};

export default Dashboard;
