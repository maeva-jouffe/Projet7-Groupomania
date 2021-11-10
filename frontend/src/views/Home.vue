<template>
  <div>
    <div id="nav">
      <!-- Balises de liens spécifiques à Vue Routeur -->
      <router-link to="/auth/signup">Inscription |</router-link>
      <router-link to="/auth/login">Connexion</router-link>
      <!-- Le router-view va venir afficher le bon composant en fonction du Router-link -->
      <router-view />
    </div>
    <img src="../assets/logo.png" alt="Site logo" id="logo" />
    <h1>Bienvenue sur le réseau social interne de Groupomania</h1>
    <p>
      Si vous possédez déjà un compte, veuillez vous connecter. Sinon, créez-en
      un en quelques clics et retrouvez l'ensemble de vos collègues pour
      discuter et partager.<br/><br/>
      
      <router-link to="/about">Vous n'êtes pas encore convaincu?
      Alors venez vite consulter cette page.</router-link>
    
    </p>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: {
    Footer,
  },
};
</script>

<style scoped>
#logo {
  width: 90%;
  margin: 2rem 0rem 2rem 0rem;
  padding: 1rem 1rem 1rem 1rem;
  box-shadow: 4px 5px 11px #343a40;
  border-radius: 1rem;
}
#nav {
  display: block;
  font-size: 1.4rem;
  background-color: #343a40;
}
#nav a {
  color: white;
}
h1 {
  font-size: 1.9rem;
  font-weight: bold;
  color: #007bff;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  #nav {
    font-size: 2.8rem;
  }
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.9rem;
    padding: 1rem;
  }
}

@media screen and (min-width: 1440px) {
  #nav {
    font-size: 4.5rem;
  }
  h1 {
    font-size: 3.2rem;
  }
  p {
    font-size: 2.1rem;
    padding: 2rem;
  }
}
@media screen and (min-width: 2560px) {
  #logo {
    width: 50%;
    margin: 5rem 0rem 5rem 0rem;
    box-shadow: 20px 22px 26px #343a40;
  }
  h1 {
    font-size: 4.8rem;
  }
  p {
    font-size: 3.8rem;
    padding: 2rem;
  }
}
</style>