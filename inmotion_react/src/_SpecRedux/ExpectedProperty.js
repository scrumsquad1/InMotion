import MissingArgumentError from './errors/MissingArgumentError';

export default class ExpectedProperty {

    constructor({name, type, optional, nullable}) {

        if (!name)
            throw new MissingArgumentError('name');

        if (!type)
            throw new MissingArgumentError('type');

        this.name = name;
        this.type = type;
        this.optional = optional || false;
        this.nullable = nullable || false;
    }

    /**
     * Returns true if the passed object contains this property
     * @param obj
     */
    isFoundIn(obj) {
        return (obj[this.name] !== undefined);
    }

    isFoundWithType(obj) {
        return (
            this.isFoundIn(obj)
            && (
                typeof obj[this.name] === this.type
                || (this.type === 'array' && Array.isArray(obj[this.name]))
                || (this.nullable === true && obj[this.name] === null)
            )
        );
    }

}