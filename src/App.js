import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Title } from "./components/Title";
import { Form } from "./components/Form";
import { ListArea } from "./components/ListArea";
import { useState } from "react";

const hrPerWeek = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [itmToDelete, setItmToDelete] = useState([]);
  const totalHrs = taskList.reduce((subTtl, item) => subTtl + +item.hr, 0);
  // const handleOnSubmit = (e) => {};
  const addTask = (data) => {
    if (hrPerWeek < totalHrs + +data.hr) {
      return alert("Boss, you don't have enough time, sorry la");
    }
    // console.log(data);
    setTaskList([...taskList, data]);
  };
  const switchTask = (_id, type) => {
    console.log(_id);
    const temArg = taskList.map((item, index) => {
      if (item._id === _id) {
        item.type = type;
      }
      return item;
    });
    setTaskList(temArg);
    // console.log(taskList);
  };
  const handleOnSelect = (e) => {
    const { value, checked } = e.target;
    // console.log(value, checked);
    checked
      ? setItmToDelete([...itmToDelete, value])
      : // const filteredArg = itmToDelete.filter((item) => item !== value);
        setItmToDelete(itmToDelete.filter((item) => item !== value));
  };
  const handleOnDelete = () => {
    console.log("Deleting");
    // const filteredArg = taskList.filter((item) =>
    //   itmToDelete.includes(item._id)
    // );
    if (!window.confirm("Are You Sure you want to delete")) {
      return;
    }
    setTaskList(taskList.filter((item) => !itmToDelete.includes(item._id)));

    setItmToDelete([]);
  };
  console.log(itmToDelete);
  // console.log(taskList);

  return (
    <div className="wrapper">
      <div className="container">
        <Title />

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
