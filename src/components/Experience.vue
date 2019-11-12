<template>
    <v-container>
        <v-row>
            <h3>{{title}}</h3>
        </v-row>
        <v-row align="stretch">
            <v-col align="stretch">
                <v-timeline :dense="true">
                    <v-timeline-item
                        v-for="company in data"
                        :key="company.name"
                        right
                        :dense="true"
                        small
                    >
                        <span slot="opposite">{{company.to}} - {{company.from}}</span>
                        <v-card class="elevation-2">
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4">{{company.to}} - {{company.from}}</div>
                                    <v-list-item-title class="headline mb-1">{{company.title}}</v-list-item-title>
                                    <v-list-item-subtitle>{{company.name}}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{company.location}}</v-list-item-subtitle>
                                    <v-list-item-content class="line-break">{{company.description}}</v-list-item-content>
                                </v-list-item-content>

                                <v-list-item-avatar v-if="company.avatar" tile size="80" color="grey">
                                    <v-img :src="company.avatar"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        title: String,
        data: Array
    }
};
</script>