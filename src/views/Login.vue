<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Login to your account</h1>
        <Login></Login>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from '../components/forms/login'

export default {
  components: {
    Login
  }
}
</script>
