<template>
  <nav class="navbar navbar-expand bg-dark navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/publications" class="nav-link"
          ><i class="fas fa-home"></i
        ></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/publications" class="nav-link"
          ><i class="fas fa-bell"></i
        ></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/auth/:id" class="nav-link"
          ><i class="fas fa-user-circle"></i
        ></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/settings" class="nav-link"
          ><i class="fas fa-cogs"></i
        ></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
i{
    font-size:1.5rem;
    margin: 0rem 1rem 0rem 1rem;
}
</style>