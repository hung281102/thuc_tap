<template>
  <div class="container">
    <TheHeader />
    <TheSidebar @sendValue="handleValue" />
    <TableEmployee :receivedValue="value" />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import BaseLoading from "@/components/loading/BaseLoading.vue";
import TableEmployee from "./TableEmployee.vue";

export default {
  name: "Employee",

  methods: {
    handleValue(value) {
      console.log(value);
      this.value = value;
      console.log(value);
    },
  },
  components: {
    TheHeader,
    TheSidebar,

    BaseLoading,
    TableEmployee,
  },
};
</script>

<style></style>
