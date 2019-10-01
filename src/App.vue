<template>
  <v-app>
    <NavBar></NavBar>
    <NavDrawer></NavDrawer>

    <v-content tag="main" class="grey lighten-4">
      <v-alert
        dismissible
        tile
        transition="slide-y-transition"
        :type="alertType"
        v-model="alert">
        {{ alertMessage }}
      </v-alert>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import NavBar from './components/layout/navbar'
import NavDrawer from './components/layout/navdrawer'

export default {
  name: 'App',
  components: {
    NavBar,
    NavDrawer
  },
  computed: {
    alert: {
      get: function () {
        return this.$store.state.alert
      },
      set: function (val) {
        this.$store.dispatch('alert', val)
      }
    },
    ...mapState([
      'alertMessage',
      'alertType'
    ])
  }
}
</script>
