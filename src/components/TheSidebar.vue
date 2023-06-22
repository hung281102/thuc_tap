<template>
  <div class="sidebar" id="sidebar" :class="{ ' mini': miniSidebar }">
    <div class="sidebar-body">
      <ul class="list-item">
        <router-link
          :to="{ name: item.component }"
          v-for="(item, index) in resource.SIDE_BAR"
          :key="item.id"
          :class="{ ' router-link-active': index == 2 && isActive }"
        >
          <li class="item">
            <div class="box-icon">
              <span class="item-icon" :class="item.icon"></span>
              <div class="tool-tip">{{ item.title }}</div>
            </div>
            <span class="content">{{ item.title }}</span>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="sidebar-footer" @click="minimizeSidebar">
      <div class="area-collapse">
        <div>
          <span class="sidebar-footer-icon icon-collapse"> </span>
        </div>
        <span class="collapse">Thu gọn</span>
      </div>

      <div class="area-open box-icon">
        <span class="sidebar-footer-icon icon-open"></span>
        <div class="tool-tip">Mở</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import resource from "@/helpers/resource";

export default {
  data() {
    return {
      miniSidebar: false,
      resource: { ...resource },
    };
  },
  props: ["isActive"],
  methods: {
    minimizeSidebar() {
      this.miniSidebar = !this.miniSidebar;
      this.$emit("sendValue", this.miniSidebar);
      console.log(this.miniSidebar);
    },
  },
};
</script>

<style>
@import url("../css/sidebar.css");
@import url("../css/icon-sidebar.css");
</style>
