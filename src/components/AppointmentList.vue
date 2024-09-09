<template>
  <div>
    <h2>Ver Citas</h2>
    <form @submit.prevent="fetchCitas">
      <label for="startDate">Fecha de Inicio:</label>
      <input type="date" v-model="startDate" id="startDate" required />

      <label for="endDate">Fecha de Fin:</label>
      <input type="date" v-model="endDate" id="endDate" required />

      <button type="submit">Buscar Citas</button>
    </form>

    <div v-if="citas.length > 0">
      <h3>Citas encontradas:</h3>
      <ul>
        <li v-for="cita in citas" :key="cita.id">
          <p>ID: {{ cita.id }}</p>
          <p>Nombre: {{ cita.name }}</p>
          <p>Fecha: {{ cita.arrivalTime }}</p>
          <img v-if="cita.imageUrl" :src="cita.imageUrl" alt="Imagen de la cita" />
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No hay citas para el rango de fechas seleccionado.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      citas: []
    };
  },
  methods: {
    async fetchCitas() {
      try {
        const response = await fetch(`http://localhost:3000/citas?startDate=${this.startDate}&endDate=${this.endDate}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener las citas');
        }
        
        const citas = await response.json();
        this.citas = citas;
      } catch (error) {
        console.error(error);
        alert(error.message || 'Error al obtener las citas');
      }
    }
  }
};
</script>

<style scoped>
/* Agrega aquí los estilos CSS para el componente */
</style>
