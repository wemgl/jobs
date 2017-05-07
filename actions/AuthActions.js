import {AsyncStorage} from 'react-native';
import {Facebook} from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

const FACEBOOK_LOGIN_FAIL_MSG = 'Facebook login was unsuccessful. Please try again.';

// How to use AsyncStorage (NOTE: It's actually asynchronously accessed):
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async (dispatch) => {
    try {
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            // Dispatch an action saying FB login is done
            dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: token
            });
        } else {
            // Start up FB login process
            doFacebookLogin(dispatch);
        }
    } catch (err) {
        dispatch({type: FACEBOOK_LOGIN_FAIL, payload: payload})
    }
};

const doFacebookLogin = async (dispatch) => {
    const permissions = ['public_profile'];
    try {
        let {token, type} = await Facebook.logInWithReadPermissionsAsync('815825948594487', {permissions});
        if (type === 'cancel') {
            return dispatch({type: FACEBOOK_LOGIN_FAIL, payload: FACEBOOK_LOGIN_FAIL_MSG})
        }
        await AsyncStorage.setItem('fb_token', token);
        dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token})
    } catch (err) {
        dispatch({type: FACEBOOK_LOGIN_FAIL, payload: FACEBOOK_LOGIN_FAIL_MSG})
    }
};