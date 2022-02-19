import { Schema, Document, Model, model } from "mongoose";

const TaskSchema = new Schema({
  name: String,
});

interface ITask {
  name: String;
}

interface ITaskDocument extends ITask, Document {}
interface ITaskModel extends Model<ITaskDocument> {}

const TaskModel = model<ITaskDocument>("task", TaskSchema);

export { TaskSchema, ITask, ITaskDocument, ITaskModel, TaskModel };
