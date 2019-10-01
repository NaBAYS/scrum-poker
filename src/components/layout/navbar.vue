<template>
  <v-app-bar app
      clipped-left
      color="primary"
      dark
      elevate-on-scroll
      hide-on-scroll>
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name: 'home'}" class="white--text">
          <span>Scrum</span>
          <span class="font-weight-light">Poker</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Not logged in -->
      <template v-if="loaded">
        <v-toolbar-items>
          <template v-if="!auth">
            <v-btn text to="register">Register</v-btn>
            <v-btn text to="login">Login</v-btn>
          </template>
          <template v-else>
            <v-btn text @click="logout">Logout</v-btn>
          </template>
        </v-toolbar-items>
      </template>
    </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState([
    'auth',
    'loaded'
  ]),
  methods: {
    ...mapActions([
      'toggleDrawer',
      'login'
    ]),
    logout: () => {
      firebase.auth().signOut().then(() => {
        this.$state.dispatch('login', false)
        this.$router.push('/')
      }).catch(error => {
        console.error('there was an error: ', error)
      })
    }
  }
}
</script>
