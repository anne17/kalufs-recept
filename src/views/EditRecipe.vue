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
        <h1 class="edit-title">
            {{ heading.text }} <span class="recipe-title" v-if="heading.title">"{{heading.title}}"</span>
        </h1>

        <div class="form-group row">
          <label for="title" class="col-sm-2 col-form-label">Receptnamn</label>
          <div class="col-sm-10">
            <input class="form-control" type="text" id="title" v-model="form.title" required>
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

      </div>

      <div class="col-3 d-none d-lg-block left">
        <MarkdownHelp/>
      </div>

    </div>

    <div id="preview-window" v-if="previewActive">
      <hr>
      <h1>Förhandsvisning</h1>
      <hr>
      <ShowRecipe :recipe="preview" :isError="isError"></ShowRecipe>
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import MarkdownHelp from "@/components/MarkdownHelp.vue";
import ShowRecipe from "@/components/ShowRecipe.vue";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "EditRecipe",
  components: {
    MarkdownHelp,
    ShowRecipe
  },
  data() {
    return {
      isError: false,
      previewActive: false,
      preview: Object,
      heading: {
        text: "Nytt recept",
        title: ""
      },
      form: {
        title: "Nytt recept",
        portions: 4,
        ingredients: "",
        contents: "",
        image: "",
        source: "",
        tags: ""
      }
    };
  },
  created() {
    if (this.$route.params.title !== "New") {
      this.getData();
    }
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
    getData() {
      axios
        .get(this.$backend + "get_recipe?title=" + this.$route.params.title)
        .then(response => {
          if (response.data.status == "success") {
            this.data = response.data.data;
            // Update form
            for (var key in this.data) {
              if (this.form.hasOwnProperty(key)) {
                this.form[key] = this.data[key];
              }
            }
            // Set heading
            this.heading.text = "Redigera ";
            this.heading.title = this.form.title;
          } else {
            console.log(response.data);
          }
        })
        .catch(e => {
          console.log(e.response.data);
          this.isError = true;
        });
    },
    handleFileUpload() {
      this.form.image = this.$refs.image.files[0];
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
.side-menu {
  padding: 22em 0.8em 22em 0.8em !important;
}

.side-menu button {
  margin-bottom: 1em;
}

.edit-title {
  margin-top: 0.6em;
  margin-bottom: 0.8em;
}

.recipe-title {
  font-style: italic;
}

label {
  float: left;
}

input,
textarea {
  color: #28292b;
}

#preview-window .recipe-view {
  text-align: left;
}
</style>
