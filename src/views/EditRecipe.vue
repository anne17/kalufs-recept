<template>
  <div class="edit">
    <div class="column side-menu">
      <div>
        <button type="button" class="btn btn-default btn-sm" v-on:click="getPreview">
          <i class="far fa-eye"></i>
          Granska
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
          <input class="form-control" type="text" placeholder="Mackor med ost" id="name" v-model="form.name">
        </div>
      </div>

      <div class="form-group row">
        <label for="portions" class="col-sm-2 col-form-label">Portioner</label>
        <div class="col-sm-2">
          <input class="form-control" type="number" value="4" id="portions" v-model="form.portions">
        </div>
      </div>

      <div class="form-group row">
        <label for="ingredients" class="col-sm-2 col-form-label">Ingredienser</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="10" placeholder="- ..." id="ingredients" v-model="form.ingredients"></textarea>
        </div>
      </div>

      <div class="form-group row">
        <label for="contents" class="col-sm-2 col-form-label">Beskrivning</label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="10" placeholder="..." id="contents" v-model="form.contents"></textarea>
        </div>
      </div>

      <!-- <div class="form-group row">
        <label for="source" class="col-sm-2 col-form-label">Bild</label>
        <div class="col-sm-10">
          <input type="file" id="file" class="custom-file-input">
          <span class="custom-file-control"></span>
        </div>
      </div> -->

      <div class="form-group row">
        <label for="source" class="col-sm-2 col-form-label">Källa</label>
        <div class="col-sm-10">
          <input class="form-control" type="url" placeholder="https://example.com" id="source" v-model="form.source">
        </div>
      </div>

      <div id="preview-window" v-if="previewActive">
        <hr>
        <h2>Förhandsvisning</h2>
        <hr>

        <div class="recipe-view">
          <h2 v-html="preview.name"></h2>
          <h3 v-if="preview.ingredients">Ingredienser</h3> <p>För <span v-html="preview.portions"></span> portioner</p>
          <p v-html="preview.ingredients"></p>
          <h3 v-if="preview.contents">Beskrivning</h3>
          <p v-html="preview.contents"></p>
          <p><i v-if="preview.source">Källa: </i> <span v-html="preview.source"></span></p>
        </div>

      </div>

    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "EditRecipe",
  data() {
    return {
      // loggedIn: false,
      // currentUser: "User",
      isError: false,
      previewActive: false,
      preview:{
        name: "",
        portions: 0,
        ingredients: "",
        contents: "",
        source: "",
      },
      form: {
        name: "",
        portions: 4,
        ingredients: "",
        contents: "",
        source: "",
      }
    };
  },
  // created() {
  //   this.checkLogin();
  // },
  methods: {
    getPreview() {
      let formData = this.packageData(this.form);
      axios
        .post(this.$backend + "preview_data", formData)
        .then(response => {
          if (response.data.status == "success") {
            this.previewActive = true;
            this.preview.name = response.data.data.name;
            this.preview.portions = response.data.data.portions;
            this.preview.ingredients = response.data.data.ingredients;
            this.preview.contents = response.data.data.contents;
            this.preview.source = response.data.data.source;
          } else {
            console.log(response.data);
            this.previewActive = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.previewActive = false;
        });
    },
    save() {
      console.log("pretending to save some data");
    },
    packageData(data) {
      const form = new FormData();
      for (const key in data) {
        form.append(key, data[key]);
      }
      return form;
    }
  }
};
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
  width: 60%;
}

label {
  float: left;
}

#preview-window .recipe-view {
  text-align: left;
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
