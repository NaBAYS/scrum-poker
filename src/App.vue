<template>
  <v-app>
    <!-- Nav bar -->
    <v-app-bar app
      clipped-left
      color="primary"
      dark
      elevate-on-scroll
      hide-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name: 'home'}" class="white--text">
          <span>Scrum</span>
          <span class="font-weight-light">Poker</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="register">Register</v-btn>
        <v-btn text>Login</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Navigation drawer -->
    <v-navigation-drawer app
      color="grey lighten-3"
      clipped
      floating
      hide-overlay
      :mobile-break-point="$vuetify.breakpoint.thresholds.sm"
      v-model="drawer">

      <v-system-bar></v-system-bar>
    </v-navigation-drawer>

    <v-content tag="main" class="grey lighten-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    //
  },
  data: () => ({
    drawer: true
  })
}
</script>
