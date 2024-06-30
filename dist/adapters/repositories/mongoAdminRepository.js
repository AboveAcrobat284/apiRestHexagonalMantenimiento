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
const admin_1 = __importDefault(require("../../domain/models/admin"));
const adminSchema_1 = require("./schemas/adminSchema");
class MongoAdminRepository {
    save(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminModel = new adminSchema_1.AdminModel(admin);
            const savedAdmin = yield adminModel.save();
            return new admin_1.default(savedAdmin.id, savedAdmin.email, savedAdmin.password);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield adminSchema_1.AdminModel.findById(id);
            if (!admin)
                return null;
            return new admin_1.default(admin.id, admin.email, admin.password);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield adminSchema_1.AdminModel.find();
            return admins.map(admin => new admin_1.default(admin.id, admin.email, admin.password));
        });
    }
    update(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedAdmin = yield adminSchema_1.AdminModel.findByIdAndUpdate(admin.id, admin, { new: true });
            if (!updatedAdmin)
                throw new Error('Admin not found');
            return new admin_1.default(updatedAdmin.id, updatedAdmin.email, updatedAdmin.password);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield adminSchema_1.AdminModel.findByIdAndDelete(id);
        });
    }
}
exports.default = MongoAdminRepository;
