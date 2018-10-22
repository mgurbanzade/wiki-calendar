<template>
  <div class="date-row">
    <div>{{ showDate }}</div>
    <div>{{ showTime }}</div>
  </div>
</template>
<script>
  export default {
    name: 'current-time',
    data() {
      return {
        showDate: this.date(),
        showTime: this.time()
      }
    },
    methods: {
      date() {
        let d = new Date()
        let month = d.toLocaleString('en-us', { month: 'long' });
        let year = d.getFullYear()

        return `${month} ${year}`;
      },

      time() {
        setInterval(() => {
          let d = new Date()
          let hours = ('0' + d.getHours()).slice(-2);
          let minutes = ('0' + d.getMinutes()).slice(-2);
          let seconds = ('0' + d.getSeconds()).slice(-2);

          this.showTime = `${hours}:${minutes}:${seconds}`;
        }, 1000)
      }
    }
  }
</script>

<style lang="scss">
  .date-row {
    color: #fff;
    font-family: "Avenir", helvetica, sans-serif;
    font-size: 2.1vw;
    line-height: 2.1vw;
    padding: 1vw;
    display: flex;
    justify-content: space-between;
    margin-top: -9.5vw;
    z-index: 1;
    position: relative;
  }
</style>
