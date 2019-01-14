
<template>
  <div class="recipies container">
    <div class="row">
      <div class="col-2 d-none d-lg-block left">

        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Sök" disabled>
        </div>

      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 middle">
        <h1>
            Mina recept
        </h1>
        <div class="new-recipe-container">
          <router-link class="new-recipe" :to="{ name: 'edit', params: {title: 'New'}}">
            <strong>&plus;</strong> Nytt recept
          </router-link>
        </div>
        <RecipiesList/>
      </div>
      <!-- <div class="col-2 d-none d-lg-block right">
      </div> -->
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
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
* {
  box-sizing: border-box;
}

.new-recipe-container {
  text-align: right;
  padding-right: 0.2em;
}
.new-recipe {
  cursor: pointer;
  text-decoration: none;
  color: unset;
}
.new-recipe:hover {
  color: black;
}
</style>
