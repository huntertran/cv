<template>
  <section class="output">
    <div class="cmd-line">
      <span class="arg">git ls-remote --all</span>
      <span class="faint">— {{ totalRepos }} repos</span>
    </div>

    <div class="tabs">
      <button
        v-for="p in projects"
        :key="p.type"
        class="tab"
        :class="{ active: activeType === p.type }"
        @click="activeType = p.type"
      >
        <span class="kw">./</span>{{ p.type }} <span class="tab-count">{{ p.repos.length }}</span>
      </button>
    </div>

    <div v-if="active" class="grid">
      <article v-for="repo in active.details" :key="repo.id" class="card repo">
        <div class="repo-head">
          <h3 class="repo-name cyan">{{ repo.name }}</h3>
          <span v-if="repo.language" class="pill">{{ repo.language }}</span>
        </div>
        <p class="repo-desc dim">{{ repo.description || 'No description.' }}</p>
        <div class="repo-stats dim">
          <span class="kw">★ {{ repo.stargazers_count }}</span>
          <span>⊙ {{ repo.open_issues }} issues</span>
          <span v-if="repo.license" class="amber">{{ repo.license.spdx_id || repo.license.name }}</span>
          <span v-if="repo.updated_at" class="faint">↻ {{ dateOnly(repo.updated_at) }}</span>
        </div>
        <div class="repo-actions">
          <a v-if="repo.homepage" :href="repo.homepage" target="_blank" rel="noopener" class="btn">[ live ]</a>
          <a :href="repo.html_url || repo.clone_url" target="_blank" rel="noopener" class="btn">[ source → ]</a>
        </div>
      </article>

      <p v-if="active.loading" class="status kw">▌ cloning from github…</p>
      <p v-else-if="!active.details.length" class="status faint">// no repos loaded (github rate limit)</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const projects = ref([])
const activeType = ref('')
const active = computed(() => projects.value.find((p) => p.type === activeType.value))
const totalRepos = computed(() => projects.value.reduce((s, p) => s + p.repos.length, 0))
const dateOnly = (s) => new Date(s).toLocaleDateString('en-CA')

async function loadDetails(group) {
  group.loading = true
  await Promise.all(
    group.repos.map(async (name) => {
      try {
        const res = await fetch(`https://api.github.com/repos/huntertran/${name}`)
        if (res.ok) group.details.push(await res.json())
      } catch (e) {}
    })
  )
  group.details.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  group.loading = false
}

onMounted(async () => {
  const res = await fetch('/data/projects.json')
  if (!res.ok) return
  const data = await res.json()
  projects.value = data.projects
    .filter((p) => p.repos.length > 0)
    .map((p) => ({ ...p, details: [], loading: false }))
  if (projects.value.length) {
    activeType.value = projects.value[0].type
    projects.value.forEach(loadDetails)
  }
})
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.tab {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--fg-dim);
  font-family: var(--display);
  font-size: 13px;
  padding: 8px 14px;
  cursor: pointer;
  margin-bottom: -1px;
}
.tab:hover {
  color: var(--fg);
}
.tab.active {
  color: var(--phosphor);
  border-bottom-color: var(--phosphor);
  text-shadow: var(--glow);
}
.tab-count {
  color: var(--fg-faint);
  font-size: 11px;
  margin-left: 4px;
  font-family: var(--mono);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}
.repo {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.repo:hover {
  border-color: var(--border-bright);
}
.repo-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.repo-name {
  font-family: var(--display);
  font-size: 14px;
}
.repo-desc {
  font-size: 12.5px;
  margin: 0;
  flex: 1;
}
.repo-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
}
.repo-actions {
  display: flex;
  gap: 8px;
}
.status {
  grid-column: 1 / -1;
  font-size: 13px;
}
</style>
