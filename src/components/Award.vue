<template>
  <v-container fluid class="fill-height">
    <v-row align-content="start" class="fill-height">
      <v-expansion-panels accordion multiple>
        <v-expansion-panel v-for="award in awards" :key="award.title">
          <v-expansion-panel-header>{{ award.time }} - {{ award.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-subheader>{{ award.org }}</v-subheader>
            <v-subheader class="line-break">{{ award.description }}</v-subheader>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider></v-divider>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      awards: []
    };
  },
  mounted: function() {
    this.getCv();
  },
  methods: {
    getCv: function() {
      var _this = this;
      Axios.get("/data/cv.json").then(function(response) {
        _this.awards = response.data.awards;
      });
    }
  }
};
</script>