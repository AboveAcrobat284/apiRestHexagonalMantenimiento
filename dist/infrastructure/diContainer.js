"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageRepository = exports.adminsService = exports.userService = void 0;
const mongoUserRepository_1 = __importDefault(require("../adapters/repositories/mongoUserRepository"));
const mysqlUserRepository_1 = __importDefault(require("../adapters/repositories/mysqlUserRepository"));
const userService_1 = require("../application/services/userService");
const mongoConnection_1 = __importDefault(require("./database/mongoConnection"));
const mysqlConnection_1 = __importDefault(require("./database/mysqlConnection"));
const s3StorageRepository_1 = require("../adapters/repositories/s3StorageRepository");
const localStorageRepository_1 = require("../adapters/repositories/localStorageRepository");
const mongoAdminRepository_1 = __importDefault(require("../adapters/repositories/mongoAdminRepository"));
const mysqlAdminRepository_1 = __importDefault(require("../adapters/repositories/mysqlAdminRepository"));
const adminsService_1 = require("../application/services/adminsService");
const useMongoDB = process.env.USE_MONGODB === 'true';
const useS3 = process.env.USE_S3 === 'true';
let userRepository;
let adminRepository;
if (useMongoDB) {
    (0, mongoConnection_1.default)();
    userRepository = new mongoUserRepository_1.default();
    adminRepository = new mongoAdminRepository_1.default();
}
else {
    (0, mysqlConnection_1.default)();
    userRepository = new mysqlUserRepository_1.default();
    adminRepository = new mysqlAdminRepository_1.default();
}
let storageRepository;
exports.storageRepository = storageRepository;
if (useS3) {
    exports.storageRepository = storageRepository = new s3StorageRepository_1.S3StorageRepository();
}
else {
    exports.storageRepository = storageRepository = new localStorageRepository_1.LocalStorageRepository();
}
const userService = new userService_1.UserService(userRepository);
exports.userService = userService;
const adminsService = new adminsService_1.AdminsService(adminRepository);
exports.adminsService = adminsService;
