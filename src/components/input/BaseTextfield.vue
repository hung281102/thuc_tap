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
        ref="input"
        :value="modelValue"
        @input="updateValue"
        @blur="blur"
        :checked="value"
        :style="{ 'text-align': text }"
        style="font-family: M-roboto"
      />
      <div
        class="icon"
        :class="{ ' rotate': isRotate }"
        v-if="icon"
        @click="handleClickIcon"
      >
        <div></div>
      </div>
      <div class="tooltip-input" v-show="tooltip">
        {{ tooltip }}
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
