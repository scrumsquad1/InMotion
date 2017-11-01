export const TYPE_MAPS_HIDEITEM = 'type_maps_hideitem';

/**
 * Hide the active list item on the map
 * For now, since we only are displaying one item at a time, we do not need an argument for hideItem.
 */
export default () => (dispatch) => {
    dispatch({type: TYPE_MAPS_HIDEITEM});
}