<template>
  <div :class="width">
    <div
      class="form-group"
      :class="{ ' error': errorMessage, ' text-field': textField }"
    >
      <label for="" :class="{ ' required': isRequired }"
        >{{ label }}<span class="icon-required" v-show="isRequired">*</span>
      </label>
      <input
        :placeholder="placeholder"
        :name="name"
        :type="type"
        ref="input"
        :value="modelValue"
        @input="updateValue"
        @blur="blur"
        @keydown="validNumber"
        :checked="value"
        :style="{ 'text-align': text }"
        style="font-family: M-roboto"
        :disabled="disabled"
      />
      <div
        class="icon"
        :class="{ ' rotate': isRotate }"
        v-if="icon"
        @click="handleClickIcon"
      >
        <div></div>
      </div>
      <div class="tooltip-input" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <span class="span"> {{ span }}</span>
    </div>
  </div>
</template>

<script>
import enums from "@/helpers/enum";
import { computed, ref, watch } from "vue";
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
    text: String,
    typeData: String,
    font: String,
    icon: Boolean,
    textField: Boolean,
    disabled: Boolean,
    isClickIcon: Boolean,
    span: String,
  },

  setup(props, context) {
    /**
     *
     * Xử lý input
     * author: TQHUNG
     * Date: 8-4-2023
     */
    const input = ref(null);
    // const formattedValue = ref(props.modelValue);

    // watch(
    //   () => props.modelValue,
    //   (newValue) => {
    //     console.log(newValue);
    //     if (newValue) {
    //       formattedValue.value = parseInt(
    //         newValue.replace(/\./g, ""),
    //         10
    //       ).toLocaleString();
    //     } else {
    //       return;
    //     }
    //   }
    // );

    const isRotate = ref(false);
    const validNumber = (event) => {
      try {
        const keyCode = event.keyCode;
        if (
          (keyCode >= 48 && keyCode <= 57) || // Phím số
          (keyCode >= 96 && keyCode <= 105) || // Phím số (bàn phím số)
          keyCode === 8 || // Phím Backspace
          keyCode === 46 || // Phím Delete
          keyCode === 37 || // Mũi tên sang trái
          keyCode === 39 || // Mũi tên sang phải
          keyCode === 9 || // phím tab
          (event.ctrlKey && keyCode === 65) // Phím Ctrl + A
        ) {
          console.log(event.target.value);

          return true;
        } else {
          event.preventDefault();
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Hàm gửi đi sự kiện cập nhật input
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };

    // const updateValue = (event) => {
    //   const unformattedValue = event.target.value.replace(/\./g, ""); // Loại bỏ tất cả các dấu chấm ngăn cách
    //   const number = parseInt(unformattedValue, 10); // Chuyển đổi giá trị thành số nguyên

    //   if (!isNaN(number)) {
    //     formattedValue.value = number.toLocaleString(); // Định dạng số và gán giá trị vào biến tham chiếu
    //     context.emit("update:modelValue", unformattedValue); // Gửi sự kiện cập nhật giá trị cho component cha (không có dấu chấm ngăn cách)
    //   } else {
    //     formattedValue.value = ""; // Đặt giá trị thành rỗng nếu giá trị không phải số hợp lệ
    //     context.emit("update:modelValue", ""); // Gửi sự kiện cập nhật giá trị rỗng cho component cha
    //   }
    // };
    const handleClickIcon = () => {
      if (!props.disabled) {
        context.emit("handleClick");
        isRotate.value = !isRotate.value;
      } else {
        return;
      }
    };

    return {
      updateValue,
      handleClickIcon,
      isRotate,
      validNumber,
      input,
    };
  },
};
</script>

<style>
.form-group {
  position: relative;
}
.form-group input {
  position: relative;
}
.form-group input:disabled {
  background-color: #eff0f2;
}
.form-group.text-field input {
  height: 55px !important;
  width: 100%;
}
.tooltip-input {
  width: max-content;
  position: absolute;
  bottom: -30px;
  left: 0;
  font-size: 12px;
  padding: 0 12px;
  height: 24px;
  line-height: 24px;
  background-color: rgb(255, 119, 119);
  color: #ffffff;
  border-radius: 4px;
  /* display: none; */
  z-index: 999;
}
.form-group input:hover ~ .tooltip-input {
  display: block;
}
.tooltip-input::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateY(50%);
  width: 0px;
  height: 0px;
  border-bottom: 4px solid rgb(255, 119, 119);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  width: 100%;
  height: 36px;
  padding: 0px 8px;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}
.form-group label {
  font-size: 13px;
  color: #1f1f1f;
  font-weight: 700;
}

.form-group input[type="text"],
.form-group input[type="date"] {
  width: 100%;
  height: 26px;
  padding: 0px 12px 0 10px;
  border-radius: 2px;
  border: 1px solid #babec5;
}
.form-group input::placeholder {
  color: #999999;
  font-size: 14px;
}

.form-group input[type="text"]:focus,
.form-group input[type="date"]:focus {
  border: 1px solid #50b83c;
  outline: none;
}
.icon {
  position: absolute;
  right: 1px;
  bottom: 1px;

  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.icon:hover {
  background-color: #ebebf2;
}
.icon.rotate > div {
  transform: rotate(180deg);
}
.icon > div {
  display: block;
  background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -564px -365px;
  width: 8px;
  height: 5px;
}
.span {
  font-size: 14px;
  position: absolute;
  right: -90px;

  bottom: 0;
}
</style>
