import React from "react";

export const BadList = ({
  badList,
  itmToDelete,
  handleOnSelect,
  switchTask,
}) => {
  // const ttl = badList.reduce((acc, item) => acc + +item.hr, 0);
  return (
    <div className="col-md">
      <h2 className="text-center">Bad List</h2>
      <hr />
      <table className="table table-str  ped table-hover">
        <tbody id="bad-task">
          {badList.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={item._id}
                      onChange={handleOnSelect}
                      checked={itmToDelete.includes(item._id)}
                    />
                  </td>
                </td>
                <td>{item.task}</td>
                <td>{item.hr}</td>
                <td class="text-end">
                  <button
                    onClick={() => switchTask(item._id, "entry")}
                    class="btn btn-warning"
                  >
                    <i class="fa-solid fa-left-long"></i>
                  </button>
                  {/* <button onclick="deleteBadTask(${i})" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-end fw-bold">
        You could have saved ={" "}
        <span id="totalBadHr">
          {badList.reduce((acc, item) => acc + +item.hr, 0)}
        </span>{" "}
        Hrs
      </div>
    </div>
  );
};
