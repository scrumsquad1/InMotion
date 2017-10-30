export const INITIALIZATION_ERROR_TYPE = 'InitializationError';
export default class InitializationError extends Error {

    constructor(message) {
        super(message);
        this.type = INITIALIZATION_ERROR_TYPE;
    }

}
