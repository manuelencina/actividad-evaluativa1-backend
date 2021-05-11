"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = require("fs");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const uuid_1 = require("uuid");
const notas = __importStar(require("../notas.json"));
const app = express_1.default();
const port = 5000;
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.json());
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = req.body;
    const datos = notas.data;
    while (true) {
        let uuid = uuid_1.v4();
        const bo = datos.some(data => data.id === uuid);
        if (!bo || datos.length === 0) {
            datos.push({
                id: uuid_1.v4(),
                title: newNote.title,
                state: newNote.state,
                description: newNote.state
            });
            break;
        }
    }
    const d = JSON.stringify({
        data: datos
    });
    yield fs_1.promises.writeFile('notas.json', d);
    res.json(datos);
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
