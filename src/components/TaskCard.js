// import React, { useState } from 'react';
// // import { Modal, Button, Form } from 'react-bootstrap';
// // import "./style/style.css"
// import "./style/card.css";
// import EditForm from './TaskEditForm'; // Import the EditForm component

// const TaskCard = ({ task }) => {
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [showOptions, setShowOptions] = useState(false); // State to manage the visibility of edit and delete options

//   const [formData, setFormData] = useState({
//     title: task.title,
//     description: task.description,
//     assignee: task.assignee,
//     priority: task.priority,
//     status: "Assign" // Set initial status to "Assign"
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle the form submission, e.g., call an API to update the task
//     console.log("Edited task:", formData);
//     setShowEditForm(false); // Close the edit form after submitting
//     // Update priority and status values
//     task.priority = formData.priority;
//     task.status = formData.status;
//   };

//   const handleEdit = () => {
//     setShowEditForm(true); // Show the edit form when the user clicks Edit
//     setShowOptions(false); // Hide the options when editing
//   };

//   return (
//     <div className="card card-innner mb-3">
//       <div className="card-body">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="card-title mb-0">{task.title}</h5>
//           <span className="badge badge-primary">{task.priority}</span>

//         </div>
//         <hr className="my-3" />
//         <p className="card-text">{task.description}</p>
//         <div className="d-flex justify-content-between align-items-center">
//           <p className=" assignee-name ">
//             @{task.assignee}
//           </p>
//           <div className="vertical-dots badge badge-primary" onClick={() => setShowOptions(!showOptions)}>
//             <span></span>
//             <span></span>
//             <span></span>
//             {showOptions && (
//               <div className="options">
//                 <p onClick={handleEdit}>Edit</p>
//                 <hr /> {/* Horizontal line */}
//                 <p>Delete</p>
//               </div>
//             )}
//           </div>
//         </div>
//         <button className='btn'>{formData.status}</button> {/* Display updated status */}
//         <EditForm
//           show={showEditForm}
//           onHide={() => setShowEditForm(false)}
//           formData={formData}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// }

// export default TaskCard;

import React, { useState } from "react";
import EditForm from "./TaskEditForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal component

import "./style/card.css";
const TaskCard = ({ task, onUpdateTask,onDeleteTask  }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    assignee: task.assignee,
    priority: task.priority,
    status: task.status, // Initially set status to empty string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.title === task.title &&
      formData.description === task.description &&
      formData.assignee === task.assignee &&
      formData.priority === task.priority &&
      formData.status === task.status
    ) {
      setShowEditForm(false);
      return;
    }
    console.log("Task Data:", task);
    onUpdateTask(task.id, formData); // Ensure taskId is passed here
    setShowEditForm(false);
  };

  const handleEdit = () => {
    setShowEditForm(true);
    setShowOptions(false);
  };
  const handleDelete = () => {
    setShowDeleteModal(true);
    setShowOptions(false);
  };

  const confirmDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteModal(false);
  };

  return (
    <div className="card card-inner mb-3">
      <div className="card-body" style={{ minHeight: "100px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">{task.title}</h5>
          <span className="badge badge-primary">{task.priority}</span>
        </div>
        <hr className="my-3" />
        <p className="card-text">{task.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="assignee-name">@{task.assignee}</p>
          <div
            className="vertical-dots badge badge-primary"
            onClick={() => setShowOptions(!showOptions)}
          >
            <span></span>
            <span></span>
            <span></span>
            {showOptions && (
              <div className="options">
                <p onClick={handleEdit}>Edit</p>
                <hr />
                <p onClick={handleDelete}>Delete</p>
              </div>
            )}
          </div>
        </div>

        <EditForm
          show={showEditForm}
          onHide={() => setShowEditForm(false)}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setFormData={setFormData} // Pass setFormData function
          task={task}
        />
          <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        taskName={task.title}
      />
        <button className="btn">
          {formData.status ? formData.status : "Assign"}
        </button>
      </div>
      
    </div>
  );
};

export default TaskCard;
