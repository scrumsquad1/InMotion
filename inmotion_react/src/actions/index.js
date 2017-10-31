import {combineActions} from '../_SpecRedux/index';

import action_Lists_FetchLists from './action_Lists_FetchLists'
import action_Locations_FetchLocations from './action_Locations_FetchLocations'
import action_Maps_HideItem from './action_Maps_HideItem'
import action_Maps_ShowItem from './action_Maps_ShowItem'
import action_Navigation_PathChange from './action_Navigation_PathChange';
import action_Navigation_Redirect from './action_Navigation_Redirect';
import action_Navigation_SetLoginVisible from './action_Navigation_SetLoginVisible';
import action_User_FetchUserData from './action_User_FetchUserData';
import action_User_SignIn from './action_User_SignIn';
import action_User_SignOut from './action_User_SignOut';
import action_User_SignUp from './action_User_SignUp';

export default combineActions([
    action_Lists_FetchLists,
    action_Locations_FetchLocations,
    action_Maps_ShowItem,
    action_Maps_HideItem,
    action_Navigation_PathChange,
    action_Navigation_Redirect,
    action_Navigation_SetLoginVisible,
    action_User_FetchUserData,
    action_User_SignIn,
    action_User_SignOut,
    action_User_SignUp
])