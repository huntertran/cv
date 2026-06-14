<template>
  <div v-if="items && items.length" class="output">
    <div class="cmd-line">
      <span class="arg">{{ cmd }}</span>
      <span class="faint">— {{ items.length }} {{ items.length === 1 ? 'entry' : 'entries' }}</span>
    </div>
    <ol class="timeline">
      <li v-for="(item, i) in items" :key="item.title + i" class="entry">
        <span class="node" aria-hidden="true"></span>
        <div class="when faint">{{ short(item.to) }}</div>
        <div class="card entry-card">
          <div class="entry-head">
            <div>
              <h3 class="entry-title kw">{{ item.title }}</h3>
              <div class="entry-role amber">{{ item.name }}</div>
            </div>
            <img
              v-if="item.avatar"
              class="logo"
              :src="item.avatar"
              :alt="item.title"
              loading="lazy"
            />
          </div>
          <div class="entry-meta dim">
            <span>{{ item.from }} → {{ item.to || 'present' }}</span>
            <span v-if="item.location"> · {{ item.location }}</span>
          </div>
          <p v-if="item.description" class="entry-desc line-break">{{ item.description }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup>
defineProps({
  cmd: String,
  items: Array
})

// Compact right-rail year. Data uses mixed formats (2018-07 / 09-2019 / 2010).
function short(v) {
  if (!v) return 'now'
  const m = String(v).match(/\d{4}/)
  return m ? m[0] : String(v)
}
</script>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0 0 0 4px;
  border-left: 1px solid var(--border);
}
.entry {
  position: relative;
  padding: 0 0 18px 26px;
}
.node {
  position: absolute;
  left: -5px;
  top: 16px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--phosphor);
  box-shadow: var(--glow);
}
.when {
  position: absolute;
  left: 26px;
  top: -2px;
  font-size: 11px;
  letter-spacing: 1px;
}
.entry-card {
  padding: 14px 16px;
  margin-top: 16px;
  transition: border-color 0.15s;
}
.entry-card:hover {
  border-color: var(--border-bright);
}
.entry-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.entry-title {
  font-family: var(--display);
  font-size: 15px;
}
.entry-role {
  font-size: 13px;
  margin-top: 3px;
}
.logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 3px;
  background: #fff;
  padding: 3px;
  flex-shrink: 0;
}
.entry-meta {
  font-size: 12px;
  margin: 7px 0;
}
.entry-desc {
  font-size: 13px;
  margin: 8px 0 0;
  color: var(--fg);
}
</style>
