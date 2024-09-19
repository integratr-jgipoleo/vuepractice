import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Table from '../components/Table.vue';
import ProductCardComponent from '../components/ProductCardComponent.vue'
import Categoriescardcomponent from '../components/Categoriescardcomponent.vue';
const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/ProductCardComponent',
    name: 'ProductCardComponent',
    component: ProductCardComponent
  },
  {
    path: '/Categoriescardcomponent',
    name: 'Categoriescardcomponent',
    component: Categoriescardcomponent
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
