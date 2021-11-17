"use strict";
exports.__esModule = true;
var _2020_1 = require("ajv/dist/2020");
var ajv_formats_1 = require("ajv-formats");
var ajv = new _2020_1["default"]({ allErrors: true });
var unleashSchema = require("./schemas/unleash-schema.json");
ajv_formats_1["default"].addFormats(ajv);
var validator = ajv.compile(unleashSchema);
exports["default"] = validator;
