<template>
    <v-container fluid class="fill-height">
        <v-row class="fill-height" align="start" justify="start">
            <v-card
                v-for="research in researches"
                :key="research.title"
                class="ma-3 pa-6"
            >
                <v-card-text>
                    <div>{{ research.org }}</div>
                    <p class="title text--primary">{{ research.title }}</p>
                    <div v-if="research.published">
                        Published in {{ research.published }}
                    </div>
                    <br />
                    <div class="text--primary">{{ research.abstract }}</div>
                </v-card-text>
                <v-card-subtitle>
                    <v-chip
                        class="separated-chip"
                        v-for="author in research.authors"
                        :key="author.name"
                        pill
                    >
                        <v-avatar v-if="author.avatar" left>
                            <img :src="author.avatar" :alt="author.name" />
                        </v-avatar>
                        <v-icon v-else left color="red">mdi-account</v-icon>
                        <span>{{ author.name }}</span>
                    </v-chip>
                </v-card-subtitle>

                <v-card-actions>
                    <v-btn
                        depressed
                        color="primary"
                        :href="research.link"
                        target="_blank"
                        >Learn More</v-btn
                    >
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
// import Axios from "axios";

export default {
    data: function() {
        return {
            researches: [],
        };
    },
    mounted: function() {
        this.getCv();
    },
    methods: {
        getCv: async function() {
            var _this = this;
            let response = await fetch("/data/cv.json");
            if (response.ok) {
                let json = await response.json();
                _this.researches = json.researches;
            }
            // Axios.get("/data/cv.json").then(function(response) {
            //   _this.researches = response.data.researches;
            // });
        },
    },
};
</script>

<style></style>
