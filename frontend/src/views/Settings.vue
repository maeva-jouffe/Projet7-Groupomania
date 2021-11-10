<template>
<div>
    <Navbar />
 
    <button type="button" class="btn btn-outline-primary" @click="logout()">Déconnexion</button>
    <button type="button" class="btn btn-outline-primary">Supprimer mon compte</button>

    <Footer />
</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default{
    name: "Settings",
    components: {
    Navbar,Footer
  },
methods:{
    //Fonction de déconnexion
    logout() {
      this.$router.push({ path: "/" });
      localStorage.clear();
    },
}
}
</script>