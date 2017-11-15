export const TYPE_MAPS_SETLISTSTATE = 'type_maps_setliststate';
export default ({id, state}) => (dispatch) => {
    dispatch({type: TYPE_MAPS_SETLISTSTATE, payload: {id, state}});
}