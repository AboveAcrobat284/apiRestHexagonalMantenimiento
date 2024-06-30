"use strict";
// src/adapters/repositories/mongoBusinessRepository.ts
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
const businessSchema_1 = require("./schemas/businessSchema");
class MongoBusinessRepository {
    save(business) {
        return __awaiter(this, void 0, void 0, function* () {
            const businessModel = new businessSchema_1.BusinessModel(business);
            const savedBusiness = yield businessModel.save();
            return new bussines_1.default(savedBusiness.id, savedBusiness.name, savedBusiness.description);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const business = yield businessSchema_1.BusinessModel.findById(id);
            if (!business)
                return null;
            return new bussines_1.default(business.id, business.name, business.description);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const businesses = yield businessSchema_1.BusinessModel.find();
            return businesses.map(business => new bussines_1.default(business.id, business.name, business.description));
        });
    }
    update(business) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBusiness = yield businessSchema_1.BusinessModel.findByIdAndUpdate(business.id, business, { new: true });
            if (!updatedBusiness)
                throw new Error('Business not found');
            return new bussines_1.default(updatedBusiness.id, updatedBusiness.name, updatedBusiness.description);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield businessSchema_1.BusinessModel.findByIdAndDelete(id);
        });
    }
}
exports.default = MongoBusinessRepository;
