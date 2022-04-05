<template>
  <div class="text-h4 q-mb-md">Info</div>
  <q-input
    square
    outlined
    bottom-slots
    v-model="text"
    label="Vprašanje"
    :dense="dense"
  >
    <template v-slot:append>
      <q-icon
        v-if="text !== ''"
        name="close"
        @click="text = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" class="cursor-pointer" />
    </template>
  </q-input>
  <q-separator />
  <h5>ZAPIS</h5>
  <q-separator />
  <h5>FONETIČNI ZAPIS</h5>
  <q-separator />
  <h5>FONOLOŠKI OPISI</h5>
  <q-list>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="picture_as_pdf" />
      </q-item-section>
      <q-item-section>Povezava 1</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="picture_as_pdf" />
      </q-item-section>
      <q-item-section>Povezava 2</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="picture_as_pdf" />
      </q-item-section>
      <q-item-section>Povezava 3</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="picture_as_pdf" />
      </q-item-section>
      <q-item-section>Povezava 4</q-item-section>
    </q-item>
  </q-list>
  <q-separator />
  <h5>POVEZAVE</h5>
  <q-list>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="link" />
      </q-item-section>
      <q-item-section>Fran</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="link" />
      </q-item-section>
      <q-item-section>SSZJ</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="link" />
      </q-item-section>
      <q-item-section>Wiki</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="link" />
      </q-item-section>
      <q-item-section>SICRIS</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="link" />
      </q-item-section>
      <q-item-section>korpus</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="link" />
      </q-item-section>
      <q-item-section>FO</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="volume_up" />
      </q-item-section>
      <q-item-section>Posnetek</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="flip" />
      </q-item-section>
      <q-item-section>Listek</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="primary" name="link" />
      </q-item-section>
      <q-item-section>Fran</q-item-section>
    </q-item>
  </q-list>
  <q-separator />
</template>

<script>
import { ref } from "vue";
export default {
  name: "InfoTab",
  data() {
    return {
      text: ref(""),
      dense: ref(true)
    };
  },
};
</script>
