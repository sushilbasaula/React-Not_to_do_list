import React from "react";
import { EntryList } from "./EntryList";
import { BadList } from "./BadList";

export const ListArea = ({
  taskList,
  switchTask,
  handleOnSelect,
  itmToDelete,
}) => {
  const entList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");
  return (
    <div className="row mt-5 g-2">
      <EntryList
        taskList={entList}
        switchTask={switchTask}
        handleOnSelect={handleOnSelect}
        itmToDelete={itmToDelete}
      />

      <BadList
        badList={badList}
        itmToDelete={itmToDelete}
        handleOnSelect={handleOnSelect}
        switchTask={switchTask}
      />
    </div>
  );
};
