<template>
  <div class="recipies">
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
