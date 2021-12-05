"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const SongSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    time: String,
    type: String
}, { autoCreate: true, timestamps: true });
exports.Song = (0, mongoose_2.model)('Song', SongSchema);
//# sourceMappingURL=Song.js.map