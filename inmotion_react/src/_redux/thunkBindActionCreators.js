export default (mapObject, dispatch) => {
    let out = {};
    Object.keys(mapObject).forEach(key => {
        out[key] = (arg) => (dispatch(mapObject[key](arg)));
    });
    return out;
};