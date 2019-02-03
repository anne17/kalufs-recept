<template>
  <div class="edit container">

    <popover name="urlTooltip" class="url-popover">
      <span>Jag kan automatiskt extrahera recept från:</span>
      <ul>
        <li v-for="page in parsablePages" :key="page.id">
          <a v-bind:href="page.address">
            {{ page.name }}
          </a>
        </li>
      </ul>
    </popover>

    <div class="loading-spinner" v-if="loading">
      <img src="../assets/loading_spinner.gif"/>
    </div>


    <div class="row">

      <div class="col-2 d-none d-lg-block side-menu">
      </div>

      <div class="col-lg-8 col-md-8 col-sm-12 middle editor">
        <h1 class="edit-title">
            {{ heading.text }} <span class="recipe-title" v-if="heading.title">"{{heading.title}}"</span>
        </h1>

        <div class="form-group row">
          <label class="col-sm-2 col-form-label">
            Hämta från URL
            <span class="url-tooltip" v-popover:urlTooltip>
              <i class="far fa-question-circle"></i>
            </span>
          </label>
          <div class="input-group col-sm-10">
            <input class="form-control" v-bind:class="{ 'is-invalid': urlError }" type="text" id="url" v-model="url" placeholder="Adress till receptet" aria-describedby="url_search" v-on:change="validateUrl">
            <div class="input-group-prepend">
              <span class="input-group-text" id="url_search" @click="sendUrl">Fyll i recept</span>
            </div>
            <div class="invalid-feedback">
              {{ urlErrorMessage }}
            </div>
          </div>
        </div>
        <hr>

        <div class="form-group row">
          <label for="title" class="col-sm-2 col-form-label">*Receptnamn</label>
          <div class="col-sm-10">
            <input class="form-control" v-bind:class="{ 'is-invalid': titleError }" type="text" id="title" v-model="form.title" v-on:change="validateTitle" required>
            <div class="invalid-feedback">
              Du måste ange ett receptnamn!
            </div>
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
            <textarea class="form-control" rows="8" placeholder="* [Skriv i markdown-formatet]" id="ingredients" v-model="form.ingredients"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="contents" class="col-sm-2 col-form-label">Beskrivning</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="10" placeholder="1. [Skriv i markdown-formatet]" id="contents" v-model="form.contents"></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="image" class="col-sm-2 col-form-label">Bild</label>
          <div class="col-sm-10">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="image" ref="image" accept="image/*" v-on:change="handleFileUpload()">
              <label class="custom-file-label" for="image">{{ fileBrowseLabel }}</label>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="source" class="col-sm-2 col-form-label">Källa</label>
          <div class="col-sm-10">
            <input class="form-control" type="url" placeholder="https://example.com" id="source" v-model="form.source">
          </div>
        </div>

        <div class="row">
          <div class="col-sm-2"></div>
          <div class="buttons col-sm-10">
            <button type="button" class="btn btn-primary btn-sm" v-on:click="getPreview">
              <i class="far fa-eye"></i>
              Granska
            </button>

            <button type="button" class="btn btn-success btn-sm" v-on:click="save" disabled>
              <i class="fas fa-save"></i>
              Spara
            </button>

            <button type="button" class="btn btn-danger btn-sm button-danger-secondary" v-on:click="remove" disabled>
              <i class="fas fa-trash-alt"></i>
              Ta bort
            </button>
          </div>
        </div>

      </div>

      <div class="col-2 d-none d-lg-block right">
        <MarkdownHelp/>
      </div>

    </div>

    <div id="previewWindow" v-if="previewActive" ref="previewWindow">
      <hr>
      <h1>Förhandsvisning</h1>

      <ShowRecipe :recipe="preview" :isError="isError"></ShowRecipe>

      <div class="row">
        <div class="buttons">
          <button type="button" class="btn btn-success btn-sm" v-on:click="save" disabled>
            <i class="fas fa-save"></i>
            Spara
          </button>

          <button type="button" class="btn btn-danger btn-sm button-danger-secondary" v-on:click="remove" disabled>
            <i class="fas fa-trash-alt"></i>
            Ta bort
          </button>
        </div>
      </div>

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
      loading: false,
      isError: false,
      titleError: false,
      urlError: false,
      urlErrorMessageDef: "Det här är inte en giltig adress!",
      urlErrorMessage: "",
      parsablePages: [],
      fileBrowseLabel: "Välj fil...",
      previewActive: false,
      preview: Object,
      heading: {
        text: "Nytt recept",
        title: ""
      },
      url: "",
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
    this.get_parsable_pages();
  },
  methods: {
    get_parsable_pages() {
      axios
        .get(this.$backend + "get_parsers")
        .then(response => {
          if (response.data.status == "success") {
            this.parsablePages = response.data.data;
          } else {
            console.error(response.data.message);
          }
        })
        .catch(e => {
          console.error(e.response.data);
        });
    },
    sendUrl() {
      if (this.validateUrl()) {
        this.loading = true;
        axios
          .get(this.$backend + "parse_from_url?url=" + this.url)
          .then(response => {
            this.loading = false;
            if (response.data.status == "success") {
              this.data = response.data.data;
              // Update form
              for (var key in this.data) {
                if (this.form.hasOwnProperty(key)) {
                  this.form[key] = this.data[key];
                }
              }
            } else {
              this.loading = false;
              console.error(response.data);
            }
          })
          .catch(e => {
            this.message = e.response.data.message;
            if (this.message.startsWith("Invalid URL")) {
              this.urlErrorMessage = this.urlErrorMessageDef;
              this.urlError = true;
            } else if (this.message.startsWith("No parser found")) {
              this.urlErrorMessage =
                "Adressen från den här sidan kan inte hanteras än :(";
              this.urlError = true;
            } else {
              this.urlErrorMessage = "Någonting blev fel :(";
              this.urlError = true;
            }
            console.error(this.message);
          });
      }
    },
    getPreview() {
      this.valid = this.validateForm();
      if (this.valid) {
        axios
          .post(this.$backend + "preview_data", this.form)
          .then(response => {
            if (response.data.status == "success") {
              this.previewActive = true;
              this.preview = response.data.data;
              this.$nextTick(() => this.$refs.previewWindow.scrollIntoView());
            } else {
              console.error(response.data);
              this.previewActive = false;
            }
          })
          .catch(error => {
            console.error(error);
            this.previewActive = false;
          });
      }
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
            console.error(response.data);
          }
        })
        .catch(e => {
          console.error(e.response.data);
          this.isError = true;
        });
    },
    handleFileUpload() {
      this.form.image = this.$refs.image.files[0];
      // Replace the "Choose a file" label
      this.fileBrowseLabel = this.form.image.name;
    },
    validateUrl() {
      if (this.url == "") {
        this.urlErrorMessage = this.urlErrorMessageDef;
        this.urlError = true;
        return false;
      }
      this.urlError = false;
      return true;
    },
    validateTitle() {
      if (this.form.title == "") {
        this.titleError = true;
        return false;
      }
      this.titleError = false;
      return true;
    },
    validateForm() {
      if (!this.validateTitle()) {
        return false;
      }
      return true;
    },
    save() {
      this.loading = true;
      axios
        .get(this.$backend + "save_pretend")
        .then(response => {
          this.loading = false;
          if (response.data.status == "success") {
            // console.log("Pretended to save some data!");
          } else {
            console.error(response.data.message);
          }
        })
        .catch(e => {
          this.loading = false;
          console.error(e.response.data);
        });
    },
    remove() {}
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
.url-popover ul {
  text-align: left;
}

.loading-spinner {
  width: 8vw;
  z-index: 20000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-spinner img {
  width: 8vw;
}

.side-menu {
  padding: 22em 0.8em 22em 0.8em !important;
}

.edit-title {
  margin-top: 0.6em;
  margin-bottom: 0.8em;
}

.recipe-title {
  font-style: italic;
}

.url-tooltip {
  cursor: pointer;
}

#url_search {
  height: calc(2.25rem + 2px);
  cursor: pointer;
}

label {
  float: left;
}

input,
textarea {
  color: #28292b;
}

#ingredients,
#contents {
  font-family: var(--monofont);
  font-weight: lighter;
}

#previewWindow .recipe-view {
  text-align: left;
}

#previewWindow hr {
  margin: 0;
}

#previewWindow h1 {
  padding-bottom: 0.8em;
}

.buttons {
  margin-left: auto;
  margin-right: auto;
}

button {
  margin: 1em;
}

.right {
  padding-top: 20vh;
  padding-right: 0;
}
</style>
