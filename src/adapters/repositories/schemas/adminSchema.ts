// src/adapters/repositories/schemas/adminSchema.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminDocument extends Document {
    email: string;
    password: string;
}

const adminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const AdminModel = mongoose.model<IAdminDocument>('Admin', adminSchema);
