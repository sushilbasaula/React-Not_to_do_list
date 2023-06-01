import React, { useState } from "react";
import { randomStr } from "../utilis";

export const Form = ({ addTask }) => {
  const [form, setForm] = useState({ type: "entry" });
  // console.log(form);

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
    // console.log(form);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const _id = randomStr();
    console.log(_id);
    addTask({ ...form, _id });
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="row mt-3 g-2">
        <div className="col-md-6">
          <input
            name="task"
            type="text"
            className="form-control"
            placeholder=""
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-3">
          <input
            name="hr"
            type="number"
            className="form-control"
            min="1"
            placeholder=""
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-3 d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            <i className="fa-solid fa-plus"></i>
            Add New Task
          </button>
        </div>
      </div>
    </form>
  );
};
