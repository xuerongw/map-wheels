<template>
  <!-- 鹰眼 -->
  <div id="map" ref="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
// import { Vector as VectorLayer } from "ol/layer";
// import { Vector as VectorSource } from "ol/source";
import { XYZ } from "ol/source";
import { defaults, OverviewMap } from "ol/control";
export default {
  name: "OverviewMap",
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
      ////实例化鹰眼控件（OverviewMap）,最简单的默认样式鹰眼控件
      // var overviewMapControl = new ol.control.OverviewMap();
      //实例化鹰眼控件（OverviewMap）,自定义样式的鹰眼控件
      var overviewMapControl = new OverviewMap({
        //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
        className: "ol-overviewmap ol-custom-overviewmap",
        //鹰眼中加载同坐标系下不同数据源的图层
        layers: [TiandiMap_vec],
        //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
        collapseLabel: "\u00BB",
        //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
        label: "\u00AB",
        //初始为展开显示方式
        collapsed: false,
      });
      //实例化Map对象加载地图
      let map = new Map({
        //地图容器div的ID
        target: mapContainer,
        //地图容器中加载的图层
        layers: [TiandiMap_vec, Tianditu_cva],
        controls: defaults().extend([overviewMapControl]),
        view: new View({
          projection: "EPSG:4326", // 坐标系
          center: [117.49909311532974, 26.051648408174515],

          zoom: 5,

          maxZoom: 18,

          minZoom: 1,
        }),
      });

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
