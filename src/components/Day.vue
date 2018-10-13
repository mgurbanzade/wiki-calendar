<template>
  <div class="day" :class="'day-' + day">
    <div class="date" :class="todayClass">{{day}}</div>
  </div>
</template>

<script>
export default {
  name: "Day",
  props: {
    day: Number
  },
  computed: {
    todayClass() {
      return this.day === new Date().getDate() ? 'today' : ''
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
    color: #777;

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
</style>
