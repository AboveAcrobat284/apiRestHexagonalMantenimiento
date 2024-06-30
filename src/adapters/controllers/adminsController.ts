// src/adapters/controllers/adminsController.ts
import { Request, Response } from 'express';
import { AdminsService } from '../../application/services/adminsService'; // Verifica la importación aquí

export const createAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminsService.createAdmin(email, password);
        res.status(201).json(admin);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const admin = await AdminsService.getAdminById(id);
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
        } else {
            res.status(200).json(admin);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await AdminsService.getAllAdmins();
        res.status(200).json(admins);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        const updatedAdmin = await AdminsService.updateAdmin(id, email, password);
        res.status(200).json(updatedAdmin);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAdminById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await AdminsService.deleteAdminById(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
