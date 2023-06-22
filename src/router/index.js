import { createRouter, createWebHistory } from "vue-router";
import Employee from "../pages/employee/Employee.vue";
import Receipt from "../pages/receipt/Receipt.vue";
import Account from "../pages/account/Account.vue";
import PaymentList from "../pages/payment/PaymentList.vue";
import PaymentDetail from "../pages/payment/PaymentDetail.vue";

import Home from "../pages/home/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Trang chủ",
    },
  },
  {
    path: "/employees",
    name: "Employee",
    component: Employee,
    meta: {
      title: "Quản lý nhân viên",
    },
  },
  {
    path: "/CA/CAProcess",
    name: "Receipt",
    component: Receipt,
    meta: {
      title: "Tiền mặt",
    },
  },
  {
    path: "/CA/CAPaymentList",
    name: "PaymentList",
    component: PaymentList,
    meta: {
      title: "Chi tiền",
    },
  },
  {
    path: "/CA/CAPaymentDetail",
    name: "PaymentDetail",
    component: PaymentDetail,
    meta: {
      title: "Phiếu chi",
    },
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      title: "Hệ thống tài khoản",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
