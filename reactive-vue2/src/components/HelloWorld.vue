<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ dateString }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Timeloader from '../timeloader';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  get dateString() {
    return this.$store.state.date;
  }

  mounted() {
    Timeloader.loadTime();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
