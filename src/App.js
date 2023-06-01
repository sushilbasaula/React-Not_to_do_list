import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Title } from "./components/Title";
import { Form } from "./components/Form";
import { ListArea } from "./components/ListArea";
import { useState } from "react";

function App() {
  const [taskList, setTaskList] = useState([]);
  // const handleOnSubmit = (e) => {};
  const addTask = (data) => {
    // console.log(data);
    setTaskList([...taskList, data]);
  };
  const switchTask = (_id) => {
    // console.log(i);
    const temArg = taskList.map((item, index) => {
      if (item._id === _id) {
        item.type = "bad";
      }
      return item;
    });
    setTaskList(temArg);
    // console.log(taskList);
  };
  console.log(taskList);
  return (
    <div className="wrapper">
      <div className="container">
        <Title />

        <Form addTask={addTask} />

        <ListArea taskList={taskList} switchTask={switchTask} />

        <div className="row fw-bold">
          <div className="col">
            The total hours allocated = <span id="totalHrs">0</span> Hrs
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
