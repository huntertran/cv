<template>
  <v-expansion-panels accordion multiple v-model="True">
    <v-expansion-panel v-for="award in awards" :key="award.title">
      <v-expansion-panel-header>{{ award.title }}</v-expansion-panel-header>
      <v-expansion-panel-content>
          <v-subheader>{{award.time}}</v-subheader>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
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