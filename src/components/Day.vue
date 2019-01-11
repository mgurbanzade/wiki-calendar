<template>
  <div class="day" :class="{today: todayClass, selected: isSelected}" @click="select">
    <div class="date">{{day}}</div>
  </div>
</template>

<script>
export default {
  name: "Day",
  props: {
    day: Number,
    currentElement: Number
  },
  data() {
    return {};
  },
  computed: {
    todayClass() {
      return this.day === new Date().getDate();
    },
    isSelected() {
      return this.currentElement === this.day;
    }
  },
  methods: {
    select() {
      return this.$emit("daySelected", this.day);
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
  color: #fff;
  background-image: linear-gradient(
    -270deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.2)
  );

  &:hover {
    cursor: pointer;
    z-index: 1;
    background-image: linear-gradient(
      -270deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.3)
    );
    background-size: 400%;
    animation: bab 3s ease infinite;
  }

  &.today {
    font-weight: 700;
    color: lighten(#000, 40%);
    background-color: rgba(255, 255, 255, 0.7);
  }

  &.selected {
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 1vw;
      height: 1vw;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}

.date {
  font-family: "Avenir", helvetica, sans-serif;
  font-size: 2.1vw;
  line-height: 2.1vw;
}

@keyframes bab {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
