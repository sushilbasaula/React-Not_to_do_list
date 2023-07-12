import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Title } from "./components/Title";
import { Form } from "./components/Form";
import { ListArea } from "./components/ListArea";
import { useEffect, useState } from "react";
import { fetchAllTask, postTask, updateTask } from "./helpers/axiosHelpers";
import { get } from "mongoose";

const hrPerWeek = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [itmToDelete, setItmToDelete] = useState([]);
  const [response, setResponse] = useState({});

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

    checked
      ? setItmToDelete([...itmToDelete, value])
      : // const filteredArg = itmToDelete.filter((item) => item !== value);
        setItmToDelete(itmToDelete.filter((item) => item !== value));
  };
  const handleOnDelete = () => {
    // const filteredArg = taskList.filter((item) =>
    //   itmToDelete.includes(item._id)
    // );
    if (!window.confirm("Are You Sure you want to delete")) {
      return;
    }
    setTaskList(taskList.filter((item) => !itmToDelete.includes(item._id)));

    setItmToDelete([]);
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
