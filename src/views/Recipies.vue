<template>
  <div class="recipies">
    <div class="row">
      <div class="column">
        <p>Search bar</p>
        <p>Filter by category</p>
      </div>
      <div class="column">
        <RecipiesList/>
      </div>
      <div class="column">
        <p>
          <a href="/edit">
            <i class="fas fa-plus"></i>
            Nytt recept
          </a>
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
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
* {
  box-sizing: border-box;
}
.recipies {
  margin-left: 0.2em;
  margin-right: 0.2em;
}

/* Create three unequal columns that float next to each other */
.column {
  float: left;
  padding: 0.8em;
  margin-bottom: 0.5em;
  margin-right: 0.2em;
  border-style: dotted;
  border-width: thin;
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

.row {
  margin: 0.2em;
}

/* Responsive layout - makes the three columns stack on top of each other
instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
