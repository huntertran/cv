<template>
  <section class="output">
    <div class="cmd-line">
      <span class="arg">cat ~/research/*.bib</span>
      <span class="faint">— {{ researches.length }} {{ researches.length === 1 ? 'paper' : 'papers' }}</span>
    </div>
    <div class="grid">
      <article v-for="r in researches" :key="r.title" class="card paper">
        <div class="head-row">
          <div class="dim org">{{ r.org }}</div>
          <span v-if="cites[r.doi] > 0" class="cite pill" title="citations (Semantic Scholar)">
            ❝ {{ cites[r.doi] }} {{ cites[r.doi] === 1 ? 'citation' : 'citations' }}
          </span>
        </div>
        <h3 class="paper-title kw">{{ r.title }}</h3>
        <div v-if="r.published" class="published amber">▸ {{ r.published }}</div>
        <p class="abstract dim">{{ r.abstract }}</p>
        <div class="authors">
          <span v-for="a in r.authors" :key="a.name" class="pill author">
            <img v-if="a.avatar" :src="a.avatar" :alt="a.name" class="av" loading="lazy" />
            <span v-else class="av initials">{{ initials(a.name) }}</span>
            <a v-if="a.link" :href="a.link" target="_blank" rel="noopener">{{ a.name }}</a>
            <span v-else>{{ a.name }}</span>
          </span>
        </div>
        <a v-if="r.link" :href="r.link" target="_blank" rel="noopener" class="btn">[ read paper → ]</a>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const researches = ref([])
const cites = reactive({}) // doi -> citation count (from Semantic Scholar)
const initials = (n) =>
  n.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

async function loadCitations() {
  await Promise.all(
    researches.value
      .filter((r) => r.doi)
      .map(async (r) => {
        try {
          const res = await fetch(
            `https://api.semanticscholar.org/graph/v1/paper/DOI:${r.doi}?fields=citationCount`
          )
          if (res.ok) cites[r.doi] = (await res.json()).citationCount
        } catch (e) {
          /* leave undefined → badge hidden */
        }
      })
  )
}

onMounted(async () => {
  const res = await fetch('/data/cv.json')
  if (res.ok) {
    const list = (await res.json()).researches || []
    // newest first; entries without a date sort last
    list.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
    researches.value = list
    loadCitations()
  }
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 16px;
}
.paper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.org {
  font-size: 12px;
}
.cite {
  font-size: 11px;
  color: var(--phosphor);
  border-color: var(--border-bright);
  white-space: nowrap;
}
.paper-title {
  font-family: var(--display);
  font-size: 16px;
  line-height: 1.45;
}
.published {
  font-size: 12px;
}
.abstract {
  font-size: 12.5px;
  line-height: 1.65;
  margin: 0;
}
.authors {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.author {
  padding-left: 3px;
}
.av {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
.av.initials {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--border-bright);
  color: var(--fg);
  font-size: 9px;
}
.btn {
  align-self: flex-start;
  margin-top: 4px;
}
</style>
