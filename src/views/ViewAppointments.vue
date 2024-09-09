<template>
    <div class="view-appointments">
      <h1>Ver Citas</h1>
      <div v-if="appointments.length === 0" class="no-appointments">
        <p>No hay citas programadas.</p>
      </div>
      <ul v-else class="appointments-list">
        <li v-for="appointment in appointments" :key="appointment.id" class="appointment-item">
          <div class="appointment-details">
            <p><strong>Nombre:</strong> {{ appointment.name }}</p>
            <p><strong>Fecha y Hora:</strong> {{ appointment.arrivalTime }}</p>
            <p><strong>Cédula:</strong> {{ appointment.cedula }}</p>
            <p><strong>Estado:</strong> {{ appointment.status }}</p>
            <img v-if="appointment.image" :src="appointment.imageUrl" alt="Imagen de la cita" class="appointment-image"/>
          </div>
          <button v-if="appointment.status === 'active'" @click="cancelAppointment(appointment.id)" class="cancel-btn">
            Cancelar
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ViewAppointments',
    data() {
      return {
        appointments: []
      };
    },
    async created() {
      try {
        const response = await fetch('http://localhost:3000/citas?startDate=2024-09-01T00:00:00Z&endDate=2024-09-30T23:59:59Z');
        this.appointments = await response.json();
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    },
    methods: {
      async cancelAppointment(id) {
        try {
          const response = await fetch(`http://localhost:3000/cancel/${id}`, {
            method: 'PATCH'
          });
          const result = await response.json();
          alert(result.message);
          // Actualiza la lista de citas después de cancelar
          this.appointments = this.appointments.map(appointment =>
            appointment.id === id ? { ...appointment, status: 'cancelled' } : appointment
          );
        } catch (error) {
          console.error('Error al cancelar la cita:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .view-appointments {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .appointments-list {
    list-style-type: none;
    padding: 0;
  }
  
  .appointment-item {
    background-color: #fff;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .appointment-details {
    margin-bottom: 10px;
  }
  
  .appointment-image {
    max-width: 100px;
    border-radius: 4px;
  }
  
  .cancel-btn {
    padding: 10px 20px;
    border: none;
    background-color: #dc3545;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-btn:hover {
    background-color: #c82333;
  }
  
  .no-appointments {
    text-align: center;
    color: #666;
  }
  </style>
  