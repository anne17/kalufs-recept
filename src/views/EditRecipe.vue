<template>
  <div class="edit">
    <div class="column">
    </div>
    <div class="column">
      <h1>
          Nytt recept
      </h1>

      <div class="form-group row">
        <label for="name" class="col-2 col-form-label">Receptnamn</label>
        <div class="col-10">
          <input class="form-control" type="text" placeholder="Mackor med ost" id="name">
        </div>
      </div>

      <div class="form-group row">
        <label for="ingredients" class="col-2 col-form-label">Ingredienser</label>
        <div class="col-10">
          <input class="form-control" type="text" placeholder="..." id="ingredients">
        </div>
      </div>

      <div class="form-group row">
        <label for="contents" class="col-2 col-form-label">Beskrivning</label>
        <div class="col-10">
          <input class="form-control" type="text" placeholder="..." id="contents">
        </div>
      </div>

      <div class="form-group row">
        <label for="source" class="col-2 col-form-label">Källa</label>
        <div class="col-10">
          <input class="form-control" type="url" placeholder="https://example.com" id="source">
        </div>
      </div>

    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
// @ is an alias to /src
// import RecipiesList from "@/components/RecipiesList.vue";
//
// export default {
//   name: "recipies",
//   components: {
//     RecipiesList
//   }
// };
</script>

<!-- ####################################################################### -->
<style scoped>
* {
  box-sizing: border-box;
}
.edit {
  margin-left: 0.2em;
  margin-right: 0.2em;
}

h1 {
  font-size: 2.6rem;
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
