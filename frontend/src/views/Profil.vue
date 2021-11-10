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
          <label for="photoDeProfil">Photo de profil</label>
          <img :src="photo" alt="photo de profil" class="modifyPhotoDeProfil" />
          <input
            type="file"
            @change="onChangePhoto"
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
      showModify: false,
    };
  },
  computed: {},
  methods: {
    onChangePhoto(event) {
      this.$emit("update:modelValue", event.target.files[0]);
    },
    modifyProfil() {
      this.currentUser = JSON.parse(localStorage.getItem("User"));
      const user = JSON.parse(localStorage.getItem("User"));
      const userId = user.userId;

      axios
        .put("http://localhost:3000/api/auth/" + userId, {
          first_name: this.currentUser.first_name,
          last_name: this.currentUser.last_name,
          bio: this.currentUser.bio,
          photo: this.currentUser.photo,
          email: this.currentUser.email,
          token: this.currentUser.token,
        })
        .then((response) => {
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
      .then((res) => {
        this.currentUser = JSON.parse(JSON.stringify(res.data.data[0]));
        console.log(this.currentUser);
        (this.email = this.currentUser.email),
          (this.first_name = this.currentUser.first_name),
          (this.last_name = this.currentUser.last_name),
          (this.photo = this.currentUser.photo),
          (this.bio = this.currentUser.bio);
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
.modifyPhotoDeProfil {
  border-radius: 100%;
  width: 8%;
}
h1 {
  color: #007bff;
}
</style>
