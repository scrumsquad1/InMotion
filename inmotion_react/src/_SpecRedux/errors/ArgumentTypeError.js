export const ARGUMENT_TYPE_ERROR_TYPE = 'argumentTypeError';
export default class ArgumentTypeError extends Error {

    constructor(expectedArgumentType, argumentType, name) {
        super(`Bad argument type. Expected ${expectedArgumentType} found ${argumentType} ${name?'of name ' + name:''}`);
        this.type = ARGUMENT_TYPE_ERROR_TYPE;
        this.expectedArgumentType = expectedArgumentType;
        this.argumenType = argumentType;
    }

}
