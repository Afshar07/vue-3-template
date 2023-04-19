<template>
  <div className="main-chart mb15">
    <VueTradingView
        :options="options"
        :key="options.symbol"
    />
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view/src/vue-trading-view.vue";

export default {
  created() {
    this.options.symbol = 'BINANCE:BTCUSDT';
  },
  data() {
    return {
      options: {
        symbol: '',
        theme: 'dark',
        width: '100%',
        height: '100%',
        allow_symbol_change: true,
        hide_side_toolbar: false,
        details: false,
      },
    }
  },
  components: {
    VueTradingView,
  },
};
</script>
