<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/about">a propos</router-link>
    <router-link :to="{ name: 'Product', params: { name: 'skate' } }"
      >Produit 1</router-link
    >
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
   padding: 0;
}

a {
  text-decoration: none;
  color: #999;
}
.card {
  border: 2px solid black;
  border-radius: 2em;
  margin: 2.5em;
  display: flex;
  justify-content: center;
}
.router-link-active {
  font-weight: bold;
}
.card__action:hover {
  cursor: pointer;
}
.button {
  background: #2196f3;
  color: white;
  border-radius: 1em;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 90%;
  padding: 16px;
  transition: 0.4s background-color;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
</style>
