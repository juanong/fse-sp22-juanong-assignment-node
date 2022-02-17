"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Location = new mongoose_1.default.Schema({
    latitude: { type: Number, default: 0.0 },
    longitude: { type: Number, default: 0.0 },
}, {});
exports.default = Location;
