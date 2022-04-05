<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 100vx">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical>
          <q-tab name="Info" label="Info"/>
          <q-tab name="Legenda" label="Legenda" />
          <q-tab name="Sloji" label="Sloji" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="Info">
            <info-tab></info-tab>
          </q-tab-panel>
          <q-tab-panel name="Legenda">
            <legend-tab></legend-tab>
          </q-tab-panel>
          <q-tab-panel name="Sloji">
            <layers-tab></layers-tab>
          </q-tab-panel>
          
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from "vue";
import InfoTab from "./InfoTab";
import LegendTab from "./LegendTab";
import LayersTab from "./LayersTab";

export default {
  name: "LeftDrawer",
  components: {
    InfoTab,
    LegendTab,
    LayersTab,
  },

  data() {
    return {
      text: ref(""),
      ph: ref(""),
      dense: ref(false),
      tab: ref("Info"),
      splitterModel: ref(30),
    }
  }
};
</script>
