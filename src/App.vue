<template>
  <div id="app" :style="{ backgroundImage: bg }">
    <div class="facts">
      <transition name="slide" mode="out-in">
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
      this.appendFact(day);
      this.bg = this.generateGradient();
    },
    appendFact(day) {
      let month = new Date().getMonth() + 1;
      axios
        .get(`http://numbersapi.com/${month}/${day}/date`)
        .then(response => (this.facts = response.data));
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
  components: { Day, CurrentTime },
  beforeMount() {
    this.appendFact(new Date().getDate());
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
  transition: background-image 1.5s ease-out;
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
}

.fact {
  line-height: 2vw;
  margin: auto;
}

.slide-enter {
  opacity: 1;
}

.slide-enter-active {
  transition: opacity 0.5s;
}

.slide-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>
