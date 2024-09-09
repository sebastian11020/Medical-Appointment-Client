<template>
  <div class="create-appointment">
    <h1>Crear Cita</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div class="form-group">
        <label for="arrivalTime">Fecha y Hora:</label>
        <input type="datetime-local" v-model="arrivalTime" id="arrivalTime" required />
      </div>
      <div class="form-group">
        <label for="cedula">Cédula:</label>
        <input type="text" v-model="cedula" id="cedula" required />
      </div>
      <button type="submit" class="submit-btn">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateAppointment',
  data() {
    return {
      name: '',
      arrivalTime: '',
      cedula: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            arrivalTime: this.arrivalTime,
            cedula: this.cedula
          })
        });
        const result = await response.text();
        alert(result);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }
  }
};
</script>

<style scoped>
.create-appointment {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h1 {
  text-align: center;
  color: #333;
  background-color: #add8e6; 
  padding: 15px;
  border-radius: 8px; 
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"], input[type="datetime-local"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
