export default function (object, expectedPropertyArray) {

    let missingProperties = [];
    let badProperties = [];
    let passed = true;

    if (expectedPropertyArray) {
        expectedPropertyArray.forEach((expectedProperty) => {
            if (expectedProperty.isFoundIn(object)) {
                if (!expectedProperty.isFoundWithType(object)) {
                    badProperties.push(expectedProperty);
                    passed = false;
                }
            } else {
                missingProperties.push(expectedProperty);
                if (!expectedProperty.optional) {
                    passed = false;
                }
            }
        });
    }

    let result = new CheckObjectPropertyResult(passed);

    if (missingProperties.length > 0)
        result.missingProperties = missingProperties;

    if (badProperties.length > 0)
        result.badProperties = badProperties;

    return result;

}

export class CheckObjectPropertyResult {

    constructor(passed) {
        this.passed = passed;
        this.missingProperties = false;
        this.badProperties = false;
    }

}
