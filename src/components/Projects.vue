<template>
  <v-container fluid class="fill-height">
    <v-row class="fill-height" align="start" justify="start">
      <v-tabs v-model="active_tab">
        <v-tab
          v-for="projectType in projects"
          :key="projectType.type"
          :href="`#tab-${projectType.type}`"
        >
          {{projectType.type}}
          <v-avatar left class="green darken-4 project-count">{{projectType.repos.length}}</v-avatar>
        </v-tab>
        <v-tab-item
          v-for="projectType in projects"
          :key="projectType.type"
          :value="`tab-${projectType.type}`"
        >
          <v-card outlined v-for="project in projectType.details" :key="project.id" class="pa-4">
            <v-card-text>
              <div>Last updated: {{getDateOnly(project.updated_at)}}</div>
              <div v-if="project.license">{{project.license.name}}</div>
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
              <v-btn
                v-if="project.homepage"
                color="green darken-4"
                :href="project.homepage"
                target="_blank"
              >Home page</v-btn>
              <v-btn color="green darken-4" :href="project.clone_url" target="_blank">Source code</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.separated-chip {
  margin-right: 4px;
  margin-bottom: 4px;
}
.project-count {
  height: 24px !important;
  min-width: 24px !important;
  width: 24px !important;
  margin-left: 8px !important;
  margin-right: 0 !important;
  color: white !important;
}
.v-card {
  margin-bottom: 8px;
}
</style>

<script>
// import Axios from "axios";

export default {
  data: function () {
    return {
      active_tab: "tab-tools",
      projects: [
        {
          type: "",
          count: 0,
          repos: [],
          details: [],
        },
      ],
    };
  },
  mounted: function () {
    this.getProjects();
    this.currentProjectType = this.projects[0];
  },
  methods: {
    getProjects: async function () {
      var _this = this;
      let response = await fetch("/data/projects.json");

      if (response.ok) {
        let json = await response.json();

        _this.projects = json.projects;
        _this.projects = _this.projects.filter(function (item) {
          return item.repos.length > 0;
        });
        _this.active_tab = "tab-tools";
        _this.projects.forEach(function (item) {
          _this.parseProjectType(item);
        });
      }
      // Axios.get("/data/projects.json").then(function(response) {
      //   _this.projects = response.data.projects;
      //   _this.projects = _this.projects.filter(function(item) {
      //     return item.repos.length > 0;
      //   });
      //   _this.active_tab = "tab-tools";
      //   _this.projects.forEach(function(item) {
      //     _this.parseProjectType(item);
      //   });
      // });
    },
    parseProjectType: function (projectType) {
      var _this = this;
      // debugger;
      projectType.repos.forEach(function (repo) {
        _this.getprojectDetails(repo, projectType);
      });
    },
    getprojectDetails: async function (projectName, projectType) {
      // var _this = this;
      let response = await fetch("https://api.github.com/repos/huntertran/" + projectName);

      if(response.ok) {
        let json = await response.json();

        projectType.details.push(json);
      }

      // Axios.get("https://api.github.com/repos/huntertran/" + projectName).then(
      //   function (response) {
      //     projectType.details.push(response.data);
      //   }
      // );
    },
    getDateOnly(dateString) {
      var date = new Date(dateString);
      return date.toLocaleDateString("en-CA");
    },
  },
};
</script>