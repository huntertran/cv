<template>
  <div class="crt">
    <!-- CRT atmosphere overlays -->
    <div class="fx scanlines" aria-hidden="true"></div>
    <div class="fx grain" aria-hidden="true"></div>
    <div class="fx vignette" aria-hidden="true"></div>
    <div class="fx flicker" aria-hidden="true"></div>

    <div class="frame">
      <!-- status bar -->
      <header class="statusbar">
        <span class="kw glow">●</span>
        <span class="host">visitor@huntertran</span>
        <span class="dim sep">—</span>
        <span class="dim path">{{ currentCmd }}</span>
        <span class="spacer"></span>
        <span class="dim clock">UP {{ uptime }}</span>
        <button class="chip" @click="toggleTheme">
          {{ theme === 'dark' ? 'CRT' : 'DAY' }}
        </button>
      </header>

      <div class="body">
        <!-- command rail -->
        <nav class="rail" :class="{ open: railOpen }">
          <div class="rail-head dim">// navigation</div>
          <ul>
            <li v-for="(m, i) in menus" :key="m.cmd">
              <router-link :to="m.url" class="rail-link" @click="railOpen = false">
                <span class="key">{{ i + 1 }}</span>
                <span class="cmdname">{{ m.cmd }}</span>
                <span v-if="m.count > 0" class="ct">{{ m.count }}</span>
              </router-link>
            </li>
          </ul>
          <div class="rail-foot">
            <a href="https://github.com/huntertran" target="_blank" rel="noopener" class="dim">github ↗</a>
            <a href="https://huntertran.github.io/blog" target="_blank" rel="noopener" class="dim">blog ↗</a>
            <div class="copy faint"># hunter.tran {{ year }}</div>
          </div>
        </nav>

        <button class="rail-toggle" @click="railOpen = !railOpen" aria-label="menu">
          {{ railOpen ? '×' : '≡' }}
        </button>

        <!-- output -->
        <main class="screen">
          <router-view v-slot="{ Component }">
            <transition name="boot-in" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>

      <!-- live command prompt -->
      <footer class="promptbar">
        <transition name="resp">
          <div v-if="response" class="response" :class="response.kind">{{ response.text }}</div>
        </transition>
        <transition name="resp">
          <div v-if="suggestions.length" class="suggest">
            <span class="faint hint">tab ↹</span>
            <button
              v-for="s in suggestions"
              :key="s"
              class="sug"
              :class="{ top: s === suggestions[0] }"
              @mousedown.prevent="pick(s)"
            >
              {{ s }}
            </button>
          </div>
        </transition>
        <form class="prompt" @submit.prevent="run">
          <span class="ps1"
            ><span class="kw">visitor@huntertran</span><span class="dim">:</span><span class="cyan">~</span><span class="dim">$</span></span
          >
          <div class="input-wrap">
            <div class="ghost" aria-hidden="true"><span class="g-typed">{{ line }}</span>{{ ghost }}</div>
            <input
              ref="input"
              v-model="line"
              class="cmd-input"
              spellcheck="false"
              autocomplete="off"
              autocapitalize="off"
              placeholder="type 'help' and hit enter…"
              @keydown.tab.prevent="accept"
              @keydown.right="onRight"
              @keydown.up.prevent="recall(-1)"
              @keydown.down.prevent="recall(1)"
            />
          </div>
        </form>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const year = new Date().getFullYear()

const menus = ref([
  { cmd: 'cv', url: '/cv', count: 0 },
  { cmd: 'awards', url: '/awards', count: 0 },
  { cmd: 'researches', url: '/researches', count: 0 },
  { cmd: 'projects', url: '/projects', count: 0 },
  { cmd: 'blog', url: '/blog', count: 0 }
])

const currentCmd = computed(() => {
  const p = route.path === '/' ? '/cv' : route.path
  return '~' + p
})

/* ---------- theme ---------- */
const theme = ref('dark')
// `persist` only when the user manually picks. Otherwise we follow the OS.
function applyTheme(t, persist = true) {
  theme.value = t
  document.documentElement.setAttribute('data-theme', t)
  if (persist) localStorage.setItem('theme', t)
}
function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

const mql = window.matchMedia('(prefers-color-scheme: dark)')
function onSystemTheme(e) {
  // Only auto-follow while the user hasn't set an explicit preference.
  if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light', false)
}

/* ---------- uptime clock ---------- */
const start = Date.now()
const uptime = ref('00:00')
let timer
function tick() {
  const s = Math.floor((Date.now() - start) / 1000)
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  uptime.value = `${mm}:${ss}`
}

