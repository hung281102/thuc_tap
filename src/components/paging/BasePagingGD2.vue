<template>
  <BaseComboBoxNormal
    :comboboxData="resource.RECORD_PER_PAGE"
    width="w-50"
    :isRequired="false"
    direction="top"
    v-model="recordPerPageId"
    style="margin-bottom: 5px"
  ></BaseComboBoxNormal>
  <BasePaging
    :totalRecord="totalRecord"
    :totalPage="totalPageNumber"
    v-model="currentPage"
  >
  </BasePaging>
</template>

<script setup>
import BasePaging from "@/components/paging/BasePaging.vue";
import BasePagingBackup from "@/components/paging/BasePagingBackup.vue";

import BaseComboBoxNormal from "@/components/combo-box/BaseComboBoxNormal.vue";
import resource from "@/helpers/resource";
import { onBeforeUpdate, onMounted, onUpdated, ref, watch } from "vue";

const emit = defineEmits(["changeRecordingPerPage", "changePageNumber"]);
const props = defineProps(["totalRecord", "currentPage"]);
// mặc định là 10 bản ghi
const recordPerPageId = ref(4);
const recordPerPage = ref(0);
const totalPageNumber = ref(0);
const currentPage = ref(1);

onMounted(() => {
  console.log("Đây là paging");
  console.log(recordPerPage.value);
  console.log(props.totalRecord);
  recordPerPage.value = resource.RECORD_PER_PAGE[recordPerPageId.value].value;
  totalPageNumber.value = Math.ceil(props.totalRecord / recordPerPage.value);
  console.log(totalPageNumber.value);
});

onBeforeUpdate(() => {});

// Khi thay đổi số bản ghi trên trang thì số trang thay đổi theo
watch(
  () => recordPerPageId.value,
  (newValue) => {
    totalPageNumber.value = Math.ceil(
      props.totalRecord / resource.RECORD_PER_PAGE[newValue].value
    );

    console.log(totalPageNumber.value);

    emit("changeRecordingPerPage", resource.RECORD_PER_PAGE[newValue].value);
  },
  { deep: true }
);

watch(
  () => currentPage.value,
  (newValue) => {
    // emit đi sự kiện thay đổi số trang
    emit("changePageNumber", newValue);
  },
  { deep: true }
);
</script>

<style></style>
