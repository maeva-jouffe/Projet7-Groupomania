<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="abonnes == 0">Aucune inscription pour le moment</p>
    <p v-else-if="abonnes == 1">Une personne s'est inscrite</p>
    <p v-else>Déjà {{abonnes}} personnes inscrites</p>
    <button v-on:click="subscribe()">S'abonner</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      abonnes : 0,
    }
  },
  methods: {
    subscribe: function() {
      this.abonnes++;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
