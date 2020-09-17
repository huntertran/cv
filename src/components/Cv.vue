<template>
  <v-container>
    <v-row align="stretch">
      <v-col align="stretch">
        <h2>{{cv.name}}</h2>
        <p>{{cv.bio}}</p>
      </v-col>
    </v-row>
    <Experience :data="cv.education" title="Education"></Experience>
    <Experience :data="cv.experience" title="Experience"></Experience>
    <Experience :data="cv.volunteer" title="Volunteer Experience"></Experience>
  </v-container>
</template>

<script>
// import Axios from "axios";
import Experience from "./Experience";

export default {
  name: "cv",
  components: {
    Experience,
  },
  data: function () {
    return {
      cv: {
        name: "",
        bio: "",
        experience: [],
        education: [],
      },
    };
  },
  mounted: function () {
    this.getCv();
  },
  methods: {
    getCv: async function () {
      var _this = this;
      let response = await fetch("/data/cv.json");
      if (response.ok) {
        let json = await response.json();
        _this.cv = json;
      }
      // Axios.get("/data/cv.json").then(function(response) {
      //     _this.cv = response.data;
      // });
    },
  },
};
</script>