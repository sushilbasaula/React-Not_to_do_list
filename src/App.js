import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Title } from "./components/Title";
import { Form } from "./components/Form";
import { ListArea } from "./components/ListArea";
import { useEffect, useState } from "react";
import {
  deleteTasks,
  fetchAllTask,
  postTask,
  updateTask,
} from "./helpers/axiosHelpers";
import { get } from "mongoose";

const hrPerWeek = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [itmToDelete, setItmToDelete] = useState([]);
  const [response, setResponse] = useState({});
  const [isAllSelected, setIsAllSelcted] = useState(false);
  const totalHrs = taskList.reduce((subTtl, item) => subTtl + +item.hr, 0);
  // const handleOnSubmit = (e) => {};
  useEffect(() => {
    getTasks();
  }, []);
  // call axios to fetch all data
  const getTasks = async () => {
    const { status, tasks } = await fetchAllTask();
    status === "success" && setTaskList(tasks);
  };

  const addTask = async (data) => {
    if (hrPerWeek < totalHrs + +data.hr) {
      return alert("Boss, you don't have enough time, sorry la");
    }

    // send data to the api
    const result = await postTask(data);
    console.log(result);

    result?.status === "success" && getTasks();
    setResponse(result);
  };
  const switchTask = async (_id, type) => {
    const result = await updateTask({ _id, type });

    setResponse(result);

    result?.status === "success" && getTasks();
  };
  const handleOnSelect = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setItmToDelete([...itmToDelete, value]);
      setIsAllSelcted(taskList.length === itmToDelete.length + 1);
    } else {
      setItmToDelete(itmToDelete.filter((item) => item !== value));
      setIsAllSelcted(false);
    }
  };
  const handleOnDelete = async () => {
    if (!window.confirm("Are You Sure you want to delete")) {
      return;
    }
    // setTaskList(taskList.filter((item) => !itmToDelete.includes(item._id)));
    const result = await deleteTasks(itmToDelete);
    console.log(result);
    setResponse(result);
    setItmToDelete([]);
    result.status === "success" && getTasks();
  };
  const handleOnAllClick = (e) => {
    const { checked } = e.target;
    console.log(checked);

    if (checked) {
      setItmToDelete(taskList.map(({ _id }) => _id));
      setIsAllSelcted(true);
    } else {
      setItmToDelete([]);
      setIsAllSelcted(false);
    }
  };
  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        {response.message && (
          <div
            className={
              response.status === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {response.message}
          </div>
        )}
        <Form addTask={addTask} />

        <ListArea
          taskList={taskList}
          switchTask={switchTask}
          handleOnSelect={handleOnSelect}
          itmToDelete={itmToDelete}
        />

        {taskList.length ? (
          <div className="fw-bolder py-4">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={handleOnAllClick}
              checked={isAllSelected}
            />
            <label htmlFor="">Select all the tasks</label>
          </div>
        ) : null}
        <div className="row fw-bold">
          <div className="col">
            The total hours allocated = <span id="totalHrs">{totalHrs}</span>{" "}
            Hrs
          </div>
        </div>
        {itmToDelete.length > 0 && (
          <div className="d-grid g-2">
            <button className="btn btn-danger" onClick={handleOnDelete}>
              Delete Selected({itmToDelete.length}) Task(s)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
