import { Schema, Document, Types } from 'mongoose';

export const TodoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: Types.ObjectId, required: true, ref:"User" }, // User ID or username for authorization
});

export interface Todo extends Document {
  text: string;
  completed: boolean;
  user: Types.ObjectId;
}
