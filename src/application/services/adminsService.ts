// src/application/services/adminsService.ts
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import Admin from '../../domain/models/admin';

export class AdminsService {
    private static adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        AdminsService.adminRepository = adminRepository;
    }

    static async createAdmin(email: string, password: string): Promise<Admin> {
        const admin = new Admin(null, email, password);
        return await AdminsService.adminRepository.save(admin);
    }

    static async getAdminById(id: string): Promise<Admin | null> {
        return await AdminsService.adminRepository.findById(id);
    }

    static async getAllAdmins(): Promise<Admin[]> {
        return await AdminsService.adminRepository.findAll();
    }

    static async updateAdmin(id: string, email: string, password: string): Promise<Admin> {
        const admin = new Admin(id, email, password);
        return await AdminsService.adminRepository.update(admin);
    }

    static async deleteAdminById(id: string): Promise<void> {
        await AdminsService.adminRepository.deleteById(id);
    }
}
