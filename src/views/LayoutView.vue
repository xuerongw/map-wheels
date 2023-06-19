<template>
  <div class="layout">
    <component :is="isCOM"></component>
  </div>
</template>

<script>
export default {
  name: "LayoutView",
  components: {
    ZoomSlider: () => import("@/components/ZoomSlider"),
    OverviewMap: () => import("@/components/OverviewMap"),
    MapOperate: () => import("@/components/MapOperate"),
    MapClick: () => import("@/components/MapClick"),
  },
  data() {
    return {
      isCOM: "MapClick",
    };
  },
};
</script>

<style>
.layout {
  width: 100%;
  height: 100%;
}
</style>
