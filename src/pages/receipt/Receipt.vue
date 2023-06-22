<template>
  <div class="container">
    <TheHeader />
    <TheSidebar />
    <ReceiptContainer />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import ReceiptContainer from "./ReceiptContainer.vue";
import AccountList from "@/pages/account/AccountList.vue";

export default {
  components: { TheHeader, TheSidebar, ReceiptContainer, AccountList },
};
</script>

<style></style>
