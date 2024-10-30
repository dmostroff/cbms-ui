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
          path: "ccaccounts",
          name: "cc_account",
          meta: {
            label: "Client Accounts",
          },
          component: () => import("@/components/clients/list/ClientCcAccounts.vue"),
        },
        {
          path: "checkings",
          name: "checking",
          meta: {
            label: "Client Checking",
          },
          component: () => import("@/components/clients/list/ClientCheckings.vue"),
        },
        {
          path: "israel",
          name: "client_israel",
          meta: {
            label: "Client Israel",
          },
          component: () => import("@/components/clients/list/ClientIsraels.vue"),
        },
        {
          path: "credit_line_history",
          name: "credit_line_history",
          meta: {
            label: "Client Line History",
          },
          component: () => import("@/components/clients/list/ClientCreditLineHistories.vue"),
        },
        {
          path: "credit_report",
          name: "credit_report",
          meta: {
            label: "Client Credit Report",
          },
          component: () => import("@/components/clients/list/ClientCreditReports.vue"),
        },
        {
          path: "loans",
          name: "loan",
          meta: {
            label: "Client Loans",
          },
          component: () => import("@/components/clients/list/ClientLoans.vue"),
        },
        {
          path: "credit_summary",
          name: "credit_summary",
          meta: {
            label: "Client Credit Summary",
          },
          component: () => import("@/components/clients/ClientCreditSummary.vue"),
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
          name: "checkingid",
          meta: {
            label: "Client Checking",
          },
          component: () => import("@/components/clients/forms/CheckingForm.vue"),
        },
        {
          path: "creditreport/:id",
          name: "creditreportid",
          meta: {
            label: "Credit Report",
          },
          component: () => import("@/components/clients/forms/CreditReportForm.vue"),
        },
        {
          path: "loan/:id",
          name: "loanid",
          meta: {
            label: "Client Loan",
          },
          component: () => import("@/components/clients/forms/LoanForm.vue"),
        },
        {
          path: "israelinfo/:id",
          name: "israelinfoid",
          meta: {
            label: "Client Israel Ifo",
          },
          component: () => import("@/components/clients/forms/IsraelForm.vue"),
        },
        {
          path: "creditline/:id",
          name: "creditlineid",
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
