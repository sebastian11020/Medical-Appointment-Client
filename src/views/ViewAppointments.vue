<template>
    <div class="appointments-container">
      <h2>Ver Citas</h2>
      <form @submit.prevent="fetchCitas" class="search-form">
        <label for="startDate">Fecha de Inicio:</label>
        <input type="date" v-model="startDate" id="startDate" required />
  
        <label for="endDate">Fecha de Fin:</label>
        <input type="date" v-model="endDate" id="endDate" required />
  
        <button type="submit">Buscar Citas</button>
      </form>
  
      <div v-if="citas.length > 0" class="appointments-list">
        <h3>Citas encontradas:</h3>
        <ul>
          <li v-for="cita in citas" :key="cita.id" class="appointment-item">
            <p><strong>ID:</strong> {{ cita.id }}</p>
            <p><strong>Nombre:</strong> {{ cita.name }}</p>
            <p><strong>Fecha:</strong> {{ cita.arrivalTime }}</p>
            <p><strong>Estado:</strong> {{ cita.status }}</p>
            <img v-if="cita.imageUrl" :src="cita.imageUrl" alt="Imagen de la cita" class="appointment-image" />
            <button @click="cancelCita(cita.id)" v-if="cita.status === 'active'" class="cancel-button">Cancelar Cita</button>
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
        if (!this.startDate || !this.endDate) {
          alert('Por favor, ingrese ambas fechas.');
          return;
        }
  
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
      },
      async cancelCita(id) {
        try {
          const response = await fetch(`http://localhost:3000/cancel/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
          });
  
          if (!response.ok) {
            throw new Error('Error al cancelar la cita');
          }
  
          const result = await response.json();
          alert(result.message);
          
          // Actualiza la lista de citas
          await this.fetchCitas();
        } catch (error) {
          console.error(error);
          alert(error.message || 'Error al cancelar la cita');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .appointments-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .search-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .search-form label {
    font-weight: bold;
  }
  
  .search-form input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .search-form button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-form button:hover {
    background-color: #0056b3;
  }
  
  .appointments-list {
    margin-top: 20px;
  }
  
  .appointment-item {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }
  
  .appointment-item p {
    margin: 5px 0;
  }
  
  .appointment-image {
    max-width: 200px;
    max-height: 200px;
    display: block;
    margin-top: 10px;
  }
  
  .cancel-button {
    padding: 8px 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-button:hover {
    background-color: #c82333;
  }
  </style>
  