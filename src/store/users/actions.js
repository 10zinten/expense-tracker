import firebase from 'firebase/app';
import 'firebase/database';

import { firebaseAction } from 'vuexfire';
import { firebaseAddValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addUser(context, user) {
  firebaseAddValue('users', user, { successMessage: 'User added!' });
}

export function updateUser(context, payload) {
  firebaseUpdateValue(`users/${payload.id}`, payload.updates, { successMessage: 'User updated!' });
}

export function deleteUser(context, id) {
  firebaseRemoveValue(`users/${id}`, { successMessage: 'User deleted!' });
}

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('users', firebase.database().ref('users')).then(() => {
    dispatch('app/setUsersLoaded', true, { root: true });
  }),
);
