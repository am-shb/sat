<template>
  <v-img :src="refinedSrc" :alt="alt" :width="width" :height="height" />
</template>

<script setup lang="ts">
import { withBase } from "ufo";
import { useRuntimeConfig, computed, useRoute } from "#imports";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const route = useRoute();

const refinedSrc = computed(() => {
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    return withBase(props.src, useRuntimeConfig().app.baseURL + "assets/");
  } else if (props.src?.startsWith("@")) {
    const base = useRuntimeConfig().app.baseURL + "assets/" + route.params.id;
    return withBase(props.src.slice(2), base);
  }
  return props.src;
});
</script>
