import firebase from 'firebase/app';
import 'firebase/database';

import { uid } from 'quasar';
import { firebaseAction } from 'vuexfire';
import { firebaseSetValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addCollection(context, collection) {
  firebaseSetValue(`collections/${uid()}`, collection, { successMessage: 'Collection added!' });
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

export const loadCollections = firebaseAction(
  ({ bindFirebaseRef, dispatch, commit }, collections) => {
    collections.forEach((collectionId) => {
      commit('initCollection', collectionId);

      // Faire un Promise.All -> then setCollectionsLoaded
      bindFirebaseRef(`collections.${collectionId}`, firebase.database().ref(`collections/${collectionId}`)).then(() => {
        dispatch('app/setCollectionsLoaded', true, { root: true });
      });
    });
  },
);
