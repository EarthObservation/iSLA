<template>
  <div ref="map-root" class="map-root"></div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import GeoJSON from "ol/format/GeoJSON";
import { transform } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import TileWMS from "ol/source/TileWMS";
import { Fill, Stroke, Style, Circle, Text, Icon } from "ol/style";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import * as narSk from "@/static/aux_layers/narecne_skupine_2011.json";
import * as narTC from "@/static/aux_layers/tocke.json";
import "ol/ol.css";
import { mapGetters, mapMutations } from "vuex";
import * as svgIcon0 from "@/static/selectedFonts/7051.svg";
import * as svgIcon1 from "@/static/selectedFonts/7100.svg";
import * as svgIcon2 from "@/static/selectedFonts/7200.svg";
import * as svgIcon3 from "@/static/selectedFonts/7580.svg";
import * as svgIcon4 from "@/static/selectedFonts/asterisk.svg";

export default {
  name: "MapContainer",

  computed: {
    ...mapGetters(["getLayerState", "getActiveTab"]),
  },

  watch: {
    getLayerState: {
      deep: true,
      handler(newVal) {
        const layers = this.baseMap.getLayers();
        layers.forEach((layer) => {
          layer.setVisible(newVal[layer.get("id")]);
        });
      },
    },
  },

  methods: {
    ...mapMutations(["setCoordinates"]),
  },
  mounted() {
    var pointStyle0 = new Style({
      image: new Icon({
        color: "#2c3e50",
        displacement: [-60, 0],
        opacity: 1,
        scale: 1,
        src: svgIcon0,
      }),
    });

    var pointStyle1 = new Style({
      image: new Icon({
        color: "#2c3e50",
        displacement: [0, -50],
        opacity: 1,
        scale: 1,
        src: svgIcon1,
      }),
    });

    var pointStyle2 = new Style({
      image: new Icon({
        color: "#2c3e50",
        displacement: [-50, 0],
        opacity: 1,
        scale: 1,
        src: svgIcon3,
      }),
    });

    var pointStyle3 = new Style({
      image: new Icon({
        color: "#2c3e50",
        displacement: [0, -50],
        opacity: 1,
        scale: 1,
        src: svgIcon2,
      }),
    });

    var pointStyle4 = new Style({
      image: new Icon({
        color: "#2c3e50",
        displacement: [40, 20],
        opacity: 1,
        scale: 1,
        src: svgIcon4,
      }),
    });

    var textStyle = new Style({
      text: new Text({
        placement: "point",
        displacement: [0, 0],
        font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
        overflow: true,
        fill: new Fill({
          color: "#2c3e50",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 2,
        }),
      }),
    });

    this.tocke = new VectorLayer({
      id: "a1",
      source: new VectorSource({
        features: new GeoJSON().readFeatures(narTC.default),
      }),
      projection: "EPSG:3857",
      style: function (feature, resolution) {
        let iconScale = 1 / Math.pow(resolution, 1 / 3);
        let textScale = 1 / Math.pow(resolution, 1 / 2) + 0.6;
        pointStyle0.getImage().setScale(iconScale);
        pointStyle1.getImage().setScale(iconScale);
        pointStyle2.getImage().setScale(iconScale - 0.2);
        pointStyle3.getImage().setScale(iconScale - 0.2);
        pointStyle4.getImage().setScale(iconScale);
        textStyle.getText().setText(feature.get("FeatureID").toString());
        textStyle.getText().setScale(textScale);
        return [pointStyle0, pointStyle1, pointStyle4, textStyle];
      },
      //declutter: true,
    });

    this.narecneSkupine = new VectorLayer({
      id: "a0",
      source: new VectorSource({
        features: new GeoJSON().readFeatures(narSk.default),
      }),
      projection: "EPSG:3857",
      style: new Style({
        stroke: new Stroke({
          color: "#2c3e50",
          width: 3,
        }),
        /*         fill: new Fill({
          color: "rgba(0, 0, 0, 0.1)",
        }), */
      }),
    });

    this.baseMap1 = new TileLayer({
      id: "b0",
      source: new TileWMS({
        url: "http://localhost:1337/qgis-server?",
        params: {
          SERVICE: "WMS",
          VERSION: "1.3.0",
          REQUEST: "GetMap",
          MAP: "/data/podlage.qgs",
          LAYERS:
            "hs125,aglomeration,hydro_polygon,hydro_line,border_polygon,border_line,frame",
          TILED: true,
          STYLES: "",
          FORMAT: "image/png",
          WIDTH: 230,
          HEIGHT: 230,
          CRS: "EPSG:3857",
        },
        projection: "EPSG:3857",
        attributions: [
          '&copy;<a href ="https://www.e-prostor.gov.si/">GURS</a>',
        ],
      }),
    });
    this.featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: this.baseMap,
      style: new Style({
        image: new Circle({
          radius: 10,
          stroke: new Stroke({
            color: "#2c3e50",
            width: 2,
          }),
        }),
      }),
    });

    const displayFeatureInfo = (pixel) => {
      const feature = this.baseMap.forEachFeatureAtPixel(pixel, (feature) => {
        return feature;
      });
      if (feature !== this.highlight) {
        if (this.highlight) {
          this.featureOverlay.getSource().removeFeature(this.highlight);
        }
        if (feature) {
          this.featureOverlay.getSource().addFeature(feature);
        }
        this.highlight = feature;
      }
    };
    this.baseMap = new Map({
      target: this.$refs["map-root"],
      controls: defaultControls({
        attributionOptions: { collapsible: true },
      }).extend([new ScaleLine({ className: "ol-scale-line" })]),
      layers: [
        this.baseMap1,
        this.narecneSkupine,
        this.tocke,
        this.featureOverlay,
      ],

      view: new View({
        zoom: 8,
        projection: "EPSG:3857",
        extent: [1455746.1477, 5663030.1293, 1855621.339, 5941967.644],
        center: transform([14.83801, 46.11955], "EPSG:4326", "EPSG:3857"),
      }),
    });

    this.baseMap.on("pointermove", (evt) => {
      if (evt.dragging) {
        return;
      }
      const pixel = this.baseMap.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
    });

    this.baseMap.on("click", (evt) => {
      if (evt.dragging) {
        return;
      }
      if (this.getActiveTab === "newAnswer") {
        //newAnswer is a name of a tab for inputing new answers.
        this.setCoordinates({coordinates: evt.coordinate, SRS:"EPSG:3857"});
      }
    });
  },
};
</script>
<style>
.map-root {
  height: calc(100vh - 50px);
}

.ol-scale-line {
  left: 50%;
  transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
}

.ol-zoom {
  left: unset;
  right: 8px;
}
</style>
