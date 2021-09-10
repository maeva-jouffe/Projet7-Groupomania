<template>
  <div class="card">
    <div class="card-body">
      <div class="form-row">
        <input
          v-model="texte"
          class="form-row__input"
          type="text"
          placeholder="Exprimez vous"
        />
      </div>
      <div class="form-row">
        <input type="file" ref="gif" @change="upload" class="form-row__input" />
        <button @click="submit" class="button">Publier</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const FormData = require('form-data');
const user = JSON.parse(localStorage.getItem("User"));
const id = user.userId;

export default {
  name: "createPublication",
  data() {
    return {
      texte: "",
      gif: "",
      userId: id,
    };
  },
  computed: {},
  methods: {
    upload() {
      this.gif = this.$refs.gif.files[0];
      console.log(this.gif);
    },
    submit() {
      const formData = new FormData();
      const user = JSON.parse(localStorage.getItem("User"));
      const token = user.token;
       formData.append("texte", this.texte);
      formData.append("gif", this.gif, this.gif.filename);
      formData.append("userId", this.userId);
     console.log(formData);

      axios
        .post(
          "http://localhost:3000/api/publications",formData,
         
          {
            headers: { Authorization: "Bearer" + " " + token ,
             'content-type': 'multipart/form-data' }
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>