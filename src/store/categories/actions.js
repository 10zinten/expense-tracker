import firebase from 'firebase/app';
import 'firebase/database';

import { firebaseAction } from 'vuexfire';
import { firebaseAddValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addCategory(context, category) {
  firebaseAddValue('categories', category, { successMessage: 'Category added!' });
}

export function updateCategory(context, payload) {
  firebaseUpdateValue(`categories/${payload.id}`, payload.updates, { successMessage: 'Category updated!' });
}
export function deleteCategory(context, id) {
  firebaseRemoveValue(`categories/${id}`, { successMessage: 'Category deleted!' });
}

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('categories', firebase.database().ref('categories')).then(() => {
    dispatch('app/setCategoriesLoaded', true, { root: true });
  }),
);
