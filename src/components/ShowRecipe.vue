<template>
  <div class="show-recipe">
    <h2 class="errormsg" v-if="isError">Kan inte hitta receptet!</h2>

    <div class="theRecipe" v-if="!isError">
      <div class="img-container" v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe) + ')' }">
        <img class="default-img" v-if="!recipe.image" :src="$defaultimg">
      </div>

      <h1 v-html="recipe.title" class="recipe-title"></h1>
      <div v-if="showEditOption" class="mini-edit-menu">
        <router-link :to="{ name: 'edit', params: {title: recipe.title}}" title="redigera" v-if="recipe.title">
          <i class="fas fa-pencil-alt"></i>
        </router-link>
      </div>

      <div class="ingredients">
        <h4 v-if="recipe.ingredients">Ingredienser</h4>
        <p v-if="recipe.portions" class="portions">för <span v-html="recipe.portions"></span> portioner</p>
        <p v-html="recipe.ingredients"></p>
      </div>

      <div class="contents">
        <h4 v-if="recipe.contents">Gör så här</h4>
        <p v-html="recipe.contents"></p>
      </div>

      <p v-if="recipe.source" class="recipe-source">
        <span >Källa: </span>
        <a v-if="isUrl(recipe.source)" class="dont-break-out" :href="recipe.source" target="_blank">{{ recipe.source }}</a>
        <span v-if="!isUrl(recipe.source)">{{ recipe.source }}</span>
      </p>
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
export default {
  name: "ShowRecipe",
  props: {
    showEditOption: Boolean,
    isError: Boolean,
    recipe: {
      title: "",
      portions: 0,
      ingredients: "",
      contents: "",
      source: "",
      image: ""
    }
  },
  methods: {
    getImgUrl(recipe_data) {
      if (recipe_data.image !== undefined && recipe_data.image !== "") {
        return this.$backend + recipe_data.image;
      } else {
        return "";
      }
    },
    isUrl(s) {
      this.regexp = /^(?:https?:\/\/)?(?:[\w.]+\.)?(\w+\.\w+)(?:\/|$)/;
      return this.regexp.test(s);
    }
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
.show-recipe {
  text-align: left;
  font-size: 1.3rem;
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

.mini-edit-menu a {
  color: inherit;
}

.img-container {
  display: flex;
  height: 40vh;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  align-items: center;
}

.default-img {
  margin-right: auto;
  margin-left: auto;
}
.errormsg {
  color: red;
  text-align: center;
  margin-top: 1em;
}

h1 {
  text-align: center;
}

h4 {
  font-weight: bold;
}

.recipe-title {
  margin-bottom: 0.8em;
}

.portions {
  font-size: 0.9em;
  padding-left: 0.2em;
}

.contents {
  padding-top: 0.3em;
}

.recipe-source {
  font-size: 0.8em;
}
</style>
