<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  //Permet d'identifier en tout remier lieu si on est authentifié ou non grace a initializeStore dans le store
  name: "App",
  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer" +" "+ token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
