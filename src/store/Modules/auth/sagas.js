import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { username, password } = payload;
    const params = new URLSearchParams();
    params.append('username', `${username}`);
    params.append('password', `${password}`);

    const response = yield call(api.post, '/ava/student/login', params);
    if (response.data.content.success === true) {
      yield put(signInSuccess(response.data.content));
    } else {
      throw new Error('error');
    }
  } catch (error) {
    Alert.alert(
      'Falha na autentificação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure(error));
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
