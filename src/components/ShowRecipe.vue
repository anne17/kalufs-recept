<template>
  <div class="show-recipe">
    <h1 class="errormsg" v-if="isError">Kan inte hitta receptet!</h1>

    <div class="img-container">
      <img class="main-img" :src="getImgUrl(recipe)"></img>
    </div>

    <h2 v-html="recipe.title"></h2>
    <h3 v-if="recipe.ingredients">Ingredienser</h3>
    <p v-if="recipe.portions">För <span v-html="recipe.portions"></span> portioner</p>
    <p v-html="recipe.ingredients"></p>
    <h3 v-if="recipe.contents">Gör så här</h3>
    <p v-html="recipe.contents"></p>
    <p><i v-if="recipe.source">Källa: </i> <span v-html="recipe.source"></span></p>
  </div>

</template>

<!-- ####################################################################### -->
<script>
export default {
  name: "ShowRecipe",
  props: {
    isError: 0,
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
        return this.$defaultimg;
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

.img-container {
  display: flex;
  max-height: 50%;
}

.main-img {
  margin-right: auto;
  margin-left: auto;
}

.errormsg {
  color: red;
}

h2 {
  text-align: center;
}

h3 {
  font-size: 1.5rem;
}
</style>
