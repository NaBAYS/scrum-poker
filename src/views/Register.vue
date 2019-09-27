<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Register for an account</h1>
        <Register></Register>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from '../components/forms/register'

export default {
  components: {
    Register
  }
}
</script>
