<template>
  <q-item>
    <q-item-section avatar>
      <q-icon
        :name="user.icon.name"
        :color="user.icon.color"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ user.name }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        Paid {{ expenseSummary.paid | formatPrice }}
      </q-item-label>
      <q-item-label caption>
        Should have paid {{ expenseSummary.shouldHavePaid | formatPrice }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label>
        <q-badge :color="color">{{ toPay | abs | formatPrice }}</q-badge>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import mixinPrice from 'src/mixins/mixin-price';

export default {
  mixins: [mixinPrice],
  props: ['user', 'expenseSummary'],
  computed: {
    toPay() {
      return this.expenseSummary.shouldHavePaid - this.expenseSummary.paid;
    },
    color() {
      return this.toPay > 0 ? 'red' : 'green';
    },
  },
};
</script>
