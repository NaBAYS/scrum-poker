<template>
  <v-navigation-drawer app
      color="grey lighten-3"
      clipped
      floating
      hide-overlay
      :mobile-break-point="$vuetify.breakpoint.thresholds.sm"
      :value="this.$store.state.drawer">

      <v-system-bar></v-system-bar>
    </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    //
  })
}
</script>
