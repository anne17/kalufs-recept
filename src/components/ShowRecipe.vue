<template>
  <div class="show-recipe">
    <h2 class="errormsg" v-if="isError">Kan inte hitta receptet!</h2>

    <div class="theRecipe" v-if="!isError">
      <div class="img-container" v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe) + ')' }">
        <img class="default-img" v-if="!recipe.image" :src="$defaultimg">
      </div>

      <h1 v-html="recipe.title"></h1>
      <div v-if="showEditOption" class="mini-edit-menu">
        <router-link :to="{ name: 'edit', params: {title: recipe.title}}" title="redigera" v-if="recipe.title">
          <i class="fas fa-pencil-alt"></i>
        </router-link>
      </div>

      <h3 v-if="recipe.ingredients">Ingredienser</h3>
      <p v-if="recipe.portions">För <span v-html="recipe.portions"></span> portioner</p>
      <p v-html="recipe.ingredients"></p>
      <h3 v-if="recipe.contents">Gör så här</h3>
      <p v-html="recipe.contents"></p>
      <p><i v-if="recipe.source">Källa: </i> <a :href="recipe.source" target="_blank">{{ recipe.source }}</a></p>
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
    getImgUrl: function(recipe_data) {
      if (recipe_data.image !== undefined && recipe_data.image !== "") {
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
.show-recipe {
  text-align: left;
}

.mini-edit-menu {
  margin: 0.6em 0 0 0;
  padding: 0 0.6em 0 0;
}
.mini-edit-menu i {
  float: right;
  font-size: 1.2rem;
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
  font-size: 1.8rem;
}

h3 {
  font-size: 1.5rem;
}
</style>