/* ---------- command line ---------- */
const input = ref(null)
const line = ref('')
const response = ref(null)
const history = ref([])
let histIdx = -1
const railOpen = ref(false)

const known = ['cv', 'awards', 'researches', 'projects', 'blog']
const aliases = { whoami: 'cv', home: 'cv', work: 'cv', '~': 'cv' }
const builtins = ['help', 'ls', 'clear', 'theme']
const completable = [...known, ...builtins]

// Inline ghost completion: best prefix match for the (single) token being typed.
const suggestions = computed(() => {
  const t = line.value.toLowerCase()
  if (!t || /\s/.test(t)) return []
  return completable.filter((c) => c.startsWith(t) && c !== t)
})
const ghost = computed(() => (suggestions.value[0] ? suggestions.value[0].slice(line.value.length) : ''))

function accept() {
  if (suggestions.value[0]) line.value = suggestions.value[0]
}
function onRight(e) {
  // Accept ghost with → only when the caret sits at the end of the text.
  if (ghost.value && e.target.selectionStart === line.value.length) {
    e.preventDefault()
    accept()
  }
}
function pick(s) {
  line.value = s
  run()
}

function respond(text, kind = 'ok') {
  response.value = { text, kind }
  clearTimeout(respond._t)
  respond._t = setTimeout(() => (response.value = null), 3200)
}

function run() {
  const raw = line.value.trim()
  if (!raw) return
  history.value.push(raw)
  histIdx = history.value.length
  line.value = ''
  const cmd = raw.toLowerCase().split(/\s+/)[0]
  const target = aliases[cmd] || cmd

  if (known.includes(target)) {
    router.push('/' + target)
    respond(`→ ${target}`, 'ok')
  } else if (cmd === 'help' || cmd === '?') {
    respond('commands: ' + known.join('  ') + '  ·  ls  clear  theme  help', 'ok')
  } else if (cmd === 'ls' || cmd === 'dir') {
    respond(known.map((k) => k + '/').join('  '), 'ok')
  } else if (cmd === 'theme') {
    toggleTheme()
    respond('theme → ' + theme.value, 'ok')
  } else if (cmd === 'clear' || cmd === 'cls') {
    response.value = null
  } else if (cmd === 'sudo') {
    respond('visitor is not in the sudoers file. This incident will be reported.', 'err')
  } else {
    respond(`command not found: ${cmd} — try 'help'`, 'err')
  }
}

function recall(dir) {
  if (!history.value.length) return
  histIdx = Math.min(history.value.length, Math.max(0, histIdx + dir))
  line.value = history.value[histIdx] || ''
}

/* ---------- lifecycle ---------- */
onMounted(async () => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored)
  } else {
    // No saved choice → match the browser/OS theme.
    applyTheme(mql.matches ? 'dark' : 'light', false)
  }
  mql.addEventListener('change', onSystemTheme)
  tick()
  timer = setInterval(tick, 1000)

  try {
    const cv = await (await fetch('/data/cv.json')).json()
    for (const m of menus.value) if (Array.isArray(cv[m.cmd])) m.count = cv[m.cmd].length
  } catch (e) {}
  try {
    const { projects } = await (await fetch('/data/projects.json')).json()
    const total = projects.reduce((s, p) => s + p.repos.length, 0)
    const pi = menus.value.find((m) => m.cmd === 'projects')
    if (pi) pi.count = total
  } catch (e) {}
})
onBeforeUnmount(() => {
  clearInterval(timer)
  mql.removeEventListener('change', onSystemTheme)
})
</script>

<style scoped>
.crt {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(120% 120% at 50% 0%, var(--bg-grad-1), var(--bg-grad-2) 70%);
}

/* ---- CRT overlays ---- */
.fx {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}
.scanlines {
  background: repeating-linear-gradient(
    to bottom,
    transparent 0 2px,
    var(--scanline) 2px 3px
  );
  mix-blend-mode: multiply;
  opacity: 0.6;
}
.grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.035;
}
.vignette {
  background: radial-gradient(120% 100% at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.55) 100%);
}
.flicker {
  background: var(--phosphor-soft);
  opacity: 0;
  animation: flick 7s infinite steps(1);
}
@keyframes flick {
  0%, 96%, 100% { opacity: 0; }
  97% { opacity: 0.03; }
  98% { opacity: 0; }
  99% { opacity: 0.04; }
}
:root[data-theme='light'] .vignette,
:root[data-theme='light'] .flicker {
  display: none;
}

