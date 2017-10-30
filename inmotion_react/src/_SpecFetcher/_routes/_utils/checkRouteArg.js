export default (name, value, callback) => {
    if (value === undefined) {
        callback(name + ' is required but not found');
        return false;
    }
    return true;
}