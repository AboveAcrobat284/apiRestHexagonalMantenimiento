// src/infrastructure/diContainer.ts
import { IUserRepository } from '../domain/repositories/IUserRepository';
import MongoUserRepository from '../adapters/repositories/mongoUserRepository';
import MySQLUserRepository from '../adapters/repositories/mysqlUserRepository';
import { UserService } from '../application/services/userService';
import connectMongoDB from './database/mongoConnection';
import connectMySQL from './database/mysqlConnection';
import { S3StorageRepository } from '../adapters/repositories/s3StorageRepository';
import { LocalStorageRepository } from '../adapters/repositories/localStorageRepository';
import { IStorageRepository } from '../domain/repositories/IStorageRepository';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';
import MongoAdminRepository from '../adapters/repositories/mongoAdminRepository';
import MySQLAdminRepository from '../adapters/repositories/mysqlAdminRepository';
import { AdminsService } from '../application/services/adminsService';

const useMongoDB: boolean = process.env.USE_MONGODB === 'true';
const useS3: boolean = process.env.USE_S3 === 'true';

let userRepository: IUserRepository;
let adminRepository: IAdminRepository;

if (useMongoDB) {
    connectMongoDB();
    userRepository = new MongoUserRepository();
    adminRepository = new MongoAdminRepository();
} else {
    connectMySQL();
    userRepository = new MySQLUserRepository();
    adminRepository = new MySQLAdminRepository();
}

let storageRepository: IStorageRepository;

if (useS3) {
    storageRepository = new S3StorageRepository();
} else {
    storageRepository = new LocalStorageRepository();
}

const userService = new UserService(userRepository);
const adminsService = new AdminsService(adminRepository);

export { userService, adminsService, storageRepository };
