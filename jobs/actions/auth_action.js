import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

import {
  FB_APP_ID
} from '../keys';

// How to use AsyncStorage
// AsyncStorage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token')

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // Dispatch an action that FB login is completed
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB Login process
    doFacebookLogin(dispatch);
  }

  token = undefined;
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
    permissions: ['public_profile']
  });

  if (type === 'success') {
     await AsyncStorage.setItem('fb_token', token);
     dispatch({ type: FACEBOOK_LOGIN_SUCCESS });
  } else {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  type = undefined;
  token = undefined;
};
