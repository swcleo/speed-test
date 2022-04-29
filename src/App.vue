<script lang="ts">
import { defineComponent } from "vue";
import { getNetSpeed } from "./speed-test";
import imgUrl from "./assets/test.png";
import { getTTFB } from "web-vitals";

export default defineComponent({
  data() {
    return {
      speed: "",
      ttfb: "",
    };
  },

  methods: {
    test: async function () {
      const result = await getNetSpeed(imgUrl, 3);
      this.speed = result.toFixed(2).toString();

      var $vue = this;

      getTTFB((metric) => {
        const requestTime =
          metric.value - (metric.entries[0] as any).requestStart;
        $vue.ttfb = requestTime.toFixed(2).toString();
      });
    },
  },
});
</script>

<template>
  <div>
    <h1>Speed-Test</h1>

    <button @click="test">測速</button>

    <p v-if="speed">
      <div>網路測試：{{ speed }} KB/s</div>
      <div>TTFB：{{ ttfb }} ms</div>
    </p>
  </div>
</template>
