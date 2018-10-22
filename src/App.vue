<template>
  <div id="app" :style="{ backgroundImage: bgPhoto }">
    <div class="facts">
      <transition name="slide" mode="out-in">
        <div class="fact" :key="facts">{{ facts }}</div>
      </transition>
    </div>
    <div class="days" :style="{ pointerEvents: pointerEvents }">
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
      bgPhoto: "",
      pointerEvents: "auto",
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
    handleSelectedDay(url, day) {
      this.currentElement = day;
      this.pointerEvents = "none";
      this.bgPhoto = `url(${url})`;

      setTimeout(() => {
        this.pointerEvents = "auto";
      }, 1500);

      this.appendFact(day);
    },
    appendFact(day) {
      let month = new Date().getMonth() + 1;
      axios
        .get(`http://numbersapi.com/${month}/${day}/date`)
        .then(response => (this.facts = response.data));
    }
  },
  components: { Day, CurrentTime },
  beforeMount() {
    let url = require("./assets/img-" + new Date().getDate() + ".jpg");
    this.bgPhoto = `url(${url})`;
    this.appendFact(new Date().getDate());
  }
};
</script>

<style lang="scss">
body {
  margin: 0;

  $urls: url("./assets/img-1.jpg");

  @for $i from 1 through 31 {
    $urls: $urls + ", " + url("./assets/img-#{$i}.jpg");

    @if $i == 31 {
      $urls: $urls + ";";
    }
  }

  &::before {
    content: "";
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
  height: 2vw;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-enter-active {
  transition: transform 0.5s;
}

.slide-leave-active {
  transition: transform 0.5s;
  transform: translateX(-100%);
}
</style>
