<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item link v-for="menu in menus" :key="menu.name" :to="menu.url">
          <v-list-item-action>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{menu.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-avatar>
        <img src="./assets/avatar.jpg" />
      </v-avatar>
      <v-toolbar-title>Van Tuan Tran</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>hunter.tran &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    menus: [
      {
        name: "cv",
        url: "/cv",
        icon: "mdi-file-document-box-multiple-outline"
      },
      {
        name: "blog",
        url: "blog",
        icon: "mdi-web"
      }
    ]
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>