<template>
  <v-row align="stretch">
    <v-col align="stretch">
      <h2>{{cv.name}}</h2>
      <p>{{cv.bio}}</p>
      <h3>Experience</h3>
      <v-row v-for="company in cv.experience" :key="company.name">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{company.from}} - {{company.to}}</div>
              <v-list-item-title class="headline mb-1">{{company.title}}</v-list-item-title>
              <v-list-item-subtitle>{{company.name}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{company.location}}</v-list-item-subtitle>
              <v-list-item-content>{{company.description}}</v-list-item-content>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
          </v-list-item>

          <!-- <v-card-actions>
          <v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn>
          </v-card-actions>-->
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Axios from "axios";

export default {
  name: "cv",
  data: function() {
    return {
      cv: {
        name: "",
        bio: "",
        experience: []
      }
    };
  },
  mounted: function() {
    this.getCv();
  },
  methods: {
    getCv: function() {
      var _this = this;
      Axios.get("/data/cv.json").then(function(response) {
        _this.cv = response.data;
      });
    }
  }
};
</script>