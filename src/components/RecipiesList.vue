<template>
<div id="recipe-data" class="recipe-list">
    <h1>
        Mina recept
    </h1>
  <ul class="main-list">
    <li class="main-entry container" v-for="recipe in results" :key="recipe.id">
      <div class="row">
          <div class="main-img-container col-3" v-on:click="openLink(pdfaddress+recipe.pdf)" v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe) + ')' }">
          </div>
          <div class="text-container col-9">
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

<!-- ####################################################################### -->
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
      this.defaultimg = this.$backend + "img/default_recipe.png";
    });
  },
  methods: {
    openLink: function(url) {
      window.location.href = url;
    },
    getImgUrl: function(recipe_data) {
      if (recipe_data.img !== undefined) {
        return this.imgaddress + recipe_data.img;
      } else {
        return this.defaultimg;
      }
    }
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
h1 {
  font-size: 2.6rem;
}

.main-list {
  padding-left: 0pt;
  margin-left: 0pt;
}

.row {
  display: flex;
  flex-wrap: nowrap;
  height: 100px;
}

.main-entry {
  font-size: 1.8rem;
  list-style-type: none;
  margin-top: 0.5em;
  max-width: 50em;
}

.main-entry a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}

.main-entry > div {
  clear: left;
  background: #a5c3f2;
  border-right: 1px solid #a5c3f2;
  border-radius: 15px;
}

.tags-container {
  /*      top right bottom left */
  margin: 0.3em 0em 0em 0.3em;
  text-align: left;
}

.tag {
  margin-right: 0.3em;
  padding: 0em 0.3em 0em 0.3em;
  font-size: 1.3rem;
  border-style: solid;
  border-color: #fff586;
  border-radius: 15px;
  background: #fff586;
}

.main-img-container {
  float: left;
  height: 100%;
  width: 20%;
  position: relative;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.text-container {
  float: left;
  margin: 0.3em 0em 0em 0.6em;
  text-align: left;
}

.text-container > a:hover {
  text-decoration: underline;
}
</style>
