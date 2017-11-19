export const TYPE_MAPS_SHOWMENU = 'type_maps_showmenu';
export default (name) => (dispatch) => {
    dispatch({type: TYPE_MAPS_SHOWMENU, payload: name});
}