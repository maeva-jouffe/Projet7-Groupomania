
<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
<p>{{user.last_name}} {{user.first_name}} {{user.email}}</p>
    <div class="form-row">
      <button class="button">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  mounted: function() {
console.log(this.$store.state.user);
if (this.$store.state.user.userId == -1) {
this.$router.push('/');
return;
}
this.$store.dispatch('getOneUser');
},
computed: {
  ...mapState({user:'userInfos'})
}

}
</script>


<style scoped>
</style>>