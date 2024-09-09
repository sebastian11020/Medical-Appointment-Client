<template>
  <div class="home">
    <h1>Bienvenido a la Página de Inicio</h1>
    <nav>
      <ul>
        <li><router-link to="/create">Crear Cita</router-link></li>
        <li><router-link to="/view">Ver Citas</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomePage' // Asegúrate de que el nombre aquí sea 'HomePage'
};
</script>

<style scoped>
.home {
  text-align: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 10px;
}
</style>
