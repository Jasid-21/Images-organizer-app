<template>
  <router-view/>
</template>

<style lang="scss">
@import '@/sass/variables';

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
  font-size: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text;
  background-color: $background;
}
</style>
