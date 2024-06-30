"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminById = exports.updateAdmin = exports.getAllAdmins = exports.getAdminById = exports.createAdmin = void 0;
const adminsService_1 = require("../../application/services/adminsService"); // Verifica la importación aquí
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield adminsService_1.AdminsService.createAdmin(email, password);
        res.status(201).json(admin);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createAdmin = createAdmin;
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const admin = yield adminsService_1.AdminsService.getAdminById(id);
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
        }
        else {
            res.status(200).json(admin);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAdminById = getAdminById;
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield adminsService_1.AdminsService.getAllAdmins();
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllAdmins = getAllAdmins;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        const updatedAdmin = yield adminsService_1.AdminsService.updateAdmin(id, email, password);
        res.status(200).json(updatedAdmin);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateAdmin = updateAdmin;
const deleteAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield adminsService_1.AdminsService.deleteAdminById(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteAdminById = deleteAdminById;
