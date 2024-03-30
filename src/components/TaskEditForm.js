

import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditForm = ({
  show,
  onHide,
  formData,
  handleChange,
  handleSubmit,
  setFormData,
  task,
}) => {
  const resetFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      priority: task.priority,
      status: task.status,
    }));
  };

  const handleReset = () => {
    resetFormData();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="assignee">
            <Form.Label>Assignee:</Form.Label>
            <Form.Control
              type="text"
              name="assignee"
              value={formData.assignee}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="priority">
            <Form.Label>Priority:</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Deployed">Deployed</option>
              <option value="Deferred">Deferred</option>
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
            <Button
              variant="secondary"
              className="ml-2 mt-3"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;
//   const handleUpdateTask = (taskId, updatedTaskData) => {
//   const updatedTasks = { ...tasks };
//   const previousStatus = Object.keys(updatedTasks).find(status => updatedTasks[status].some(task => task.id === taskId));

//   // Check if only priority is updated
//   if (updatedTaskData.status === tasks[previousStatus].find(task => task.id === taskId).status) {
//     // Update priority of the task in the same column
//     updatedTasks[previousStatus] = updatedTasks[previousStatus].map(task =>
//       task.id === taskId ? { ...task, ...updatedTaskData } : task
//     );
//   } else {
//     // Remove task from previous status
//     const updatedStatus = updatedTasks[previousStatus].filter(task => task.id !== taskId);
//     updatedTasks[previousStatus] = updatedStatus;

//     // Add task to the corresponding status
//     updatedTasks[updatedTaskData.status] = [
//       ...updatedTasks[updatedTaskData.status],
//       { id: taskId, ...updatedTaskData }
//     ];
//   }

//   setTasks(updatedTasks);
// };
