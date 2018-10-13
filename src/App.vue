<template>
  <div id="app">
    <div class="days">
      <day v-for="day in daysCount" :day="day"/>
    </div>
  </div>
</template>

<script>
  import Day from './components/Day';

  export default {
    name: "app",
    data() {
      return {

      }
    },
    computed: {
      daysCount() {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      }
    },
    components: { Day }
  };
</script>

<style lang="scss">
  body {
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  .days {
    display: flex;
    flex-wrap: wrap;
  }
</style>
