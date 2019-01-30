<template>
<div id="recipe-data" class="recipe-list">
    <div class="main-entry container" v-for="recipe in results" :key="recipe.id">
      <div class="row">
          <div class="main-img-container col-3" v-on:click="openLink(recipe.title)" v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe) + ')' }">
            <img class="default-img" v-if="!recipe.image" :src="$defaultimg">
          </div>
          <div class="text-container container col-8">
            <div class="row title">
              <router-link :to="{ name: 'view', params: {title: recipe.title}}">{{ recipe.title }}</router-link>
            </div>
            <div class="tags-container row">
              <span class="tag" v-for="tag in recipe.tags" :key="tag.id">{{ tag }}</span>
            </div>
          </div>
          <div class="mini-edit-menu container col-1">
            <router-link :to="{ name: 'edit', params: {title: recipe.title}}" title="redigera">
              <i class="fas fa-pencil-alt"></i>
            </router-link>
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
    axios.get(this.$backend + "recipe_data").then(response => {
      this.results = response.data.data.recipies;
      // this.pdfaddress = this.$backend + "pdf/";
    });
  },
  methods: {
    openLink: function(title) {
      this.$router.push({ name: "view", params: { title: title } });
    },
    getImgUrl: function(recipe_data) {
      if (recipe_data.image !== undefined) {
        return this.$backend + recipe_data.image;
      } else {
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
  margin-bottom: 0.5em;
  padding: 0px;
}

.main-entry a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}

.main-entry > div {
  clear: left;
  background: var(--light-accent-color);
  border-right: 1px solid var(--light-accent-color);
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

.mini-edit-menu {
  margin: 0.6em 0 0 0;
  padding: 0 0.6em 0 0;
}
.mini-edit-menu i {
  float: right;
}
.mini-edit-menu i:hover {
  color: black;
}
</style>
