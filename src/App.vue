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
           :isLastDay="index + 1 === daysCount"
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
      facts: "Looking for facts...",
      interval: Object,
      receivedEvents: Array,
      currentEventIndex: 0,
      currentElement: new Date().getDate(),
      requestFailed: false
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
      this.requestFailed = false;
      axios
        .get(
          `https://cors.io/?https://history.muffinlabs.com/date/${month}/${day}?.json`
        )
        .then(response => {
          let events = response.data.data.Events;
          this.receivedEvents = events.map(event => event.text);
        })
        .catch(() => {
          this.facts = "The server does not want to share its data :(";
          this.requestFailed = true;
        });
    },
    appendFact() {
      this.facts =
        this.receivedEvents[this.currentEventIndex] || "Looking for facts...";

      setInterval(() => {
        this.facts =
          this.receivedEvents[this.currentEventIndex] || "Looking for facts...";
        if (this.currentEventIndex >= this.receivedEvents.length)
          this.currentEventIndex = 0;
        else this.currentEventIndex += 1;
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
    receivedEvents() {
      this.currentEventIndex = 0;

      if (!this.requestFailed) this.facts = "Looking for facts...";
    }
  },
  components: {
    Day,
    CurrentTime
  },
  beforeMount() {
    this.bg = this.generateGradient();
    this.getFacts(new Date().getDate());
  },
  mounted() {
    this.appendFact();
  }
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s;
  padding: 0.5vw;
  box-sizing: border-box;
}

.days {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.facts {
  height: max-content;
  min-height: 2vw;
  color: #fff;
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
  border-bottom: 1px solid #eee;
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
