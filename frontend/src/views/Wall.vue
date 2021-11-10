<template>
 <div>
    <Navbar />
      <h1>Hi {{ first_name }}{{ last_name }}</h1>
    <p>{{ secretMessage }}</p>
    </div>
    
</template>

<script>
import Navbar from "../components/Navbar.vue";
import AuthService from '../services/AuthService.js';
// Nous voulons protéger notre route / et la rendre accessible uniquement avec des données utilisateur valides.
// On vérifie si l'utilisateur est connecté. Sinon, il sera redirigé vers la page de connexion.


export default {
  name: "Wall",
  components: {
    Navbar,
  },
  data(){
      return{
    secretMessage: '',
      last_name: '',
      first_name:'',
      };
  },
  async created(){
      if(!this.$store.getters.isLoggedIn){
          this.$router.push('/auth/login');
      }
      this.first_name = this.$store.getters.getUser.first_name;
      this.last_name = this.$store.getters.getUser.last_name;
      this.secretMessage = await AuthService.getSecretContent();
  },
  methods:{
      logout(){
          this.$store.dispatch('logout');
          this.$router.push('/auth/login');
      }
  }
};
</script>