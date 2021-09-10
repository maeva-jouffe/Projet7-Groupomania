<template>
  <div>
    <div class="card">
      <h1 class="card__title">Mon profil</h1>
      <p class="card__subtitle">
        Bienvenue {{ last_name }} {{ first_name }} 
      </p>
      <div class="form-row"></div>
    </div>
    <div id="nav">
      <button @click="modify()" class="button">Modifier mon profil</button> |
      <button class="button">Notifications</button> |  
      <button @click="logout()" class="button">Déconnexion</button>
      <router-view />
    </div>
    
     <div class="form-row">
     
        <input
          v-model="email"
          class="form-row__input"
          type="email"
          placeholder="{{email}}"
        />
      </div>
   <div class="form-row">
     
        <input
          v-model="password"
          class="form-row__input"
          type="password"
          placeholder="{{password}}"
        />
      </div>
          
     <div class="form-row">
     
        <input
          v-model="email"
          class="form-row__input"
          type="email"
          placeholder="{{email}}"
        />
      </div>
   <div class="form-row">
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
</template>

<script>
const axios = require("axios").default;
export default {
  name: "Profil",
  data() {
    return {
      email: "",
      password: "",
      last_name: "",
      first_name: "",
      isAdmin: "",
    };
  },
  computed: {},
  methods: {
    UserProfil() {
      const user = JSON.parse(localStorage.getItem("User"));
      const token = user.token;
      const userId = user.userId;
      axios
        .get("http://localhost:3000/api/auth/" + userId, {
          headers: { Authorization: "Bearer" + " " + token },
        })
        .then((res) => {
          this.currentUser = JSON.parse(JSON.stringify(res.data.data[0]));
          (this.email = this.currentUser.email),
            (this.first_name = this.currentUser.first_name),
            (this.last_name = this.currentUser.last_name)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //Fonction de déconnexion
    logout() {
      this.$router.push({ path: "/" });
      localStorage.clear();
    },
    mounted: function () {
      this.userConnected = JSON.parse(localStorage.getItem("User"));
      this.UserProfil();
    },
  },
  beforeMount() {
    this.UserProfil();
  },
  //Modification du profil
  modify() {
   
  }
};
</script>