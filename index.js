const Ajv2020 = require("ajv/dist/2020");
const addFormats = require('ajv-formats');
const ajv = new Ajv2020({allErrors: true});
const unleashSchema = require('./schemas/unleash-schema.json');
addFormats(ajv);
const validator = ajv.compile(unleashSchema);

module.exports = {
    validator
};