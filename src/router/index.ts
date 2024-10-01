import { createRouter, createWebHistory } from "vue-router";
import userLoginStore from "@/stores/UserLoginStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/clients",
      name: "clients",
      component: () => import("@/views/ClientsPage.vue"),
    },
    {
      path: "/client/:client_id",
      name: "client",
      meta: {
        label: "Client",
      },
      component: () => import("@/components/clients/Client.vue"),
      children: [
        {
          path: "addresses",
          name: "address",
          meta: {
            label: "Client Addresses",
          },
          component: () => import("@/components/clients/list/ClientAddresses.vue"),
        },
        {
          path: "person",
          name: "person",
          meta: {
            label: "Client",
          },
          component: () => import("@/components/clients/forms/ClientPersonForm.vue"),
        },
        {
          path: "address/:id",
          name: "addressid",
          meta: {
            label: "Client Address",
          },
          component: () => import("@/components/clients/forms/AddressForm.vue"),
        },
        {
          path: "ccaccount/:id",
          name: "ccaccount",
          meta: {
            label: "Client CC Accounts",
          },
          component: () => import("@/components/clients/forms/CcAccountForm.vue"),
        },
        {
          path: "checking/:id",
          name: "checking",
          meta: {
            label: "Client Checking",
          },
          component: () => import("@/components/clients/forms/CheckingForm.vue"),
        },
        {
          path: "creditreport/:id",
          name: "creditreport",
          meta: {
            label: "Credit Report",
          },
          component: () => import("@/components/clients/forms/CreditReportForm.vue"),
        },
        {
          path: "loan/:id",
          name: "loan",
          meta: {
            label: "Client Loan",
          },
          component: () => import("@/components/clients/forms/LoanForm.vue"),
        },
        {
          path: "israelinfo/:id",
          name: "israelinfo",
          meta: {
            label: "Client Israel Ifo",
          },
          component: () => import("@/components/clients/forms/IsraelForm.vue"),
        },
        {
          path: "creditline/:id",
          name: "creditline",
          meta: {
            label: "Credit Line History",
          },
          component: () => import("@/components/clients/forms/CreditLineHistoryForm.vue"),
        },
      ],
    },
    {
      path: "/sysadmin",
      name: "sysadmin",
      component: () => import("@/components/admin/AdminHome.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/AdminView.vue"),
      children: [
        {
          path: "roles", // This will render at /user/profile
          name: "authroles",
          component: () => import("@/components/admin/AuthRoles.vue"),
        },
        {
          path: "users", // This will render at /user/profile
          name: "authusers",
          component: () => import("@/components/admin/AuthUsers.vue"),
        },
        {
          path: "settings", // This will render at /user/settings
          name: "admsettings",
          component: () => import("@/components/admin/AdmSettings.vue"),
        },
      ],
    },
    {
      path: "/network",
      name: "network-error",
      component: () => import("@/components/common/NetworkError.vue"),
    },
  ],
});

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = userLoginStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) return "/login";
});

export default router;
