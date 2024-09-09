<template>
    <div>
      <h2>Lista de Citas</h2>
      <form @submit.prevent="fetchAppointments">
        <div>
          <label for="startDate">Fecha Inicio:</label>
          <input type="date" v-model="startDate" required />
        </div>
        <div>
          <label for="endDate">Fecha Fin:</label>
          <input type="date" v-model="endDate" required />
        </div>
        <button type="submit">Buscar Citas</button>
      </form>
      <ul>
        <li v-for="appointment in appointments" :key="appointment.id">
          <p>{{ appointment.name }} - {{ appointment.cedula }} - {{ appointment.arrivalTime }}</p>
          <p>Estado: {{ appointment.status }}</p>
          <img v-if="appointment.imageUrl" :src="appointment.imageUrl" alt="Imagen de Documento" />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        startDate: '',
        endDate: '',
        appointments: [],
      };
    },
    methods: {
      async fetchAppointments() {
        try {
          const response = await fetch(
            `http://localhost:3000/citas?startDate=${this.startDate}&endDate=${this.endDate}`
          );
          if (!response.ok) throw new Error('Error al obtener las citas.');
          this.appointments = await response.json();
        } catch (error) {
          console.error(error);
          alert('Error al obtener las citas.');
        }
      },
    },
  };
  </script>
  