<template>
    <v-container>
        <v-row>
            <h3>{{ title }}</h3>
        </v-row>
        <v-row v-if="$vuetify.breakpoint.smAndUp" align="stretch">
            <v-col align="stretch">
                <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                    <v-timeline-item
                        v-for="company in data"
                        :key="company.title"
                    >
                        <template v-slot:opposite>
                            <span v-text="company.to"></span>
                        </template>
                        <ExperienceItem :company="company"></ExperienceItem>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
        </v-row>
        <v-row v-else align="start" justify="start">
            <ExperienceItem
                class="separated-margin"
                v-for="company in data"
                :key="company.name"
                :company="company"
            ></ExperienceItem>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
.separated-margin {
    margin-bottom: 8px;
    margin-top: 8px;
}
</style>

<script>
import ExperienceItem from "./Experience-item";

export default {
    components: {
        ExperienceItem,
    },
    props: {
        title: String,
        data: Array,
    },
};
</script>
