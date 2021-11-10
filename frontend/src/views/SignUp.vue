<template>
  <div>
    <div id="nav">
      <router-link to="/auth/signup">Inscription |</router-link>
      <router-link to="/auth/login"> Connexion</router-link>
      <router-view />
    </div>

    <h1>Inscrivez vous en quelques clics et rejoignez notre communauté</h1>

    <form @submit.prevent="createAccount">
      <div class="form-group">
        <label for="email">Adresse Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="Email"
          aria-label="adresse email"
          placeholder="Entrez votre email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Nous ne partagerons jamais votre e-mail.</small
        >
      </div>

      <div class="form-group">
        <label for="first_name">Nom de famille</label>
        <input
          v-model="first_name"
          class="form-control"
          id="first_name"
          type="text"
          placeholder="Nom de famille"
        />
      </div>
      <div class="form-group">
        <label for="last_name">Prénom</label>
        <input
          v-model="last_name"
          class="form-control"
          id="last_name"
          type="text"
          placeholder="Prénom"
        />
      </div>
      <div class="form-group">
        <label for="password">Choisissez un mot de passe</label>
        <input
          v-model="password"
          class="form-control"
          id="password"
          type="password"
          placeholder="Mot de passe"
        />
      </div>

      <button type="submit" class="btn btn-primary">Créer mon compte</button>
    </form>

    <div id="connexion">
      <router-link to="/auth/login">Vous possédez déjà un compte?</router-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Footer from "../components/Footer.vue";

export default {
  name: "Signup",
  components: { Footer },
  data() {
    return {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    };
  },
  methods: {
    createAccount() {
      //Constante qui récupère le corps du formulaire
      const signupForm = {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
      };
      axios
        .post("http://localhost:3000/api/auth/signup", signupForm)
        .then((response) => {
          //On envoit l'utilisateur vers la page profil.
          this.$router.push({ path: "/auth/:id" });
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
#nav {
  display: block;
  font-size: 1.4rem;
  background-color: #343a40;
}
#nav a {
  color: white;
}
h1 {
  font-size: 1.8rem;
  margin: 1rem;
  color: #007bff;
}
form {
  border: 1px solid #343a40;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #343a40;
}
label {
  color: white;
}
#connexion {
  margin-bottom: 2rem;
  font-size: 1.5rem;
}
button {
  margin-top: 1rem;
}
@media screen and (min-width: 768px) {
  #nav {
    font-size: 2.8rem;
  }
  h1 {
    font-size: 3rem;
  }
  #connexion {
    font-size: 1.9rem;
    padding: 1rem;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    justify-content: center;
    margin: auto;
  }
  input {
    width: 18rem;
    margin: 0rem 0.5rem 0rem 0.5rem;
  }
  label {
    font-size: 1.5rem;
  }
  #emailHelp {
    font-size: 1rem;
  }
  button {
    font-size: 1.5rem;
  }
  ::placeholder {
    font-size: 1.1rem;
  }
}
@media screen and (min-width: 1024px) {
  #nav {
    font-size: 3.5rem;
  }
  #connexion {
    font-size: 2.5rem;
  }
  form {
    width: 90%;
  }
  input {
    width: 26rem;
    height: 4rem;
  }
  label {
    font-size: 2.2rem;
  }
  #emailHelp {
    font-size: 1.4rem;
  }
  button {
    font-size: 2.5rem;
  }
  ::placeholder {
    font-size: 1.5rem;
  }
}
@media screen and (min-width: 1440px) {
  #nav {
    font-size: 4.5rem;
  }
  h1 {
    font-size: 3.2rem;
    margin: 3rem;
  }
  #connexion {
    font-size: 3rem;
  }
  form {
    width: 80%;
  }
  input {
    width: 32rem;
    height: 4.5rem;
    margin: 0rem 1.4rem 1rem 1.4rem;
  }
  label {
    font-size: 2.4rem;
  }
  #emailHelp {
    font-size: 1.7rem;
  }
  button {
    font-size: 2.7rem;
    margin-bottom: 1.7rem;
  }
  ::placeholder {
    font-size: 1.8rem;
  }
}
@media screen and (min-width: 2560px) {
  h1 {
    font-size: 4.2rem;
    margin: auto;
    padding: 8rem;
    display: flex;
    width: 45%;
  }
  #connexion {
    font-size: 4.5rem;
  }
  form {
    width: 40%;
    flex-direction: column;
    align-items: center;
    padding: 5rem;
  }
  input {
    width: 50rem;
    height: 6rem;
  }
  label {
    font-size: 3rem;
  }
  #emailHelp {
    font-size: 2.2rem;
  }
  button {
    font-size: 3.7rem;
  }
  ::placeholder {
    font-size: 2.5rem;
  }
}
</style>