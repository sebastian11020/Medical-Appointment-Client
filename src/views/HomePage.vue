<template>
  <div class="home">
    <h1>Bienvenido a la Página de Inicio</h1>
    <nav>
      <ul>
        <li><router-link to="/create" class="btn">Crear Cita</router-link></li>
        <li><router-link to="/view" class="btn">Ver Citas</router-link></li>
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

h1 {
  background-color: #add8e6; /* Azul claro */
  padding: 15px;
  border-radius: 8px; /* Bordes redondeados para un toque moderno */
  display: inline-block; /* Ajustar el tamaño del fondo al contenido */
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 10px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* Azul para el botón */
  color: white;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3; /* Azul oscuro cuando se pasa el ratón */
}
</style>
