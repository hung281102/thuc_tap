<template>
  <button :class="type" :ref="ref">{{ title }}</button>
</template>

<script>
export default {
  props: ["title", "type", "disabled", "ref"],
};
</script>

<style scoped>
.btn {
  height: 28px;
  font-size: 14px;
  font-weight: 500;
  font-family: M-roboto;
  border: none;
  border-radius: 2px;

  cursor: pointer;
  padding: 0 16px;
}
.m-btn {
  background-color: #50b83c;
  color: #fff;
}
.m-btn:hover {
  background-color: #57c841;
  cursor: pointer;
}
.m-btn.del {
  background-color: #e81e1e;
}
.m-btn.del:hover {
  background-color: #9f3333;
}
.sub-btn {
  background-color: transparent;
  color: #1f1f1f;
  border: 1px solid #e0e0e0;
}
.third-btn {
  background-color: transparent;
  border: 1px solid #6b6c72;
  color: white;
}
.third-btn:hover {
  background-color: #2a2b30;
}
</style>
