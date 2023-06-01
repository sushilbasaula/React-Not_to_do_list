import React from "react";

export const BadList = ({ badList }) => {
  return (
    <div className="col-md">
      <h2 className="text-center">Bad List</h2>
      <hr />
      <table className="table table-striped table-hover">
        <tbody id="bad-task">
          {badList.map((item, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{item.task}</td>
                <td>{item.hr}</td>
                <td class="text-end">
                  <button onclick="markAsToDo(${i})" class="btn btn-warning">
                    <i class="fa-solid fa-left-long"></i>
                  </button>
                  <button onclick="deleteBadTask(${i})" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-end fw-bold">
        You could have saved = <span id="totalBadHr">0</span> Hrs
      </div>
    </div>
  );
};
