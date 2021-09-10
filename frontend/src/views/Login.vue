<template>
<div>
  <div id="nav">
    <router-link to="/auth/signup">Inscription</router-link> |
    <router-link to="/auth/login">Connexion</router-link> |
    <router-link to="/about">A propos</router-link>
     <router-view/>
  </div>
  <div class="card">
    <div class="card-body">
      <h1 class="card__title">Connectez vous</h1>
      <div class="form-row">
        <input
          v-model="email"
          class="form-row__input"
          type="text"
          placeholder="Adresse mail"
        />
      </div>
      <div class="form-row">
        <input
          v-model="password"
          class="form-row__input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="form-row">
        <button
          @click="login()"
          class="button"
          :class="{ 'button--disabled': !emptyFields }"
        >
          <span>Connexion</span>
        </button>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
import axios from 'axios';



export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    emptyFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          //On envoit l'utilisateur vers la page profil.
          this.$router.push({ path: "/auth/:id" }),        
          //On envoie le token et le userId dansle local Storage
          localStorage.setItem("User", JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>