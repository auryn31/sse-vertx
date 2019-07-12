<template>
  <div class="cars">
    <h1>{{ msg }}</h1>
    <div id="example">
      <v-btn color="info" v-on:click="loadcars">{{loading_text}}</v-btn>
    </div>
    <div class="carlistcontainer">
      <v-list id="carlist">
        <template v-for="car in carsSse">
            <v-list-tile v-bind:key="car.id">
              <v-list-tile-content>
                <v-list-tile-title>{{car.model}}</v-list-tile-title>
                <v-list-tile-sub-title>{{car.company}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
      </v-list>
    </div>
  </div>
</template>
<style lang="scss" src="./cars.scss" scoped></style>
