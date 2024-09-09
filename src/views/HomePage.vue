<template>
  <div class="container">
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
  name: 'HomePage'
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

nav ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
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
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
