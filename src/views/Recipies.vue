<template>
  <div class="recipies">
    <img alt="Vue logo" src="../assets/logo.png">
    <RecipiesList/>
  </div>
</template>

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
