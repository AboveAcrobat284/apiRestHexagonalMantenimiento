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
const mysqlConnection_1 = __importDefault(require("../../infrastructure/database/mysqlConnection"));
class MySQLAdminRepository {
    save(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [result] = yield connection.execute('INSERT INTO admins (email, password) VALUES (?, ?)', [admin.email, admin.password]);
            admin.id = result.insertId.toString();
            return admin;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [rows] = yield connection.execute('SELECT * FROM admins WHERE id = ?', [id]);
            if (rows.length === 0)
                return null;
            const row = rows[0];
            return new admin_1.default(row.id.toString(), row.email, row.password);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [rows] = yield connection.execute('SELECT * FROM admins');
            return rows.map(row => new admin_1.default(row.id.toString(), row.email, row.password));
        });
    }
    update(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            yield connection.execute('UPDATE admins SET email = ?, password = ? WHERE id = ?', [admin.email, admin.password, admin.id]);
            return admin;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            yield connection.execute('DELETE FROM admins WHERE id = ?', [id]);
        });
    }
}
exports.default = MySQLAdminRepository;
