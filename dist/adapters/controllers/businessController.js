"use strict";
// src/adapters/controllers/businessController.ts
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
exports.deleteBusinessById = exports.updateBusiness = exports.getAllBusinesses = exports.getBusinessById = exports.createBusiness = void 0;
const businessService_1 = require("../../application/services/businessService"); // Verifica la importación aquí
const createBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const business = yield businessService_1.BusinessService.createBusiness(name, description);
        res.status(201).json(business);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createBusiness = createBusiness;
const getBusinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const business = yield businessService_1.BusinessService.getBusinessById(id);
        if (!business) {
            res.status(404).json({ message: 'Business not found' });
        }
        else {
            res.status(200).json(business);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBusinessById = getBusinessById;
const getAllBusinesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const businesses = yield businessService_1.BusinessService.getAllBusinesses();
        res.status(200).json(businesses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllBusinesses = getAllBusinesses;
const updateBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedBusiness = yield businessService_1.BusinessService.updateBusiness(id, name, description);
        res.status(200).json(updatedBusiness);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateBusiness = updateBusiness;
const deleteBusinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield businessService_1.BusinessService.deleteBusinessById(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteBusinessById = deleteBusinessById;
