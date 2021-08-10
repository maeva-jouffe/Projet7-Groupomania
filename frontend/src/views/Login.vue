<template>
  <div class="hello">
       <img src="../assets/logo.png" alt="Site logo" id="logo">
<div class="card">
   <div class="card-body">
        <!-- h1 pour le mode login -->
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
        <!-- h1 pour le mode create -->
      <h1 class="card__title" v-else>Inscription</h1>
        <!-- Sous-titre pour le mode login et switch vers le mode create au clic-->
      <p class="card__subtitle" v-if="mode =='login'">Vous n'avez pas encore de compte? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
        <!-- Sous-titre pour le mode login et switch vers le mode login au clic -->
      <p class="card__subtitle" v-else>Vous avez déjà un compte? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
      <div class="form-row">
          <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail">
      </div>
        <!--On demande à l'utilisateur son nom et son prénom uniquement en mode create -->
      <div class="form-row" v-if="mode == 'create'">
          <input v-model="first_name" class="form-row__input" type="text" placeholder="Nom">
          <input v-model="last_name" class="form-row__input" type="text" placeholder="Prénom">
      </div>
      <div class="form-row">
          <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe">
      </div>
       <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
      <div class="form-row" v-if="mode == 'login' && status == 'error_login'">Adresse email et/ou mot de passe incorrect</div>
      <div class="form-row" v-if="mode == 'create' && status == 'error_create'">Adresse email déjà utilisée</div>
      <div class="form-row">
        <!-- Au clic on appelle la méthode login pour créer une connexion-->
   <button @click="login()" class="button" :class="{'button--disabled' : !emptyFields}" v-if="mode == 'login'">
     <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
        <!-- Au click on appelle la méthode createAccount pour créer une inscription-->
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !emptyFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
      </div>
        </div>
   </div>
</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    };
  },
  computed: {
    emptyFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.first_name != "" && this.last_name != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != ""){
          return true;
        } else {
          return false;
        }
      }  
    },
    ...mapState([status])
  },
  methods: {
    //On crée la méthode qui active le mode create
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    //On crée la méthode qui active le mode login
    switchToLogin: function () {
      this.mode = "login";
    },
    createAccount: function () {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
        })
        //On appelle la fonction login pour se connecter directement après l'inscription
        .then(function () {
          self.login();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
       login: function () {
         const self = this;
      this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        })
        //On bascule vers la page Profile
        .then(function () {
          self.$router.push('/auth/:id');
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo{
  width: 90%;
}
.card{
  border: 2px solid black;
  border-radius: 2em;
  margin: 2.5em;
  display: flex;
  justify-content: center;
}
button{
  width: 100%;
}
 .form-row {
    margin: 16px 0px;
    gap:16px;
 
  }
  .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#e7e2e2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }
  .form-row__input::placeholder {
    color:#999;
  }
</style>
