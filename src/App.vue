<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item link v-for="menu in menus" :key="menu.name" :to="menu.url">
          <v-list-item-action>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">{{menu.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-chip v-if="menu.count > 0">{{menu.count}}</v-chip>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>Van Tuan Tran</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar right>
        <img src="./assets/avatar.jpg" />
      </v-avatar>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <span>hunter.tran &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
.line-break {
  white-space: pre-wrap;
}
</style>

<script>
// import Axios from "axios";

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    menus: [
      {
        name: "cv",
        url: "/cv",
        icon: "mdi-file-document-box-multiple-outline",
        count: 0,
      },
      {
        name: "awards",
        url: "/awards",
        icon: "mdi-seal-variant",
        count: 0,
      },
      {
        name: "researches",
        url: "/researches",
        icon: "mdi-school-outline",
        count: 0,
      },
      {
        name: "projects",
        url: "/projects",
        icon: "mdi-briefcase-outline",
        count: 0,
      },
      {
        name: "blog",
        url: "blog",
        icon: "mdi-web",
        count: 0,
      },
    ],
    cv: {},
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  mounted: function () {
    this.getCount();
    this.getProjectCount();
  },
  methods: {
    getCount: async function () {
      var _this = this;
      let response = await fetch("/data/cv.json");
      if (response.ok) {
        let json = await response.json();
        _this.cv = json;
        _this.menus.forEach(function (menu) {
          if (_this.cv[menu.name] !== undefined) {
            menu.count = _this.cv[menu.name].length;
          }
        });
      }
      // Axios.get("/data/cv.json").then(function(response) {
      //   _this.cv = response.data;
      //   _this.menus.forEach(function(menu) {
      //     if (_this.cv[menu.name] !== undefined) {
      //       menu.count = _this.cv[menu.name].length;
      //     }
      //   });
      // });
    },
    getProjectCount: async function () {
      var _this = this;
      let response = await fetch("/data/projects.json");
      if (response.ok) {
        let json = await response.json();
        _this.menus.forEach(function (menu) {
          if (menu.name === "projects") {
            json.projects.forEach(function (item) {
              menu.count += item.repos.length;
            });
          }
        });
      }
      // Axios.get("/data/projects.json").then(function (response) {
      //   // /* eslint-disable no-console */
      //   // console.log(response.data.length);
      //   _this.menus.forEach(function (menu) {
      //     if (menu.name === "projects") {
      //       response.data.projects.forEach(function (item) {
      //         menu.count += item.repos.length;
      //       });
      //     }
      //   });
      // });
    },
  },
};
</script>