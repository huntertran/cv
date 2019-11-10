<template>
  <div class="iframe_container">
    <iframe src="https://coding4food.net" class="stretched_iframe"></iframe>
  </div>
</template>

<script>
export default {
  name: "blog"
};
</script>

<style lang="scss" scoped>
.iframe_container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.stretched_iframe {
  flex-grow: 1;
  border: none;
  margin: 0;
  padding: 0;
}
</style>