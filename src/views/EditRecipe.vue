<template>
  <div class="edit container">
    <div class="row">
      <div class="col-2 d-none d-lg-block side-menu right">
        <div class="buttons">
          <button type="button" class="btn btn-default btn-sm" v-on:click="getPreview">
            <i class="far fa-eye"></i>
            Granska
          </button>
        </div>
        <div class="buttons">
          <button type="button" class="btn btn-default btn-sm" v-on:click="save" disabled>
            <i class="fas fa-save"></i>
            Spara
          </button>
        </div>
      </div>

      <div class="col-lg-7 col-md-8 col-sm-12 middle editor">
        <h1>
            Nytt recept
        </h1>

        <div class="form-group row">
          <label for="title" class="col-sm-2 col-form-label">Receptnamn</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" placeholder="Mackor med ost" id="title" v-model="form.title">
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

        <div class="form-group row">
          <label for="image" class="col-sm-2 col-form-label">Bild</label>
          <div class="col-sm-2">
            <input type="file" id="image" ref="image" accept="image/*" v-on:change="handleFileUpload()">
            <span class="custom-file-control"></span>
          </div>
        </div>

        <div class="form-group row">
          <label for="source" class="col-sm-2 col-form-label">Källa</label>
          <div class="col-sm-10">
            <input class="form-control" type="url" placeholder="https://example.com" id="source" v-model="form.source">
          </div>
        </div>

        <div id="preview-window" v-if="previewActive">
          <hr>
          <h1>Förhandsvisning</h1>
          <hr>

          <div class="recipe-view">

            <div class="img-container">
              <img class="main-img" :src="getImgUrl(preview)"></img>
            </div>

            <h2 v-html="preview.title"></h2>
            <h3 v-if="preview.ingredients">Ingredienser</h3> <p>För <span v-html="preview.portions"></span> portioner</p>
            <p v-html="preview.ingredients"></p>
            <h3 v-if="preview.contents">Beskrivning</h3>
            <p v-html="preview.contents"></p>
            <p><i v-if="preview.source">Källa: </i> <span v-html="preview.source"></span></p>
          </div>

        </div>

      </div>

      <div class="col-3 d-none d-lg-block left">
        <MarkdownHelp/>
      </div>

    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import MarkdownHelp from "@/components/MarkdownHelp.vue";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "EditRecipe",
  components: {
    MarkdownHelp
  },
  data() {
    return {
      isError: false,
      previewActive: false,
      preview: {
        title: "",
        portions: 0,
        ingredients: "",
        contents: "",
        image: "",
        source: ""
      },
      form: {
        title: "",
        portions: 4,
        ingredients: "",
        contents: "",
        image: "",
        source: ""
      }
    };
  },
  methods: {
    getPreview() {
      let formData = this.packageData(this.form);
      axios
        .post(this.$backend + "preview_data", formData)
        .then(response => {
          if (response.data.status == "success") {
            this.previewActive = true;
            this.preview = response.data.data;
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
    handleFileUpload() {
      this.form.image = this.$refs.image.files[0];
    },
    save() {
      console.log("pretending to save some data");
    },
    getImgUrl: function(recipe_data) {
      if (recipe_data.image !== undefined) {
        console.log(this.$tmpaddress + recipe_data.image);
        return this.$tmpaddress + recipe_data.image;
      } else {
        return this.$defaultimg;
      }
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
.side-menu {
  padding: 22em 0.8em 22em 0.8em !important;
}

.side-menu button {
  margin-bottom: 1em;
}

label {
  float: left;
}

#preview-window .recipe-view {
  text-align: left;
}
</style>
