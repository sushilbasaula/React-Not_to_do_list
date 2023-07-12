import axios from "axios";

const rootAPIUrl = "http://localhost:8000/api/v1";
const taskEp = rootAPIUrl + "/task";
export const fetchAllTask = async () => {
  try {
    const { data } = await axios.get(taskEp);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTask = async (taskDt) => {
  try {
    const { data } = await axios.post(taskEp, taskDt);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTask = async (dataObj) => {
  try {
    const { data } = await axios.patch(taskEp, dataObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
