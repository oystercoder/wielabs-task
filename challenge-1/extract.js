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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
var fs = require("fs");
var zlib = require("zlib");
var tar = require("tar");
function extract(downloadPath, extractionPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Create the extraction directory if it doesn't exist
            if (!fs.existsSync(extractionPath)) {
                fs.mkdirSync(extractionPath);
            }
            // Create a promise to track the extraction process
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // Create a read stream for the downloaded file
                    var readStream = fs.createReadStream(downloadPath);
                    // Pipe the read stream through the decompression (gunzip) stream
                    var decompressStream = zlib.createGunzip();
                    // Pipe the decompression stream through the untar stream
                    var extractStream = tar.extract({
                        cwd: extractionPath // Extract files to the specified directory
                    });
                    // Handle errors during the extraction process
                    extractStream.on('error', function (err) {
                        reject(new Error('Error extracting file: ' + err.message));
                    });
                    // Listen for the 'finish' event to know when extraction is complete
                    extractStream.on('finish', function () {
                        console.log('Extraction complete');
                        resolve(); // Resolve the promise when extraction is complete
                    });
                    // Start the extraction process
                    readStream.pipe(decompressStream).pipe(extractStream);
                })];
        });
    });
}
exports.extract = extract;
// import * as fs from 'fs';
// import * as zlib from 'zlib';
// import * as tar from 'tar';
// export async function extract(downloadPath: string, extractionPath: string): Promise<void> {
//     return new Promise<void>((resolve, reject) => {
//         // Check if the file exists and is readable
//         if (!fs.existsSync(downloadPath)) {
//             reject(new Error('File does not exist or is not readable: ' + downloadPath));
//             return;
//         }
//         // Create the extraction directory if it doesn't exist
//         if (!fs.existsSync(extractionPath)) {
//             fs.mkdirSync(extractionPath);
//         }
//         // Create a read stream for the downloaded file
//         const readStream = fs.createReadStream(downloadPath);
//         // Handle errors during file reading
//         readStream.on('error', (err: Error) => {
//             reject(new Error('Error reading file: ' + err.message));
//         });
//         // Create a decompression (gunzip) stream
//         const decompressStream = zlib.createGunzip();
//         // Handle errors during decompression
//         decompressStream.on('error', (err: Error) => {
//             reject(new Error('Error decompressing file: ' + err.message));
//         });
//         // Create an extract stream
//         const extractStream = tar.extract({
//             cwd: extractionPath, // Extract files to the specified directory
//             strict: true, // Throw error if unexpected entries are encountered
//         });
//         // Handle errors during extraction
//         extractStream.on('error', (err: Error) => {
//             reject(new Error('Error extracting file: ' + err.message));
//         });
//         // Listen for the 'finish' event to know when extraction is complete
//         extractStream.on('finish', () => {
//             console.log('Extraction completed');
//             resolve(); // Resolve the promise when extraction is complete
//         });
//         // Pipe the read stream through the decompression stream
//         readStream.pipe(decompressStream);
//         // Pipe the decompression stream through the extract stream
//         decompressStream.pipe(extractStream);
//     });
// }
