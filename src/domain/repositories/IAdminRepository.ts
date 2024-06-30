// src/domain/repositories/IAdminRepository.ts
import Admin from '../models/admin';

export interface IAdminRepository {
    save(admin: Admin): Promise<Admin>;
    findById(id: string): Promise<Admin | null>;
    findAll(): Promise<Admin[]>;
    update(admin: Admin): Promise<Admin>;
    deleteById(id: string): Promise<void>;
}
