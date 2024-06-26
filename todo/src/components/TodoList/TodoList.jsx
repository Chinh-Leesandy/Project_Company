import React from "react";

export const TodoList = ({tasks, onEditTask, onDeleteTask}) => {
  return (
    <div className="container">
      <h5 className="pt-3">Danh sách các task công việc</h5>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Deadline</td>
            <td>Level</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
            {tasks.map((task) => (
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.deadline}</td>
                    <td>{task.level}</td>
                    <td>{task.status}</td>
                    <td className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-warning mx-2"  onClick={() => onEditTask(task)}><i class="bi bi-pencil"></i>Edit</button>
                        <button type="button" className="btn btn-outline-danger"  onClick={() => onDeleteTask(task.id)}><i class="bi bi-trash3"></i>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
