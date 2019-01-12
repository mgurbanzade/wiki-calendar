<template>
  <div class="day" :class="{today: todayClass, selected: isSelected, last: isLastDay}" @click="select">
    <div class="date">{{day}}</div>
  </div>
</template>

<script>
export default {
  name: "Day",
  props: {
    day: Number,
    currentElement: Number,
    isLastDay: Boolean
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
  width: calc(100% / 7);
  flex-basis: calc(100% / 7);
  height: calc(42vw / 5);
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  padding: 1.2vw;
  color: #fff;
  background-size: 101%;
  z-index: 10;
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

  &:nth-of-type(7),
  &:nth-of-type(14),
  &:nth-of-type(21),
  &:nth-of-type(28) {
    border-right: 1px solid #eee;
  }

  &.last {
    box-shadow: 1px 0 0 0 #eee;
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
