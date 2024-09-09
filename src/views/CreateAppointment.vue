<template>
  <div class="container">
    <h1>Crear Cita</h1>
    <form @submit.prevent="submitForm" class="appointment-form">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="arrivalTime">Fecha y Hora:</label>
        <input type="datetime-local" id="arrivalTime" v-model="arrivalTime" required />
      </div>
      <div class="form-group">
        <label for="cedula">Cédula:</label>
        <input type="text" id="cedula" v-model="cedula" required />
      </div>
      <div class="form-group">
        <label for="image">Imagen:</label>
        <input type="file" id="image" @change="handleFileUpload" />
      </div>
      <button type="submit" class="submit-btn">Guardar Cita</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      arrivalTime: '',
      cedula: '',
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('arrivalTime', this.arrivalTime);
      formData.append('cedula', this.cedula);
      if (this.file) {
        formData.append('image', this.file);
      }

      try {
        const response = await fetch('http://localhost:3000/save', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.message || 'Error al guardar la cita');
        }

        const responseData = await response.json(); 
        alert(responseData.message || 'Cita guardada correctamente');
        this.name = '';
        this.arrivalTime = '';
        this.cedula = '';
        this.file = null;
      } catch (error) {
        console.error(error);
        alert(error.message || 'Error al guardar la cita');
      }
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f0f0f0; /* Gris clarito */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.appointment-form {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="datetime-local"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>
