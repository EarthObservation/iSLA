<template>
  <div>
    <q-list bordered>
      <q-item v-if="user.userName">
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.userName[0] }}
          </q-avatar>
        </q-item-section>

        <q-item-section style="text-align: left">
          {{ user.userName }}
        </q-item-section>
      </q-item>
      <q-separator v-if="loggedIn"/>

      <q-expansion-item
        clickable
        icon="login"
        label="Prijava"
        style="text-align: left"
        v-if="!loggedIn"
      >
        <Login></Login>
      </q-expansion-item>
      <q-separator v-if="!loggedIn"/>

      <q-expansion-item
        clickable
        icon="person_add"
        label="Vpis"
        style="text-align: left"
        v-if="!loggedIn"
      >
        <Register></Register>
      </q-expansion-item>
      <q-separator v-if="!loggedIn"/>

      <q-expansion-item
        clickable
        icon="lock_open"
        label="Pozabljeno geslo"
        style="text-align: left"
        v-if="!loggedIn"
      >
        <RequestResetPass></RequestResetPass>
      </q-expansion-item>
      <q-separator v-if="!loggedIn"/>

      <q-expansion-item
        clickable
        icon="manage_accounts_icon"
        label="Nastavitve"
        style="text-align: left"
        v-if="loggedIn"
      >
        <AccountSettings></AccountSettings>
      </q-expansion-item>
      <q-separator v-if="loggedIn"/>
      <q-item clickable v-ripple @click="logout()" v-if="loggedIn">
        <q-item-section avatar>
          <q-icon color="primary" name="logout" />
        </q-item-section>
        <q-item-section style="text-align: left" @click="logout()">Odjava</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from "vue";
import Login from "@/components/Login";
import Register from "@/components/Register";
import RequestResetPass from "@/components/RequestResetPass";
import AccountSettings from "@/components/AccountSettings";
import { mapActions, mapGetters } from "vuex"

export default {
  name: "RightDrawer",
  components: {
    Login,
    Register,
    RequestResetPass,
    AccountSettings,
  },

  data() {
    return {
      dense: ref(true),
      //loggedIn: ref(true),
    };
  },
  computed: {
    ...mapGetters(["user", "loggedIn"]),
  },

  methods: {
    ...mapActions(["logout"]),
  },
};
</script>