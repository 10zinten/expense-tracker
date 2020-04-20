import firebase from 'firebase/app';
import 'firebase/database';

import { firebaseAction } from 'vuexfire';
import { firebaseAddValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addCollection(context, collection) {
  firebaseAddValue('collections', collection, { successMessage: 'Collection added!' });
}

export function updateCollection(context, payload) {
  firebaseUpdateValue(`collections/${payload.id}`, payload.updates, { successMessage: 'Collection updated!' });
}

export function deleteCollection(context, id) {
  firebaseRemoveValue(`collections/${id}`, { successMessage: 'Collection deleted!' });
}

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('collections', firebase.database().ref('collections')).then(() => {
    dispatch('app/setCollectionsLoaded', true, { root: true });
  }),
);
