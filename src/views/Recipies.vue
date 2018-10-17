<template>
  <div class="recipies">
    <div class="row">
      <div class="column" style="border-style: dotted;">
        <p>Placeholder text</p>
      </div>
      <div class="column">
        <RecipiesList/>
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

/* Create three unequal columns that floats next to each other */
.column {
  float: left;
  padding: 10px;
}

.left {
  width: 30%;
}

.right {
  width: 70%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - makes the three columns stack on top of each other
instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
