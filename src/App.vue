<template>
  <div id="app" :style="{ backgroundImage: bgPhoto }">
    <div class="days">
      <day v-for="day in daysCount"
           :day="day"
           @daySelected="handleSelectedDay"/>
    </div>
  </div>
</template>

<script>
  import Day from './components/Day'

  export default {
    name: "app",
    data() {
      return {
        bgPhoto: ''
      }
    },
    computed: {
      daysCount() {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      },
    },
    methods: {
      handleSelectedDay(url) {
        this.bgPhoto = `url(${url})`;
      }
    },
    components: { Day },
    beforeMount() {
      let url = require('./assets/img-' + new Date().getDate() + '.jpg');
      this.bgPhoto = `url(${url})`;
    }
  };
</script>

<style lang="scss">
  body {
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 1.5s;
    background-image: linear-gradient(to right, #004e92, #000428);
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
</style>
