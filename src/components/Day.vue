<template>
  <div class="day" :class="`day-${day}`"
                   @click="select">
    <div class="date" :class="todayClass">{{day}}</div>
  </div>
</template>

<script>

export default {
  name: "Day",
  data() {
    return {
      selected: false,
      class: ''
    }
  },
  props: {
    day: Number
  },
  computed: {
    todayClass() {
      return this.day === new Date().getDate() ? 'today' : ''
    },
    photoUrl() {
      return require('../assets/img-' + this.day + '.jpg');
    }
  },
  methods: {
    select(event) {
      return this.$emit('daySelected', this.photoUrl)
    }
  }
};
</script>
<style scoped lang="scss">
  .days {
    display: flex;
  }

  .day {
    width: calc(100vw / 7 - 2px);
    height: calc(49vw / 5 - 2px);
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 1.2vw;
    transition: transform 0.5s;
    color: #fff;
    background-position: center;
    background-size: cover;
    background-clip: padding-box;

    &:hover {
      transform: scale(1.05);
      cursor: pointer;
      z-index: 1;
    }
  }

  .date {
    font-family: "Avenir", helvetica, sans-serif;
    font-size: 2.1vw;
    line-height: 2.1vw;

    &.today {
      font-weight: 700;
    }
  }

  // :style="{ backgroundImage: `url(${photoUrl})` }"
</style>