/* ---- frame ---- */
.frame {
  position: relative;
  z-index: 10;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.statusbar {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border);
  background: var(--panel);
  font-size: 12.5px;
  flex-shrink: 0;
}
.statusbar .host {
  font-family: var(--display);
  font-weight: 700;
}
.statusbar .sep {
  opacity: 0.6;
}
.spacer {
  flex: 1;
}
.clock {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5px;
}
.chip {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--phosphor);
  background: transparent;
  border: 1px solid var(--border-bright);
  border-radius: 2px;
  padding: 2px 9px;
  cursor: pointer;
}
.chip:hover {
  box-shadow: var(--glow);
}

.body {
  flex: 1;
  display: flex;
  min-height: 0;
}

/* ---- rail ---- */
.rail {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: var(--panel);
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
}
.rail-head {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
}
.rail ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.rail-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  color: var(--fg-dim);
  font-family: var(--display);
  font-size: 14px;
}
.rail-link:hover {
  color: var(--fg);
  background: var(--panel-2);
}
.rail-link.router-link-exact-active {
  color: var(--phosphor);
  border-color: var(--border-bright);
  background: var(--panel-2);
  text-shadow: var(--glow);
}
.rail-link .key {
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  font-size: 10px;
  color: var(--fg-faint);
  border: 1px solid var(--border);
  border-radius: 2px;
}
.rail-link.router-link-exact-active .key {
  color: var(--phosphor);
  border-color: var(--phosphor);
}
.cmdname {
  flex: 1;
}
.ct {
  font-size: 11px;
  color: var(--fg-faint);
  font-family: var(--mono);
}
.rail-foot {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed var(--border);
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}
.copy {
  margin-top: 6px;
  font-size: 11px;
}

.rail-toggle {
  display: none;
}

/* ---- screen ---- */
.screen {
  flex: 1;
  overflow-y: auto;
  padding: 30px 40px 50px;
}

/* ---- prompt bar ---- */
.promptbar {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  background: var(--panel);
}
.response {
  font-size: 12.5px;
  padding: 6px 16px;
  border-bottom: 1px dashed var(--border);
  color: var(--fg-dim);
}
.response.err {
  color: var(--red);
}

/* suggestion chips */
.suggest {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  padding: 7px 16px;
  border-bottom: 1px dashed var(--border);
}
.suggest .hint {
  font-size: 10px;
  letter-spacing: 1px;
  margin-right: 2px;
}
.sug {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--fg-dim);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 1px 9px;
  cursor: pointer;
}
.sug:hover {
  color: var(--fg);
  border-color: var(--border-bright);
}
.sug.top {
  color: var(--phosphor);
  border-color: var(--border-bright);
}

.prompt {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
}
.ps1 {
  font-family: var(--display);
  font-size: 13px;
  white-space: nowrap;
}
.input-wrap {
  position: relative;
  flex: 1;
  display: flex;
}
/* ghost completion sits exactly under the input text */
.ghost {
  position: absolute;
  inset: 0;
  font-family: var(--mono);
  font-size: 14px;
  line-height: normal;
  color: var(--fg-faint);
  pointer-events: none;
  white-space: pre;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.ghost .g-typed {
  color: transparent;
}
.cmd-input {
  flex: 1;
  position: relative;
  background: transparent;
  border: none;
  outline: none;
  color: var(--fg);
  font-family: var(--mono);
  font-size: 14px;
  caret-color: var(--phosphor);
  padding: 0;
}
.cmd-input::placeholder {
  color: var(--fg-faint);
}

/* transitions */
.resp-enter-active,
.resp-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.resp-enter-from,
.resp-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
.boot-in-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.boot-in-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

/* ---- responsive ---- */
@media (max-width: 760px) {
  .rail {
    position: fixed;
    top: 38px;
    left: 0;
    bottom: 0;
    z-index: 40;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }
  .rail.open {
    transform: translateX(0);
  }
  .rail-toggle {
    display: grid;
    place-items: center;
    position: fixed;
    bottom: 64px;
    right: 16px;
    z-index: 45;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--phosphor);
    color: var(--bg);
    border: none;
    font-size: 22px;
    cursor: pointer;
    box-shadow: var(--glow);
  }
  .screen {
    padding: 20px 16px 40px;
  }
  .statusbar .path {
    display: none;
  }
}
</style>
