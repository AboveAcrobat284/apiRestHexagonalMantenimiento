// src/adapters/repositories/mongoAdminRepository.ts
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import Admin from '../../domain/models/admin';
import { IAdminDocument, AdminModel } from './schemas/adminSchema';

class MongoAdminRepository implements IAdminRepository {
    async save(admin: Admin): Promise<Admin> {
        const adminModel = new AdminModel(admin);
        const savedAdmin = await adminModel.save();
        return new Admin(savedAdmin.id, savedAdmin.email, savedAdmin.password);
    }

    async findById(id: string): Promise<Admin | null> {
        const admin = await AdminModel.findById(id);
        if (!admin) return null;
        return new Admin(admin.id, admin.email, admin.password);
    }

    async findAll(): Promise<Admin[]> {
        const admins: IAdminDocument[] = await AdminModel.find();
        return admins.map(admin => new Admin(admin.id, admin.email, admin.password));
    }

    async update(admin: Admin): Promise<Admin> {
        const updatedAdmin = await AdminModel.findByIdAndUpdate(admin.id, admin, { new: true });
        if (!updatedAdmin) throw new Error('Admin not found');
        return new Admin(updatedAdmin.id, updatedAdmin.email, updatedAdmin.password);
    }

    async deleteById(id: string): Promise<void> {
        await AdminModel.findByIdAndDelete(id);
    }
}

export default MongoAdminRepository;
