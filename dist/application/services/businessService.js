"use strict";
// src/application/services/businessService.ts
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
exports.BusinessService = void 0;
const bussines_1 = __importDefault(require("../../domain/models/bussines"));
class BusinessService {
    constructor(businessRepository) {
        BusinessService.businessRepository = businessRepository;
    }
    static createBusiness(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const business = new bussines_1.default(null, name, description);
            return yield BusinessService.businessRepository.save(business);
        });
    }
    static getBusinessById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BusinessService.businessRepository.findById(id);
        });
    }
    static getAllBusinesses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BusinessService.businessRepository.findAll();
        });
    }
    static updateBusiness(id, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const business = new bussines_1.default(id, name, description);
            return yield BusinessService.businessRepository.update(business);
        });
    }
    static deleteBusinessById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BusinessService.businessRepository.deleteById(id);
        });
    }
}
exports.BusinessService = BusinessService;
