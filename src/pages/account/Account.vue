<template>
  <div class="container">
    <TheHeader />
    <TheSidebar />
    <AccountList />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";

import AccountList from "@/pages/account/AccountList.vue";

export default {
  components: { TheHeader, TheSidebar, AccountList },
};
</script>

<style></style>
