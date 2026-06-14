<template>
  <section class="output blog">
    <div class="cmd-line">
      <span class="arg">curl -L huntertran.github.io/blog</span>
      <a href="https://huntertran.github.io/blog" target="_blank" rel="noopener" class="faint open-ext">[ open ↗ ]</a>
    </div>
    <iframe src="https://huntertran.github.io/blog" title="blog" class="frame"></iframe>
  </section>
</template>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 38px - 30px - 50px - 56px);
  min-height: 380px;
  margin-bottom: 0;
}
.open-ext {
  margin-left: auto;
}
.frame {
  flex: 1;
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: #fff;
}
</style>
