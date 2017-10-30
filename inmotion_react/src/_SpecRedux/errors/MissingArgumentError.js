export const MISSING_ARGUMENT_ERROR_TYPE = 'missingArgumentError';
export default class MissingArgumentError extends Error {

    constructor(argumentName) {
        super(`Missing expected argument ${argumentName}`);
        this.argumentName = argumentName;
        this.type = MISSING_ARGUMENT_ERROR_TYPE;
    }

}