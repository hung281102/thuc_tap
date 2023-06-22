<template>
  <div :class="width">
    <div class="form-group" :class="{ ' error': errorMessage }">
      <label for="" :class="{ ' required': isRequired }"
        >{{ label }}<span class="icon-required" v-show="isRequired">*</span>
      </label>
      <input
        :placeholder="placeholder"
        :name="name"
        :type="type"
        :value="inputValue"
        @input="updateValue"
        @blur="blur"
        :checked="value"
        style="text-align: end"
      />
      <span class="error-message">{{ errorMessage }}</span>
      <div class="tooltip-input" v-show="tooltip">
        {{ tooltip }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import enums from "@/helpers/enum";
export default {
  data() {
    return {
      enums: { ...enums },
    };
  },
  props: {
    isRequired: Boolean,
    label: String,
    modelValue: String,
    errorMessage: String,
    type: String,
    name: String,
    width: String,
    value: String,
    blur: Function,
    placeholder: String,
    tooltip: String,
    textAlign: String,
    field: String,
  },

  setup(props, context) {
    /**
     * Xử lý input
     * author: TQHUNG
     * Date: 8-4-2023
     */

    // Hàm gửi đi sự kiện cập nhật input
    const inputValue = ref("");
    // inputValue.value = props.modelValue;

    inputValue.value = computed(() => {
      return inputValue.value + 1;
    });

    onMounted(() => {
      console.log(inputValue.value);
      console.log(props.modelValue);
    });

    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    return {
      updateValue,
      inputValue,
    };
  },
};
</script>

<style>
.form-group {
  position: relative;
}
.tooltip-input {
  position: absolute;
  bottom: -20px;
  left: 0;

  font-size: 12px;
  padding: 0 12px;
  height: 24px;
  line-height: 24px;
  background-color: #041434;
  color: #ffffff;
  border-radius: 4px;
  display: none;
}
label:hover ~ .tooltip-input {
  display: block;
}
.tooltip-input::after {
  content: "";
  position: absolute;
  left: 50%;
  top: -6px;
  transform: translateY(50%);
  width: 0px;
  height: 0px;
  border-bottom: 4px solid #041434;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}
</style>
