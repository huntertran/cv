<template>
  <section>
    <!-- whoami hero -->
    <div class="output hero">
      <div class="cmd-line"><span class="arg">whoami</span> <span class="flag">--verbose</span></div>
      <h1 class="name glow">{{ cv.name || 'Van Tuan Tran' }}<span class="blink caret">_</span></h1>
      <p class="bio">
        <span class="kw">&gt;</span> {{ cv.bio || '…' }}
      </p>
      <div class="facts">
        <div class="fact">
          <span class="faint">role</span><span class="amber">software engineer</span>
        </div>
        <div class="fact">
          <span class="faint">based</span><span>Toronto</span>
        </div>
        <div class="fact">
          <span class="faint">focus</span><span>full-stack · .NET · data viz</span>
        </div>
      </div>
      <div class="links">
        <a href="https://github.com/huntertran" target="_blank" rel="noopener" class="btn">[ github ]</a>
        <a href="https://huntertran.github.io/blog" target="_blank" rel="noopener" class="btn">[ blog ]</a>
        <a href="mailto:tuantran1708@gmail.com" class="btn">[ email ]</a>
      </div>
    </div>

    <Timeline cmd="cat experience.log" :items="cv.experience" />
    <Timeline cmd="cat education.log" :items="cv.education" />
    <Timeline cmd="cat volunteer.log" :items="cv.volunteer" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Timeline from './Timeline.vue'

const cv = ref({ name: '', bio: '', experience: [], education: [], volunteer: [] })

onMounted(async () => {
  const res = await fetch('/data/cv.json')
  if (res.ok) cv.value = await res.json()
})
</script>

<style scoped>
.hero {
  margin-bottom: 46px;
}
.name {
  font-family: var(--display);
  font-size: clamp(26px, 4.5vw, 44px);
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--phosphor);
  line-height: 1.05;
  margin: 6px 0 16px;
}
.caret {
  font-weight: 400;
  margin-left: 4px;
}
.bio {
  font-size: 15px;
  max-width: 64ch;
  color: var(--fg);
  margin: 0 0 24px;
}
.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 30px;
  margin-bottom: 26px;
  font-size: 13px;
}
.fact {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.fact .faint {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
