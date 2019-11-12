<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height" align="start" justify="start">
      <v-card v-for="research in researches" :key="research.title" class="ma-3 pa-6">
        <v-card-text>
          <div>{{research.org}}</div>
          <p class="title text--primary">{{research.title}}</p>

          <div class="text--primary">{{research.abstract}}</div>
        </v-card-text>
        <v-card-subtitle>
          <v-chip v-for="author in research.authors" :key="author.name" pill>
            <v-avatar v-if="author.avatar" left>
              <img :src="author.avatar" />
            </v-avatar>
            <v-icon v-else left color="red">mdi-account</v-icon>
            <span>{{author.name}}</span>
          </v-chip>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="green darken-4">Learn More</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      researches: []
    };
  },
  mounted: function() {
    this.getCv();
  },
  methods: {
    getCv: function() {
      var _this = this;
      Axios.get("/data/cv.json").then(function(response) {
        _this.researches = response.data.researches;
      });
    }
  }
};
</script>

<style>
</style>