<template>
  <div id="app" :style="{ backgroundImage: bgPhoto }">
    <current-time></current-time>
    <div class="days" :style="{ pointerEvents: pointerEvents }">
      <day v-for="day in daysCount"
           :day="day"
           :currentElement="currentElement"
           @daySelected="handleSelectedDay"/>
    </div>
  </div>
</template>

<script>
  import Day from './components/Day'
  import CurrentTime from './components/CurrentTime'

  export default {
    name: "app",
    data() {
      return {
        bgPhoto: '',
        pointerEvents: 'auto',
        currentElement: new Date().getDate()
      }
    },
    computed: {
      daysCount() {
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      },
    },
    methods: {
      handleSelectedDay(url, day) {
        this.currentElement = day;
        this.pointerEvents = 'none';
        this.bgPhoto = `url(${url})`;

        setTimeout(() => {
          this.pointerEvents = 'auto';
        }, 1500)
      }
    },
    components: { Day, CurrentTime },
    beforeMount() {
      let url = require('./assets/img-' + new Date().getDate() + '.jpg');
      this.bgPhoto = `url(${url})`;
    }
  };
</script>

<style lang="scss">
  body {
    margin: 0;

    $urls: url('./assets/img-1.jpg');

    @for $i from 1 through 31 {
      $urls: $urls + ', ' + url('./assets/img-#{$i}.jpg');

      @if $i == 31 {
        $urls: $urls + ';';
      }
    }

    &::before {
      content: '';
      background-image: $urls;
    }
  }

  #app {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 1.5s ease-out;
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
</style>
