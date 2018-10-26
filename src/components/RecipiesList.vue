<template>
<div id="recipe-data" class="recipe-list">
    <h1>
        Mina recept
    </h1>
  <ul class="main-list">
    <li class="main-entry container" v-for="recipe in results" :key="recipe.id">
      <div class="row">
          <div class="main-img-container col-3" v-bind:style="{ backgroundImage: 'url(' + imgaddress+recipe.img + ')' }">
              <a v-bind:href="pdfaddress+recipe.pdf">
                  <!-- <img class="main-img img-responsive" v-bind:src="imgaddress+recipe.img"> -->
              </a>
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
    });
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
  /* align-items: stretch; */
  /* align-content: stretch; */
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
  background: #86b3f9;
  border-right: 1px solid #86b3f9;
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
  border-color: #f4e541;
  border-radius: 15px;
  background: #f4e541;
}

.main-img-container {
  float: left;
  height: 100%;
  width: 20%;
  /* background: #c9c9c9; */
  position: relative;
  background-size: cover;
  background-position: center;
}

.main-img {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  max-height: 100%;
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
