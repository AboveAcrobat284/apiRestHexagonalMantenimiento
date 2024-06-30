"use strict";
// src/adapters/repositories/mysqlBusinessRepository.ts
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
const bussines_1 = __importDefault(require("../../domain/models/bussines"));
const mysqlConnection_1 = __importDefault(require("../../infrastructure/database/mysqlConnection"));
class MySQLBusinessRepository {
    save(business) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [result] = yield connection.execute('INSERT INTO businesses (name, description) VALUES (?, ?)', [business.name, business.description]);
            business.id = result.insertId.toString();
            return business;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [rows] = yield connection.execute('SELECT * FROM businesses WHERE id = ?', [id]);
            if (rows.length === 0)
                return null;
            const row = rows[0];
            return new bussines_1.default(row.id.toString(), row.name, row.description);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            const [rows] = yield connection.execute('SELECT * FROM businesses');
            return rows.map(row => new bussines_1.default(row.id.toString(), row.name, row.description));
        });
    }
    update(business) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            yield connection.execute('UPDATE businesses SET name = ?, description = ? WHERE id = ?', [business.name, business.description, business.id]);
            return business;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, mysqlConnection_1.default)();
            yield connection.execute('DELETE FROM businesses WHERE id = ?', [id]);
        });
    }
}
exports.default = MySQLBusinessRepository;
