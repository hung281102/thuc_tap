<template>
  <div class="container">
    <TheHeader />
    <TheSidebar :isActive="true" />
    <PaymentListContainer />
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import PaymentListContainer from "./PaymentListContainer.vue";
import { ref } from "vue";

// export default {
//   components: { TheHeader, TheSidebar, PaymentListContainer, PaymentDetail },
// };

const isShowDetail = ref(true);
</script>

<style>
.payment_detail {
  width: 100vw;
  height: 100vh;
}
</style>
