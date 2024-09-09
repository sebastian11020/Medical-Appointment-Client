import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue'; 
import CreateAppointment from '../views/CreateAppointment.vue';
import ViewAppointments from '../views/ViewAppointments.vue';

const routes = [
  { path: '/', component: HomePage }, 
  { path: '/create', component: CreateAppointment },
  { path: '/view', component: ViewAppointments }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
