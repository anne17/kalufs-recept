<template>
<div id="recipe-data" class="recipe-list">
    <h1>
        Mina recept
    </h1>
  <ul class="main-list">
    <li class="main-entry" v-for="recipe in results" :key="recipe.id">
      <div>
          <div class="main-img-container">
              <a v-bind:href="pdfaddress+recipe.pdf">
                  <img class="main-img" v-bind:src="imgaddress+recipe.img">
              </a>
          </div>
          <div class="text-container">
            <a v-bind:href="pdfaddress+recipe.pdf">{{ recipe.title }}</a>
            <div class="tags-container">
              <span class="tag" v-for="tag in recipe.tags" :key="tag.id"><a href="">{{ tag }}</a></span>
            </div>
          </div>
      </div>
    </li>
</ul>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecipiesList",
  data() {
    return {
      results: []
    };
  },
  mounted() {
    axios.get(this.$backend + "recipe-data").then(response => {
      this.results = response.data.recipies;
      this.pdfaddress = this.$backend + "pdf/";
      this.imgaddress = this.$backend + "img/";
    });
  }
};
</script>




<style scoped>
@media (min-width: 858px) {
  html {
    font-size: 15px;
  }
}

@media (min-width: 780px) {
  html {
    font-size: 14px;
  }
}

@media (min-width: 702px) {
  html {
    font-size: 13px;
  }
}

@media (min-width: 724px) {
  html {
    font-size: 12px;
  }
}

@media (max-width: 623px) {
  html {
    font-size: 11px;
  }
}

html,
body {
  margin: 5px;
  padding: 0;
  font-family: "Krub", sans-serif;
}

h1 {
  font-size: 2em;
  margin-bottom: 5px;
}

.recipe-list {
  margin-left: 2em;
}

.main-entry {
  font-size: 1.3em;
  list-style-type: none;
  line-height: 1.8;
  margin-bottom: 5px;
  margin-top: 10px;
}

.main-list {
  padding-left: 0pt;
}

.main-entry a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}

.main-entry > div {
  clear: left;
  height: 100px;
  width: 550px;
  background: #86b3f9;
  border-right: 1px solid #86b3f9;
  border-radius: 25px;
}

.tag {
  margin-right: 3px;
  padding: 0px 5px 0px 5px;
  font-size: 0.8em;
  border-style: solid;
  border-color: #f4e541;
  border-radius: 25px;
  background: #f4e541;
}

.tags-container {
  /*      top right bottom left */
  margin: 5px 0px 0px 5px;
}

.main-img-container {
  float: left;
  height: 100px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c9c9c9;
}

.main-img {
  display: block;
  margin: 0px auto 0px auto;
  height: 100%;
  max-width: 100%;
}

.text-container {
  float: left;
  margin: 5px 0px 0px 10px;
}

.text-container > a:hover {
  text-decoration: underline;
}
</style>
