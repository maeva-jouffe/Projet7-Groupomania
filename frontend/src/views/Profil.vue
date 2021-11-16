<template>
  <div>
    <Navbar />
    <div>
      <h1>{{ last_name }} {{ first_name }}</h1>
      <img :src="photo" alt="photo de profil" id="photoDeProfil" />
    </div>

    <button @click="showModify = !showModify" class="btn btn-primary btn-block">
      <i class="fas fa-pencil-alt"></i> Modifier mon profil
    </button>

    <div v-show="showModify">
      <form @submit.prevent>
        <div class="form-group">
          <label for="photoDeProfil">Photo de profil</label><br/>
          <img :src="photo" alt="photo de profil" class="modifyPhotoDeProfil" id="avatar"/>
          <input
            type="file"
            @change="setFile"
            ref="photo"
            name="photo"
            class="form-control"
            id="photo"
            aria-label="photo de profil"
          />
        </div>

        <div class="form-group">
          <label for="last_name">Prénom</label>

          <input
            v-model="last_name"
            class="form-control"
            id="last_name"
            type="text"
            aria-label="prénom"
          />
        </div>

        <div class="form-group">
          <label for="first_name">Nom</label>

          <input
            v-model="first_name"
            class="form-control"
            id="first_name"
            type="text"
            aria-label="Nom"
          />
        </div>

        <div class="form-group">
          <label for="bio">Bio</label>
          <input
            v-model="bio"
            class="form-control"
            id="bio"
            type="text"
            aria-label="Bio"
          />
        </div>
        <button
          @click="modifyProfil()"
          @submit.prevent
          type="submit"
          class="btn btn-primary"
        >
          Enregistrer mes modifications
        </button>

      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
const FormData= require ('form-data');
const axios = require("axios").default;

export default {
  name: "Profil",
  components: {
    Navbar,
  },
  data() {
    return {
      email: "",
      password: "",
      last_name: "",
      first_name: "",
      photo: "",
      isAdmin: "",
      bio: "",
      id:"",
      showModify: false,
    };
  },
  methods: {
    setFile(event) {
      this.photo = event.target.files[0];
    },
    modifyProfil() {
      const form = new FormData();

      form.append("first_name", this.first_name);
      form.append("last_name", this.last_name);
      form.append("bio", this.bio);
      form.append("photo", this.photo);

      
      const user = JSON.parse(localStorage.getItem("User"));
      const userId = user.userId;
      const token = user.token;

      axios
        .put("auth/" + userId,
        form, {
          
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer" + " " + token,
          },
        })
        .then((response) => {
          location.reload();
          console.log(response);

        })
        .catch(function (error) {
          console.log(error);
        
        });
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("User"));
    const token = user.token;
    const userId = user.userId;
    axios
      .get("http://localhost:3000/api/auth/" + userId, {
        headers: { Authorization: "Bearer" + " " + token },
      })
      .then((response) => {
        const currentUser = JSON.parse(JSON.stringify(response.data.data[0]));
        (this.email = currentUser.email),
          (this.first_name = currentUser.first_name),
          (this.last_name = currentUser.last_name),
          (this.photo = currentUser.photo),
          (this.bio = currentUser.bio);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style scoped>
#photoDeProfil {
  border-radius: 100%;
  width: 40%;
  box-shadow: 3px 2px 8px #343a40;
  margin-bottom: 2rem;
}
#avatar{
  width: 10%;
margin-bottom: 1em;
}
.modifyPhotoDeProfil {
  border-radius: 100%;
  width: 8%;
}
h1 {
  color: #007bff;
}
label{
  font-size:1.5rem;
}
</style>
