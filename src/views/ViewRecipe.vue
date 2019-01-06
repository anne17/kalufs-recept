<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col-2 d-none d-lg-block side-menu right">
        <div class="buttons">
          <button type="button" class="btn btn-default btn-sm" v-on:click="save" disabled>
            <i class="fas fa-save"></i>
            Spara
          </button>
        </div>

      </div> -->
      <div class="col-lg-12 col-md-12 col-sm-12 middle">

        <div class="recipe-view">
          <h1 class="errormsg" v-if="isError">Kan inte hitta receptet!</h1>

          <h2 v-html="recipe.title"></h2>
          <h3 v-if="recipe.ingredients">Ingredienser</h3>
          <p v-if="recipe.portions">För <span v-html="recipe.portions"></span> portioner</p>
          <p v-html="recipe.ingredients"></p>
          <h3 v-if="recipe.contents">Beskrivning</h3>
          <p v-html="recipe.contents"></p>
          <p><i v-if="recipe.source">Källa: </i> <span v-html="recipe.source"></span></p>
        </div>

      </div>

      <!-- <div class="col-3 d-none d-lg-block left">
      </div> -->

    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "ViewRecipe",
  data() {
    return {
      isError: false,
      recipe: {
        name: "",
        portions: 0,
        ingredients: "",
        contents: "",
        source: "",
        image: "",
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$backend + "view_recipe?title="+this.$route.params.title)
        .then(response => {
          if (response.data.status == "success") {
            this.recipe = response.data.data;
          } else {
            console.log(response.data);
          }
        })
        .catch(e => {
          console.log(e.response.data.message);
          this.isError = true;
        });
    },
    save() {
      console.log("pretending to save some data");
    }
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
.side-menu {
  padding: 22em 0.8em 22em 0.8em !important;
}

.side-menu button {
  margin-bottom: 1em;
}

.recipe-view {
  text-align: left;
}

.errormsg{
  color: red;
}

h2 {
  text-align: center;
}
</style>
