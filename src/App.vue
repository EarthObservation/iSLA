<template>
  <div id="App">
    <q-layout view="hHh LpR fFf">
      <q-header bordered class="bg-primary">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
          <q-toolbar-title> iSLA </q-toolbar-title>
          <div>
            <q-tabs v-model="tab" dense>
              <q-tab
                @click="toggleTabs"
                class="tab-width"
                name="newAnswer"
                icon="note_add"
                v-if="user.isAdmin"
              />
              <q-tab
                @click="toggleTabs"
                class="tab-width"
                name="reviewAnswers"
                icon="task"
                v-if="loggedIn"
              />
            </q-tabs>
          </div>
          <q-btn dense flat round icon="face" @click="toggleRightDrawer" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        side="left"
        overlay
        bordered
        :width="400"
        :breakpoint="150"
      >
        <left-drawer></left-drawer>
      </q-drawer>

      <q-drawer
        v-model="rightDrawerOpen"
        side="right"
        overlay
        bordered
        :width="325"
      >
        <right-drawer></right-drawer>
      </q-drawer>
      <q-page-container class="container">
        <q-slide-transition class="box stack-top">

          <div class="q-pa-md" v-if="tabs">
            <div class="q-gutter-y-md" style="max-width: 1000px">
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="newAnswer">
                  <new-answer></new-answer>
                </q-tab-panel>

                <q-tab-panel name="reviewAnswers">



                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>

        </q-slide-transition>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import LeftDrawer from "@/components/LeftDrawer";
import RightDrawer from "@/components/RightDrawer";
import NewAnswer from "@/components/NewAnswer";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    LeftDrawer,
    RightDrawer,
    NewAnswer
  },

  data() {
    return {
      leftDrawerOpen: ref(true),
      rightDrawerOpen: ref(false),
      tab: ref(null),
      tabs: ref(false),
      dense: ref(true),
    };
  },

  computed: {
    ...mapGetters(["user", "loggedIn"]),
  },

  watch: {
    tab() {
      this.tabs = true;
      this.changeTab(this.tab);
    },
  },

  methods: {
    ...mapMutations(["changeTab"]),

    toggleTabs() {
      this.tabs = !this.tabs;
    },

    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #102c48;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@font-face {
  font-family: Bahnschrift;
  src: url(./assets/fonts/merriweather-v28-latin-regular.woff);
}

.my-font {
  font-family: "merriweather-v28-latin-regular";
  color: #3f2c06;
}

.stack-top {
  z-index: 9;
}

.container {
  position: relative
}

.box {
  position: absolute;
  left: 53%;
  transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
}
</style>