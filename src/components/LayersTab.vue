<template>
  <div class="text-h4 q-mb-md">Sloji</div>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list>
      <q-expansion-item
        group="extra-layers"
        icon="layers"
        label="Dodatni sloji"
        default-opened
        header-class="text-primary"
      >
        <q-list>
          <q-item>
            <q-checkbox
              v-model="auxLayer_0"
              label="Narečne skupine"
              @click.prevent="this.toggleBaseLayer('a0')"
            />
          </q-item>
          <q-item>
            <q-checkbox
              v-model="auxLayer_1"
              label="Točke"
              @click.prevent="this.toggleBaseLayer('a1')"
            />
          </q-item>
        </q-list>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="base-layers"
        icon="map"
        label="Osnovni sloji"
        header-class="text-primary"
      >
        <q-list>
          <q-item>
            <q-checkbox
              id="b0"
              v-model="baseLayer_0"
              label="Podlaga"
              @click.prevent="this.toggleBaseLayer('b0')"
            />
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapMutations } from "vuex";

export default {
  name: "LayersTab",
  data() {
    return {
      auxLayer_0: ref(true),
      auxLayer_1: ref(true),
      baseLayer_0: ref(true),
    };
  },
  methods: {
    ...mapMutations(["toggleBaseLayer"])
  },
};
</script>