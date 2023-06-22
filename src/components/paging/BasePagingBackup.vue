<template>
  <div class="page-number">
    <div @click="ReducePageNumber" class="btn">
      <button :disabled="isReduceActive">Trước</button>
    </div>

    <div class="pagination">
      <ul>
        <li v-if="showFirstEllipsis">
          <a href="" @click="goToPage(1)">1</a>
        </li>
        <li v-if="showSecondEllipsis">
          <span>...</span>
        </li>
        <li
          v-for="page in pagesToShow"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <a href="#" @click="goToPage(page)">{{ page }}</a>
        </li>
        <li v-if="showThirdEllipsis">
          <span>...</span>
        </li>
        <li v-if="pagesToShow[pagesToShow.length - 1] !== totalPages">
          <a href="#" @click="goToPage(totalPages)">{{ totalPages }}</a>
        </li>
      </ul>
    </div>

    <div @click="RaisePageNumber" class="btn">
      <button :disabled="isRaiseActive">Sau</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isReduceActive = ref(false);
const isRaiseActive = ref(false);
const currentPage = ref(1);
const numberOfPageToShow = 3;

const totalPages = 20;

const goToPage = (page) => {
  console.log(page);
  currentPage.value = page;
};
const ReducePageNumber = () => {};
const RaisePageNumber = () => {};

const pagesToShow = () => {
  let start;
  let end;
  if (totalPages < numberOfPageToShow) {
    start = 1;
    end = totalPages;
  }
  return [];
};
</script>

<style scoped>
.page-number {
  display: flex;
  gap: 10px;
}
.btn > button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #000;
}
.pagination ul {
  list-style: none;
  display: flex;
  gap: 10px;
}
.active a {
  border: 1px solid #999;
}
</style>
