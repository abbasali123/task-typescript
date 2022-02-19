import express from "express";

export const taskRoutes = (taskControllers: Record<string, any>) => {
  const taskRouter = express.Router();

  taskRouter.post("/create-task", taskControllers.createTask);
  taskRouter.get("/list-tasks", taskControllers.getAllTasks);
  taskRouter.delete("/bulk-delete", taskControllers.bulkDeleteTasks);

  return taskRouter;
};
