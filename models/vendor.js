const mongoose = require("mongoose");

const vendorschema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firm: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'firm'
        }
    ]
});

const vendor = mongoose.model('vendor', vendorschema);
module.exports = vendor;