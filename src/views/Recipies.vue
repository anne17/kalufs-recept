
<template>
  <div class="recipies container">
    <div class="row">
      <div class="col-2 d-none d-lg-block right">

        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Sök" disabled>
        </div>

      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 middle">
        <RecipiesList/>
      </div>
      <div class="col-2 d-none d-lg-block left">
        <router-link class="new-recipe" :to="{ name: 'edit', params: {title: 'New'}}">
          <i class="fas fa-plus"></i>
          Nytt recept
        </router-link>
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
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
* {
  box-sizing: border-box;
}

.new-recipe {
  cursor: pointer;
  text-decoration: none;
  color: unset;
}
.new-recipe:hover {
  color: black;
}

.right,
.left {
  padding-top: 1.5em;
}
</style>
