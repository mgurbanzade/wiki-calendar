<template>
  <div id="app" :style="{ backgroundImage: bg }">
    <div class="facts">
      <transition name="fade" mode="out-in">
        <div class="fact" :key="facts">{{ facts }}</div>
      </transition>
    </div>
    <div class="days">
      <day v-for="(day, index) in daysCount"
           :day="day"
           :key="index"
           :currentElement="currentElement"
           @daySelected="handleSelectedDay"/>
    </div>
    <current-time></current-time>
  </div>
</template>

<script>
import axios from "axios";
import Day from "./components/Day";
import CurrentTime from "./components/CurrentTime";

export default {
  name: "app",
  data() {
    return {
      bg: "",
      facts: "",
      interval: Object,
      currentElement: new Date().getDate()
    };
  },
  computed: {
    daysCount() {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    }
  },
  methods: {
    handleSelectedDay(day) {
      this.currentElement = day;
      this.getFacts(day);
      this.bg = this.generateGradient();
    },
    getFacts(day) {
      let month = new Date().getMonth() + 1;
      axios
        .get(
          `https://cors.io/?https://history.muffinlabs.com/date/${month}/${day}`
        )
        .then(response => {
          let events = response.data.data.Events;
          events = events.map(event => event.text);
          this.appendFact(events);
        });
    },
    appendFact(events) {
      let index = 0;
      this.facts = events[index];

      this.interval = setInterval(() => {
        index = index >= events.length ? 0 : index + 1;
        this.facts = events[index];
      }, 7000);
    },
    random() {
      return Math.floor(Math.random() * 255);
    },
    generateGradient() {
      let from = `rgb(${this.random()}, ${this.random()}, ${this.random()})`;
      let to = `rgb(${this.random()}, ${this.random()}, ${this.random()})`;

      return `linear-gradient(to right, ${from}, ${to})`;
    }
  },
  watch: {
    currentElement() {
      window.clearInterval(this.interval);
    }
  },
  components: {
    Day,
    CurrentTime
  },
  beforeMount() {
    this.getFacts(new Date().getDate());
    this.bg = this.generateGradient();
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s;
  padding-top: 0.5vw;
  box-sizing: border-box;
}

.days {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.facts {
  height: max-content;
  min-height: 2vw;
  color: #fff;
  margin: 0 calc(0.4vw + 1px);
  font-size: 1.2vw;
  font-family: "Avenir", sans-serif;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  position: relative;
  border: 1px solid #fff;
  border-bottom: 0;
  padding: 0 0.5vw;
  overflow: hidden;
  cursor: pointer;
  transition: height 0.5s;
}

.fact {
  line-height: 2vw;
  transition: height 0.5s;
  margin: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
