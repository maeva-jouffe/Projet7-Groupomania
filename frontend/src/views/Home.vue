<template>
  <div>
    <div id="nav">
    <router-link to="/auth/signup">Inscription</router-link> |
    <router-link to="/auth/login">Connexion</router-link> |
    <router-link to="/about">A propos</router-link>
     <router-view/>
  </div>
    <img src="../assets/logo.png" alt="Site logo" id="logo" />
    <h1>Bienvenue sur le réseau social interne de Groupomania</h1>
  </div>
</template>

<style scoped>
#logo {
  width: 80%;
}
</style>