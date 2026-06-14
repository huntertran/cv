<template>
  <section class="output">
    <div class="cmd-line">
      <span class="arg">grep -i award ~/honors</span>
      <span class="faint">— {{ awards.length }} found</span>
    </div>
    <div class="list">
      <article v-for="(a, i) in awards" :key="a.title" class="card item" :class="{ open: open.has(i) }">
        <button class="item-head" @click="toggle(i)">
          <span class="chev kw">▸</span>
          <span class="time amber">{{ a.time }}</span>
          <span class="title">{{ a.title }}</span>
        </button>
        <div v-show="open.has(i)" class="item-body">
          <div class="dim org">@ {{ a.org }}</div>
          <p class="line-break desc">{{ a.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const awards = ref([])
const open = reactive(new Set([0]))
const toggle = (i) => (open.has(i) ? open.delete(i) : open.add(i))

onMounted(async () => {
  const res = await fetch('/data/cv.json')
  if (res.ok) awards.value = (await res.json()).awards || []
})
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 820px;
}
.item {
  transition: border-color 0.15s;
}
.item.open {
  border-color: var(--border-bright);
}
.item-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 15px;
  background: transparent;
  border: none;
  color: var(--fg);
  font-family: var(--mono);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}
.chev {
  transition: transform 0.16s;
}
.item.open .chev {
  transform: rotate(90deg);
}
.time {
  font-size: 12px;
  white-space: nowrap;
  font-family: var(--display);
}
.title {
  font-weight: 500;
}
.item-body {
  padding: 0 15px 15px 39px;
}
.org {
  font-size: 12px;
  margin-bottom: 6px;
}
.desc {
  font-size: 13px;
  margin: 0;
}
</style>
