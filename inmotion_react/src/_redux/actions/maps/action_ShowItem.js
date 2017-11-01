export const TYPE_MAPS_SHOWITEM = 'type_maps_showitem';

/**
 * Show a list item on the map
 * @param itemId The id of the list item you want displayed
 */
export default (itemId) => (dispatch) => {
    dispatch({type: TYPE_MAPS_SHOWITEM, payload: itemId});
}