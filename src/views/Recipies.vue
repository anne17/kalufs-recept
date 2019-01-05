
<template>
  <div class="recipies container">
    <div class="row">
      <div class="col-2 d-none d-lg-block right">
        <p>Search bar</p>
        <p>Filter by category</p>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 middle">
        <RecipiesList/>
      </div>
      <div class="col-2 d-none d-lg-block left">
        <p id="new-recipe" @click="newRecipe">
          <i class="fas fa-plus"></i>
          Nytt recept
        </p>
      </div>
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
// @ is an alias to /src
import RecipiesList from "@/components/RecipiesList.vue";

export default {
  name: "recipies",
  components: {
    RecipiesList
  },
  methods: {
    newRecipe() {
      this.$router.push("edit");
    }
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
* {
  box-sizing: border-box;
}

#new-recipe {
  cursor: pointer;
}
</style>
