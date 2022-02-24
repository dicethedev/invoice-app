import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import InvoiceView from "../views/InvoiceView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
    {
      // This binded invoiceId is coming from the params in Invoice.vue that I pass inside the router link
    path: "/invoice/:invoiceId",
    name: "Invoice",
    component: InvoiceView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
