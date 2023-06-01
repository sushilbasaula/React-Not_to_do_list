import React from "react";

export const EntryList = ({ taskList, switchTask }) => {
  return (
    <div className="col-md">
      <h2 className="text-center">Entry List</h2>
      <hr />
      <table className="table table-striped table-hover">
        <tbody id="task-list">
          {taskList.map((item, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{item.task}</td>
                <td>{item.hr}</td>
                <td class="text-end">
                  <button onClick="deleteTask(${i})" class="btn btn-danger">
                    <i class="fa-solid f a-trash"></i>
                  </button>
                  <button
                    onClick={() => switchTask(item._id)}
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
