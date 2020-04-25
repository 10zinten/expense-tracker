
import Vue from 'vue';

export function initCollection(state, collectionId) {
  Vue.set(state.collections, collectionId, { icon: {} });
}
