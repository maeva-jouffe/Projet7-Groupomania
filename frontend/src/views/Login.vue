<template>
  <div>
    <div id="nav">
      <router-link to="/auth/signup">Inscription |</router-link>
      <router-link to="/auth/login"> Connexion</router-link>
      <router-view />
    </div>
<!-- <div v-if="this.$store.state.isAuthenticated"></div> -->
    <h1>Entrez vos identifiants de connexion</h1>

    <form @submit.prevent="login">
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
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          v-model="password"
          class="form-control"
          id="password"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <button @click="login()" type="submit" class="btn btn-primary">
        Me connecter
      </button>
    </form>

    <div id="inscription">
      <router-link to="/auth/signup"
        >Vous ne possédez pas encore de compte?</router-link
      >
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Footer from "../components/Footer.vue";

export default {
  name: "Login",
  components: { Footer },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      //Constante qui récupère le corps du formulaire
      const loginForm = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("auth/login", loginForm)
        .then((response) => {
          const token = response.data.token;
          console.log(token);
          this.$store.commit("setToken", token);
          axios.defaults.headers.common["Authorization"] = "Bearer" + " " + token;
          //On envoie le token et le userId dansle local Storage
          localStorage.setItem("User", JSON.stringify(response.data));
          //On envoit l'utilisateur vers la page profil.
          this.$router.push({ path: "/auth/:id" });
        })
        .catch((error) => {
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
  margin: 1.5rem;
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
#inscription {
  margin-bottom: 1.5rem;
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
  #inscription {
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
</style>