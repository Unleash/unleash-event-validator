import Ajv2020 from "ajv/dist/2020";
import formats from "ajv-formats";
const ajv = new Ajv2020({ allErrors: true });
import * as unleashSchema from "./schemas/unleash-schema.json";

formats.addFormats(ajv);

const validator = ajv.compile(unleashSchema);

export default validator;
