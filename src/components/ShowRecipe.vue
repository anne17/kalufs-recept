<template>
  <div class="show-recipe">
    <h2 class="errormsg" v-if="isError">Kan inte hitta receptet!</h2>

    <div class="theRecipe" v-if="!isError">
      <div class="img-container" v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe) + ')' }">
        <img class="default-img" v-if="!recipe.image" :src="$defaultimg">
      </div>

      <h2 v-html="recipe.title" class="recipe-title"></h2>

      <div v-if="showEditOption" class="mini-edit-menu">
        <router-link :to="{ name: 'edit', params: {title: recipe.title}}" title="redigera" v-if="recipe.title">
          <i class="fas fa-pencil-alt"></i>
        </router-link>
      </div>

      <div class="ingredients">
        <div class="small-header" v-if="recipe.ingredients">Ingredienser</div>
        <p v-if="recipe.portions_text" class="portions">
          för <span v-html="recipe.portions_text"></span>{{ recipe.portions == 1 ? " portion" : " portioner" }}
        </p>
        <p v-html="recipe.ingredients"></p>
      </div>

      <div class="contents" v-if="recipe.contents">
        <div class="small-header">Gör så här</div>
        <p v-html="recipe.contents"></p>
      </div>

      <p v-if="recipe.tags" class="recipe-tags">
        <span>Taggar: </span>
        <span class="tag-dark" v-for="tag in recipe.tags" :key="tag.id">{{ tag }}</span>
      </p>

      <p v-if="recipe.source" class="recipe-source">
        <span>Källa: </span>
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
      portions_text: "",
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
  float: right;
}
.mini-edit-menu a {
  color: inherit;
  float: right;
}
.mini-edit-menu i:hover {
  color: black;
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

h2 {
  font-size: 1.4em;
  text-align: center;
  padding-top: 0.5em;
  margin: 0;
}

.small-header {
  font-weight: 600;
  padding-bottom: 0.2em;
  padding-top: 0.2em;
}

.recipe-title {
  margin-bottom: 0.8em;
}

.portions {
  filter: brightness(150%);
  font-size: 0.8em;
}

.ingredients,
.contents {
  padding: 0.3em;
  /* box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2); */
}

.contents >>> li {
  margin: 0.5em 0;
}

.recipe-tags,
.recipe-source {
  font-size: 0.8em;
}
</style>
