import React from "react";
import { EntryList } from "./EntryList";
import { BadList } from "./BadList";

export const ListArea = ({ taskList, switchTask }) => {
  const entList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");
  return (
    <div className="row mt-5 g-2">
      <EntryList taskList={entList} switchTask={switchTask} />

      <BadList badList={badList} />
    </div>
  );
};
