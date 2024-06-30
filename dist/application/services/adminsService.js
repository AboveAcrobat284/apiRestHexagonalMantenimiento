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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsService = void 0;
const admin_1 = __importDefault(require("../../domain/models/admin"));
class AdminsService {
    constructor(adminRepository) {
        AdminsService.adminRepository = adminRepository;
    }
    static createAdmin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = new admin_1.default(null, email, password);
            return yield AdminsService.adminRepository.save(admin);
        });
    }
    static getAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminsService.adminRepository.findById(id);
        });
    }
    static getAllAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminsService.adminRepository.findAll();
        });
    }
    static updateAdmin(id, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = new admin_1.default(id, email, password);
            return yield AdminsService.adminRepository.update(admin);
        });
    }
    static deleteAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield AdminsService.adminRepository.deleteById(id);
        });
    }
}
exports.AdminsService = AdminsService;
