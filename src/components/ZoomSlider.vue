<template>
  <!-- 缩放滑块 -->
  <div id="map" ref="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
// import { Vector as VectorLayer } from "ol/layer";
// import { Vector as VectorSource } from "ol/source";
import { XYZ } from "ol/source";
import { ZoomSlider } from "ol/control";
export default {
  name: "ZoomSlider",
  data() {
    return {
      mapData: null,
    };
  },
  mounted() {
    // console.log(this.key);
    this.initMap();
  },
  methods: {
    initMap() {
      var TiandiMap_vec = new TileLayer({
        title: "天地图矢量图层",
        source: new XYZ({
          url: `http://t4.tianditu.com/DataServer?T=vec_w&tk=${this.key}&x={x}&y={y}&l={z}`,
        }),
      });
      var Tianditu_cva = new TileLayer({
        title: "天地图矢量注记图层",
        source: new XYZ({
          url: `http://t4.tianditu.com/DataServer?T=cva_w&tk=${this.key}&x={x}&y={y}&l={z}`,
        }),
      });
      let mapContainer = this.$refs.map;
      //实例化Map对象加载地图
      let map = new Map({
        //地图容器div的ID
        target: mapContainer,
        //地图容器中加载的图层
        layers: [TiandiMap_vec, Tianditu_cva],

        view: new View({
          projection: "EPSG:4326", // 坐标系
          center: [117.49909311532974, 26.051648408174515],

          zoom: 5,

          maxZoom: 18,

          minZoom: 1,
        }),
      });
      let zoomslider = new ZoomSlider();
      map.addControl(zoomslider);
      this.mapData = map;
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
