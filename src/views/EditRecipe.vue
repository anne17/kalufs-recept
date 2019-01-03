<template>
  <div class="edit">
    <div class="column side-menu">
      <div>
        <button type="button" class="btn btn-default btn-sm" v-on:click="preview">
          <i class="far fa-eye"></i>
          Preview
        </button>
      </div>
      <div>
        <button type="button" class="btn btn-default btn-sm" v-on:click="save">
          <i class="fas fa-save"></i>
          Spara
        </button>
      </div>

    </div>
    <div class="column editor">
      <h1>
          Nytt recept
      </h1>

      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Receptnamn</label>
        <div class="col-sm-10">
          <input class="form-control" type="text" placeholder="Mackor med ost" id="name">
        </div>
      </div>

      <div class="form-group row">
        <label for="ingredients" class="col-sm-2 col-form-label">Ingredienser</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="10" placeholder="- ..." id="ingredients"></textarea>
        </div>
      </div>

      <div class="form-group row">
        <label for="contents" class="col-sm-2 col-form-label">Beskrivning</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="10" placeholder="..." id="contents"></textarea>
        </div>
      </div>

      <div class="form-group row">
        <label for="source" class="col-sm-2 col-form-label">Bild</label>
        <div class="col-sm-10">
          <input type="file" id="file" class="custom-file-input">
          <span class="custom-file-control"></span>
        </div>
      </div>

      <div class="form-group row">
        <label for="source" class="col-sm-2 col-form-label">Källa</label>
        <div class="col-sm-10">
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

.side-menu button {
  margin-bottom: 1em;
}

h1 {
  font-size: 2.6rem;
  margin-bottom: 2rem;
}

.editor {
  /* max-width: 50em; */
  width: 60%;
}

label {
  float: left;
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

/* .row:after {
  content: "";
  display: table;
  clear: both;
} */

/* Responsive layout - makes the three columns stack on top of each other
instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
