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
        <input type="text" v-model="appointment.cedula" required pattern="\d{10}" />
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
    };
  },
  methods: {
    handleFileUpload(event) {
      this.appointment.image = event.target.files[0];
    },
    async submitForm() {
      if (!this.appointment.image) {
        alert('Por favor, cargue una imagen.');
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

        if (!response.ok) throw new Error('Error al guardar la cita.');
        alert('Cita guardada exitosamente.');
      } catch (error) {
        console.error(error);
        alert('Error al guardar la cita.');
      }
    },
  },
};
</script>
