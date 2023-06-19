<template>
  <!-- 地图操作 -->
  <div class="box">
    <div id="map" ref="map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { XYZ } from "ol/source";
import { Style, Icon } from "ol/style";
import { Point } from "ol/geom";
export default {
  name: "MapClick",
  data() {
    return {
      mapData: null,
      iconLayer: null,
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
      this.mapData = map;
      map.on("click", (evt) => this.mapClick(evt));
    },
    mapClick(evt) {
      this.clickCenter = evt.coordinate; // 获取点击的中心点
      if (evt.coordinate) {
        this.$emit("clickData", evt.coordinate);
      }
      this.removeIcon();
      // 创建矢量容器
      const vectorSource = new VectorSource({});
      // 创建图标特性
      const iconFeature = new Feature({
        type: "icon",
        name: "mapIconMark",
        geometry: new Point(evt.coordinate),
      });
      // 图标特性添加到矢量容器
      vectorSource.addFeature(iconFeature);
      // 创建矢量层
      this.iconLayer = new VectorLayer({
        className: "map-icon-mark",
        source: vectorSource,
        zIndex: 100000,
        // 创建图标样式
        style: new Style({
          image: new Icon({
            src: require("@/assets/images/location.png"),
            scale: 0.1,
          }),
        }),
      });
      this.mapData.addLayer(this.iconLayer);
    },
    // 取消图标
    removeIcon() {
      if (this.iconLayer) {
        // 移除图层
        this.mapData.removeLayer(this.iconLayer);
        this.iconLayer = null;
      }
    },
  },
};
</script>

<style>
.box {
  width: 100%;
  height: 100%;
}
.map {
  width: 100%;
  height: 80%;
}
</style>
