<template>
  <div class="home-container">
     <h1>🏥Asignacion de citas medicas🏥</h1>
    <nav>
      <ul>
        <li><button @click="showCreateCita" class="btn">Crear Cita</button></li>
        <li><button @click="showViewCitas" class="btn">Ver Citas</button></li>
      </ul>
    </nav>

    <!-- Componente de Crear Cita -->
    <div v-if="showCreate">
      <CrearCita />
    </div>

    <!-- Componente de Ver Citas -->
    <div v-if="showView">
      <VerCitas />
    </div>
  </div>
</template>

<script>
import CrearCita from './CreateAppointment.vue'; //
import VerCitas from './ViewAppointments.vue';   

export default {
  components: {
    CrearCita,
    VerCitas
  },
  data() {
    return {
      showCreate: false,  
      showView: false    
    };
  },
  methods: {
    showCreateCita() {
      this.showCreate = true;
      this.showView = false; 
    },
    showViewCitas() {
      this.showCreate = false;
      this.showView = true;  
    }
  }
};
</script>


<style scoped>
.container {
  max-width: 400px;
  text-align: center;
  padding: 20px;
  background: #e5e5e5; /* Fondo aplicado */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* Alineación centrada */
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
  border-radius: 5px;
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
