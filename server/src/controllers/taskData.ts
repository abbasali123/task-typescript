import express from "express";
import { Task } from "../models";
import { IGetUserAuthInfoRequest } from "../types";

const createTask = async (
  req: IGetUserAuthInfoRequest,
  res: express.Response
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "task name is missing" });
    }

    const createdTask = await Task.create({
      name,
    });

    return res.status(200).json({
      success: true,
      message: "1 record inserted",
      task: createdTask,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const getAllTasks = async (
  req: IGetUserAuthInfoRequest,
  res: express.Response
) => {
  try {
    const tasksData = await Task.find();
    console.log("tasksData", tasksData);

    return res.status(200).json({
      tasks: tasksData?.map((value) => {
        return {
          name: value.name,
          id: value._id,
        };
      }),
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

const bulkDeleteTasks = async (
  req: IGetUserAuthInfoRequest,
  res: express.Response
) => {
  try {
    const { ids } = req.body;
    console.log(ids, "values to delete");
    if (!ids) {
      return res.status(400).json({ message: "specify tasks to delete" });
    }
    const deletedTasks = await Task.deleteMany({ _id: { $in: ids } });
    console.log("tasksData", deletedTasks);

    return res.status(200).json({
      message: "tasks deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

export { createTask, getAllTasks, bulkDeleteTasks };
