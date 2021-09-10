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
      <h1 class="card__title">Inscrivez vous</h1>
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
          v-model="first_name"
          class="form-row__input"
          type="text"
          placeholder="Nom"
        />
        <input
          v-model="last_name"
          class="form-row__input"
          type="text"
          placeholder="Prénom"
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
          @click="createAccount()"
          class="button"
          :class="{ 'button--disabled': !emptyFields }"
        >
          <span>Créer mon compte</span>
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    };
  },
  computed: {
    emptyFields: function () {
      if (
        this.email != "" &&
        this.first_name != "" &&
        this.last_name != "" &&
        this.password != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    createAccount() {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          password: this.password
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