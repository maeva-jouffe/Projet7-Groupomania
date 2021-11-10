<template>
  <footer>
    <div class="container-fluid bg-dark text-light">
      <div class="col">
        <ul>
          <li class>
            <a href="#" aria-label="Mentions légales">Mentions légales |</a>
          </li>
          <li class>
            <a href="#" aria-label="Protection des données"
              >Protection des données |</a
            >
          </li>
          <li class>
            <a href="#" aria-label="Conditions générales d'utilisation"
              >Conditions générales d'utilisation |</a
            >
          </li>
          <li class><a href="#" aria-label="Contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
li {
  list-style-type: none;
  margin: 0.5em 0.5em 0.5em 0.5em;
  font-size: 0.9rem;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
a {
  color: white;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  li {
    font-size: 1.5rem;
  }
}
@media screen and (min-width: 1440px) {
  li {
    font-size: 2rem;
  }
}
@media screen and (min-width: 2560px) {
  li {
    font-size: 3.2rem;
  }
}
</style>