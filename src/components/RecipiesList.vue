<template>
<div id="recipe-data" class="recipe-list">
    <h1>
        Mina recept
    </h1>
    <div class="main-entry container" v-for="recipe in results" :key="recipe.id">
      <div class="row">
          <div class="main-img-container col-3" v-on:click="openLink(recipe.title)" v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe) + ')' }">
            <img class="default-img" v-if="!recipe.image" :src="$defaultimg"></img>
          </div>
          <div class="text-container container col-9">
            <div class="row title">
              <router-link :to="{ name: 'view', params: {title: recipe.title}}">{{ recipe.title }}</router-link>
              <!-- <a v-bind:href="pdfaddress+recipe.pdf">{{ recipe.title }}</a> -->
            </div>
            <div class="tags-container row">
              <span class="tag" v-for="tag in recipe.tags" :key="tag.id"><a href="">{{ tag }}</a></span>
            </div>
          </div>
      </div>
    </div>
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
      this.results = response.data.data.recipies;
      // this.pdfaddress = this.$backend + "pdf/";
    });
  },
  methods: {
    openLink: function(title) {
      // window.location.href = url;
      this.$router.push({name: 'view', params: {title: title}})
    },
    getImgUrl: function(recipe_data) {
      if (recipe_data.image !== undefined) {
        return this.$imgaddress + recipe_data.image;
      } else {
        // return this.defaultimg;
        return "";
      }
    }
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
.main-list {
  padding-left: 0pt;
  margin-left: 0pt;
}

.row {
  margin-right: unset;
  margin-left: unset;
}

.main-entry {
  list-style-type: none;
  margin-top: 0.5em;
  padding: 0px;
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
  border-radius: 0 15px 15px 0;
}

.main-img-container {
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.default-img {
  max-height: 71px;
  max-width: 100%;
  margin: auto;
}

.text-container {
  margin: 0.4em 0em 0.5em 0em;
  text-align: left;
}

.title:hover {
  text-decoration: underline;
}

.tag {
  /*      top right bottom left */
  margin: 0.3em 0.3em 0.3em 0;
  padding: 0em 0.3em 0em 0.3em;
  font-size: 0.8rem;
  border-style: solid;
  border-color: #fff586;
  border-radius: 15px;
  background: #fff586;
  display: inline-block;
}
</style>
