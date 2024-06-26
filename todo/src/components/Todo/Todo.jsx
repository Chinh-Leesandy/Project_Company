import React, { useState } from 'react';
import './Todo.css';
import { TodoList } from '../TodoList/TodoList';

export const Todo = () => {
  const [listTask, setListTask] = useState([
    {
      id: 1,
      name: 'Chạy bộ',
      deadline: '2024-06-25T18:00',
      level: 'Hight',
      status: 'Chưa hoàn thành',
    },
    {
      id: 2,
      name: 'Đi chơi',
      deadline: '2024-06-30T19:00',
      level: 'Low',
      status: 'Chưa hoàn thành',
    },
  ]);

  const [searchItem, setSearchItem] = useState("");
  const [statusItem, setStatusItem] = useState();
  const [levelItem, setLevelItem] = useState();
  const [isEditModal, setIsEditModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [task, setTask] = useState({
    name: '',
    deadline: '', 
    status: 'Chưa hoàn thành'
  });

  const openAddModal = () => {
    setIsEditModal(false);
    setIsOpenModal(true);
    setTask({ name: '', deadline: '', status: 'Chưa hoàn thành' });
  };

  const calculateLevel = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;

    if (timeDiff < 24 * 60 * 60 * 1000) {
      return 'Hight';
    } else if (timeDiff < 48 * 60 * 60 * 1000) {
      return 'Mid';
    } else {
      return 'Low';
    }
  };

  const addTask = () => {
    const taskWithLevel = {
      ...task,
      id: listTask.length + 1,
      level: calculateLevel(task.deadline)
    };
    setListTask([...listTask, taskWithLevel]);
    setIsOpenModal(false);
  };

  const editTask = (editedTask) => {
    const updatedTasks = listTask.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setListTask(updatedTasks);
    setIsEditModal(false);
    setIsOpenModal(false);
  };

  const saveTask = () => {
    if (isEditModal) {
      editTask(task);
    } else {
      addTask();
    }
  };

  const openEditModal = (newTask) => {
    setIsOpenModal(true);
    setIsEditModal(true);
    setTask(newTask);
  };

  const deleteTask = (id) => {
    setListTask(listTask.filter((task) => task.id !== id));
  };

  const filterTask = listTask.filter((taskfill) => {
    return(
      searchItem ? taskfill.name.toLowerCase().includes(searchItem.trim().toLowerCase()) : true && levelItem ? taskfill.level === levelItem : true && statusItem ? taskfill.status === statusItem : true
    );
  })
 
  return (
    <div className='todo'>
      <div className="card mb-3 header">
        <div className="card-header text-center f2">Todo List</div>
      </div>
      <div className="d-flex justify-content-around container">
        <div className="search_task col-3 d-flex">
          <input
            type="text"
            className="form-control input-sm mb-3"
            placeholder="Search by name"
            aria-label="Search by name"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button
            type="button"
            className="button btn-sm btn btn-outline-success d-flex justify-content-around align-items-center"
          >
            <i className="bi bi-search"></i> Search
          </button>
        </div>
        <div className="fitter_task col-3 d-flex">
          <select
            className="form-select form-select-sm mb-3"
            aria-label="Default select example"
            onChange={(e) => setStatusItem(e.target.value)}
          >
            <option selected>Fitter task by status</option>
            <option value="Chưa hoàn thành">Chưa hoàn thành</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
          </select>
          <button
            type="button"
            className="button btn-sm btn btn-outline-success"
          >
            Fitter
          </button>
        </div>
        <div className="fitter_task col-3 d-flex">
          <select
            className="form-select form-select-sm mb-3"
            aria-label="Default select example"
            onChange={(e) => setLevelItem(e.target.value)}
          >
            <option selected>Fitter task by level</option>
            <option value="Hight" >Hight</option>
            <option value="Mid">Mid</option>
            <option value="Low">Low</option>
          </select>
          <button
            type="button"
            className="button btn-sm btn btn-outline-success"
          >
            Fitter
          </button>
        </div>
      </div>
      <div className="button_add d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={openAddModal}
        >
          Add Task News
        </button>
      </div>
      {isOpenModal && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {isEditModal ? 'Edit Task' : 'Add New Task'}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsOpenModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex flex-column justify-content-center align-item-center">
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="inputName"
                    className="form-label px-3"
                  >
                    Name task:{' '}
                  </label>
                  <input
                    className="form-control mb-3 input-sm"
                    type="text"
                    name="inputName"
                    id="inputName"
                    placeholder="Enter name new task"
                    value={task.name}
                    onChange={(e) =>
                      setTask({ ...task, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="inputDeadline"
                    className="form-label px-3"
                  >
                    Deadline task:{' '}
                  </label>
                  <input
                    className="form-control mb-3 input-sm"
                    type="datetime-local"
                    name="inputDeadline"
                    id="inputDeadline"
                    value={task.deadline}
                    onChange={(e) =>
                      setTask({ ...task, deadline: e.target.value })
                    }
                  />
                </div>
                {isEditModal && (
                  <div className="mb-3 d-flex">
                    <label className="form-label px-3">
                      Status:{' '}
                    </label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="statusChuaHoanThanh"
                        value="Chưa hoàn thành"
                        checked={task.status === 'Chưa hoàn thành'}
                        onChange={(e) =>
                          setTask({
                            ...task,
                            status: e.target.value,
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="statusChuaHoanThanh"
                      >
                        Chưa hoàn thành
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="status"
                        id="statusDaHoanThanh"
                        value="Đã hoàn thành"
                        checked={task.status === 'Đã hoàn thành'}
                        onChange={(e) =>
                          setTask({
                            ...task,
                            status: e.target.value,
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="statusDaHoanThanh"
                      >
                        Đã hoàn thành
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsOpenModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={saveTask}
                >
                  Save task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <TodoList tasks={filterTask} onEditTask={openEditModal} onDeleteTask={deleteTask}/>
    </div>
  );
};
