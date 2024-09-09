<template>
  <div>
    <h2>Registrar Nueva Cita</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" v-model="appointment.name" required />
      </div>
      <div>
        <label for="cedula">Cédula:</label>
        <input type="text" v-model="appointment.cedula" @input="validateCedula" required />
        <p v-if="cedulaError" class="error-message">{{ cedulaError }}</p>
      </div>
      <div>
        <label for="arrivalTime">Fecha y Hora:</label>
        <input type="datetime-local" v-model="appointment.arrivalTime" required />
      </div>
      <div>
        <label for="image">Imagen del Documento:</label>
        <input type="file" @change="handleFileUpload" />
      </div>
      <button type="submit">Guardar Cita</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointment: {
        name: '',
        cedula: '',
        arrivalTime: '',
        image: null,
      },
      cedulaError: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      this.appointment.image = event.target.files[0];
    },
    validateCedula() {
      const cedulaLength = this.appointment.cedula.length;
      if (cedulaLength < 6 || cedulaLength > 10) {
        this.cedulaError = 'La cédula debe tener entre 6 y 10 dígitos.';
      } else {
        this.cedulaError = '';
      }
    },
  
    async submitForm() {
    this.validateDate();

      if (!this.appointment.image) {
        alert('Por favor, cargue una imagen.');
        return;
      }
if (this.cedulaError) {
        alert(this.cedulaError);
        return;
      }
      const formData = new FormData();
      formData.append('name', this.appointment.name);
      formData.append('cedula', this.appointment.cedula);
      formData.append('arrivalTime', this.appointment.arrivalTime);
      formData.append('image', this.appointment.image);

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
        this.appointment.name = '';
        this.appointment.cedula = '';
        this.appointment.arrivalTime = '';
        this.appointment.image = null;
      catch (error) {
        console.error(error);
        alert('Error al guardar la cita.');
      }
    },
  },
};
</script>
