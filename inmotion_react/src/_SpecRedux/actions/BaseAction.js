import InitializationError from '../errors/InitializationError';
import MissingArgumentError from '../errors/MissingArgumentError';
import ArgumentTypeError from '../errors/ArgumentTypeError';
import CheckObjectProperties from '../CheckObjectProperties';

export default class BaseAction {

    constructor() {

        this.checkOverrides();

        this.actionType = `TYPE_${this.displayName.toUpperCase()}`;
        this.actionTypeError = `${this.actionType}_ERROR`;

        this.errorField = `${this.displayName}Error`;

        this.defaultFields = this.getDefaultFields() || {};
        this.defaultFields[this.errorField] = null;

    }

    checkOverrides() {

        if (new.target === BaseAction)
            throw new InitializationError('Cannot construct BaseAction instances directly');

        if (this.expectedArguments) {

            if (!Array.isArray(this.expectedArguments))
                throw new InitializationError(`Unexpected type of requiredArguments expected array found ${typeof this.expectedArguments}`);

            if (this.singleArgumentType)
                throw new InitializationError(`singleArgumentType and requiredArguments can not both be used simultaneously`);

        }

        if (!this.reducer)
            throw new InitializationError('reducer must be overridden');

        if (!this.storeName)
            throw new InitializationError('displayName must be overridden');

        if (!this.displayName)
            throw new InitializationError('displayName must be overridden');

        if (typeof this.displayName !== 'string')
            throw new InitializationError(`Unexpected type of name expected string found ${typeof this.displayName}`);

    }

    get storeName() {
        return false;
    }

    get displayName() {
        return false;
    }

    reducer(state, action) {

        let stateChange = {};

        if (action.type === this.actionTypeError) {
            stateChange[this.errorField] = action.payload;
        }

        return stateChange;

    }

    get expectedArguments() {
        return false;
    }

    get singleArgumentType() {
    }

    action = (args) => (dispatch) => {

        // Check arguments
        if (this.singleArgumentType) {
            //If singleArgumentType is overridden, check args to see if it is a single argument of type singleArgumentType
            if (!(typeof args === this.singleArgumentType || (this.singleArgumentType === 'array' && Array.isArray(args))))
                throw new ArgumentTypeError(this.singleArgumentType, args);
        } else {

            if (this.expectedArguments) {
                const result = CheckObjectProperties(args, this.expectedArguments);
                if (!result.passed) {
                    if (result.missingProperties) {
                        throw new MissingArgumentError(result.missingProperties[0].name);
                    }
                    if (result.badProperties) {
                        throw new ArgumentTypeError(result.badProperties[0].type, typeof args[result.badProperties[0].name], result.badProperties[0].name);
                    }
                }
            }

        }

        this.onExecute(dispatch, args);
        this.onFinish({dispatch});

    };

    dispatchError(dispatch, payload) {
        dispatch({type: this.actionTypeError, payload});
    }

    onExecute(dispatch, args) {
        throw new InitializationError('onExecute must be overridden');
    }

    onFinish({dispatch}) {

    }

    getDefaultFields() {

    }

}
