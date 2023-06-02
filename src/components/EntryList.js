import React from "react";

export const EntryList = ({
  taskList,
  switchTask,
  handleOnSelect,
  itmToDelete,
}) => {
  return (
    <div className="col-md">
      <h2 className="text-center">Entry List</h2>
      <hr />
      <table className="table table-striped table-hover">
        <tbody id="task-list">
          {taskList.map((item, i) => {
            return (
              <tr>
                <td>
                  {/* <input
                    type="checkbox"
                    className="form-check-input"
                    value={item._id}
                    onChange={handleOnSelect}
                  /> */}
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={item._id}
                    onChange={handleOnSelect}
                    checked={itmToDelete.includes(item._id)}
                  />
                </td>
                <td>{item.task}</td>
                <td>{item.hr}</td>
                <td class="text-end">
                  {/* <button onClick="deleteTask(${i})" class="btn btn-danger">
                    <i class="fa-solid f a-trash"></i>
                  </button> */}
                  <button
                    onClick={() => switchTask(item._id, "bad")}
                    class="btn btn-success"
                  >
                    <i class="fa-solid fa-right-long"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
