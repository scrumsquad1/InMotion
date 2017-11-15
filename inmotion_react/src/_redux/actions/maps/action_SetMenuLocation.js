export const TYPE_MAPS_SETMENULOCATION = 'type_maps_setmenulocation';
export default ({lat, lng}) => (disptach) => {
    disptach({type: TYPE_MAPS_SETMENULOCATION, payload: {lat, lng}});
}