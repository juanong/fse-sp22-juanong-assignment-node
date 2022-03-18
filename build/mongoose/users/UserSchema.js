"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for tuits
 */
const mongoose_1 = __importDefault(require("mongoose"));
const Location_1 = __importDefault(require("../../models/users/Location"));
/**
 * @typedef Location Represents where the user is located in lat/long coordinates
 * @property {string} username represents the user's username
 * @property {string} password represents the user's password
 * @property {string} firstName represents the user's first name
 * @property {string} lastName represents the user's last name
 * @property {string} email represents the user's email
 * @property {string} profilePhoto represents a url to the user's profile photo
 * @property {string} headerImage represents a url to the user's header image
 * @property {string} accountType represents the user's account type
 * @property {string} maritalStatus represents the user's marital status
 * @property {string} biography represents the user's biography
 * @property {Date} dateOfBirth represents the user's date of birth
 * @property {Date} joined represents the date the user created their account
 * @property {Location} location represents the location of the user
 * @property {Number} salary represents the user's salary
 */
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, default: `testusername${Date.now()}` },
    password: { type: String, required: true, default: `testpassword${Date.now()}` },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, default: `testemail${Date.now()}` },
    profilePhoto: String,
    headerImage: String,
    accountType: { type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL'] },
    maritalStatus: { type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED'] },
    biography: String,
    dateOfBirth: Date,
    joined: { type: Date },
    location: Location_1.default,
    salary: { type: Number, default: 50000 }
}, { collection: 'users' });
exports.default = UserSchema;
