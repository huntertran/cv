<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height" align="start" justify="start">
      <v-card v-for="project in details" :key="project.id" class="ma-4 pa-4">
        <v-card-text>
          <div>Last updated: {{getDateOnly(project.updated_at)}}</div>
          <div>{{project.license.name}}</div>
          <p class="title text--primary">{{project.name}}</p>

          <div class="text--primary">{{project.description}}</div>
        </v-card-text>
        <v-card-subtitle>
          <v-chip class="separated-chip" color="green" text-color="white">
            <v-avatar left class="green darken-4">{{project.stargazers_count}}</v-avatar>stars
          </v-chip>
          <v-chip class="separated-chip" color="green" text-color="white">
            <v-avatar left class="green darken-4">{{project.open_issues}}</v-avatar>open issues
          </v-chip>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="green darken-4" :href="project.homepage" target="_blank">Home page</v-btn>
          <v-btn color="green darken-4" :href="project.clone_url" target="_blank">Source code</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.separated-chip {
  margin-right: 4px;
  margin-bottom: 4px;
}
</style>

<script>
import Axios from "axios";

export default {
  data: function() {
    return {
      projects: [],
      details: []
    };
  },
  mounted: function() {
    this.getProjects();
  },
  methods: {
    getProjects: function() {
      var _this = this;
      Axios.get("/data/projects.json").then(function(response) {
        _this.projects = response.data.projects;
        _this.projects.forEach(function(item) {
          _this.getprojectDetails(item);
        });
      });
    },
    getprojectDetails: function(projectName) {
      var _this = this;
      Axios.get("https://api.github.com/repos/huntertran/" + projectName).then(
        function(response) {
          _this.details.push(response.data);
        }
      );
    },
    getDateOnly(dateString) {
      var date = new Date(dateString);
      return date.toLocaleDateString("en-CA");
    }
  }
};
</script>