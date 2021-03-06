<template>
  <div class="edit container">
    <div v-if="tagChooserActive" class="overlay" @click="closeTagChooser()"></div>

    <ConfirmDialog
      v-if="showConfirm"
      :message="confirmDeleteMsg"
      @close="toggleConfirm"
      @confirm="remove"
      v-scroll-lock="showConfirm"
    />
    <ConfirmDialog
      v-if="showLeaveConfirm"
      :message="confirmLeaveMsg"
      :confirmButton="'Lämna'"
      :abortButton="'Stanna'"
      @close="
        next(false)
        showLeaveConfirm = false
      "
      @confirm="next()"
      v-scroll-lock="showLeaveConfirm"
    />
    <ConfirmDialog
      v-if="showOkSuggest"
      :message="okSuggestMsg"
      :showCancel="false"
      @close="$router.push('/')"
      @confirm="$router.push('/')"
      v-scroll-lock="showOkSuggest"
    />
    <DropdownDialog
      v-if="showDropdown"
      :tag="newTag"
      :categories="tagCategories"
      :defaultCat="tagCategories[0]"
      @close="closeDropdown"
      @confirm="addTag"
      v-scroll-lock="showDropdown"
    />
    <LoadingSpinner :loading="loading" />

    <popover name="urlTooltip" class="url-popover">
      <span>Jag kan automatiskt extrahera recept från:</span>
      <ul>
        <li v-for="page in parsablePages" :key="page.id">
          <a v-bind:href="page.address" target="_blank">
            {{ page.name }}
          </a>
        </li>
      </ul>
    </popover>

    <popover name="publishTooltip" class="publish-popover">
      <span>Recept som inte publiceras sparas som förslag.</span>
    </popover>

    <div class="row">
      <div class="col-2 d-none d-lg-block side-menu"></div>

      <div class="col-lg-8 col-md-8 col-sm-12 middle editor">
        <h1 class="edit-title">
          {{ heading.text }} <span class="recipe-title" v-if="heading.title">"{{ heading.title }}"</span>
        </h1>

        <div class="form-group row" ref="getRecipe">
          <label class="col-sm-2 col-form-label">
            Hämta från URL
            <span class="url-tooltip" v-popover:urlTooltip>
              <i class="far fa-question-circle"></i>
            </span>
          </label>
          <div class="input-group col-sm-10">
            <input
              class="form-control"
              v-bind:class="{ 'is-invalid': urlError }"
              type="text"
              id="url"
              v-model="url"
              placeholder="Adress till receptet"
              aria-describedby="url_search"
              @change="validateUrl()"
            />
            <div class="input-group-prepend">
              <span class="input-group-text" id="url_search" @click="sendUrl">
                Hämta recept
              </span>
            </div>
            <div class="invalid-feedback">
              {{ urlErrorMessage }}
            </div>
          </div>
        </div>
        <hr />

        <div class="form-group row">
          <label for="title" class="col-sm-2 col-form-label">
            *Receptnamn
          </label>
          <div class="col-sm-10">
            <input
              class="form-control"
              v-bind:class="{ 'is-invalid': titleError }"
              type="text"
              maxlength="100"
              id="title"
              ref="title"
              v-model="form.title"
              @change="validateTitle()"
              @input="modInput()"
              required="required"
              title=""
            />
            <div class="invalid-feedback">
              Du måste ange ett unikt receptnamn!
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="portions" class="col-sm-2 col-form-label">
            Portioner
          </label>
          <div class="col-sm-4">
            <input
              class="form-control"
              type="text"
              maxlength="100"
              id="portions"
              v-model="form.portions_text"
              @input="modInput()"
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="ingredients" class="col-sm-2 col-form-label">
            Ingredienser
          </label>
          <div class="col-sm-10">
            <textarea
              class="form-control"
              rows="8"
              placeholder="* [Skriv i markdown-format]"
              id="ingredients"
              v-model="form.ingredients"
              @input="modInput()"
              ref="ingredientsTextarea"
            ></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="contents" class="col-sm-2 col-form-label">
            Beskrivning
          </label>
          <div class="col-sm-10">
            <textarea
              class="form-control"
              rows="10"
              placeholder="1. [Skriv i markdown-format]"
              id="contents"
              v-model="form.contents"
              @input="modInput()"
            ></textarea>
          </div>
        </div>

        <div class="form-group row">
          <label for="image" class="col-sm-2 col-form-label">
            Bild
          </label>
          <div class="col-sm-10">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="image"
                ref="image"
                accept="image/*"
                title=""
                @change="
                  handleFileUpload()
                  modInput()
                "
              />
              <div v-if="hasImage" class="image-removal" @click="removeImage" title="Ta bort bild">
                <i class="far fa-trash-alt"></i>
              </div>
              <label class="custom-file-label" for="image">
                {{ fileBrowseLabel }}
              </label>
            </div>
          </div>
        </div>

        <div class="form-group row" v-if="!suggestion">
          <label for="tags" class="col-sm-2 col-form-label">
            Taggar
          </label>
          <div class="col-sm-10 tags" id="tags" :class="{ 'on-top': tagChooserActive }">
            <multiselect
              id="tagChooser"
              v-model="form.tags"
              :options="tagStructureSimple"
              :multiple="true"
              :taggable="true"
              :close-on-select="false"
              placeholder="Sök taggar eller skapa nya"
              selectLabel="Välj tagg"
              selectedLabel="Vald tagg"
              deselectLabel="Ta bort tagg"
              tag-placeholder="Lägg till tagg"
              group-values="tags"
              group-label="category"
              :group-select="false"
              @open="openTagChooser()"
              @close="closeTagChooser()"
              @tag="chooseCat"
              @change="modInput()"
            >
            </multiselect>
          </div>
        </div>

        <div class="form-group row" v-if="suggestion">
          <label for="tags-suggest" class="col-sm-2 col-form-label">
            Taggar
          </label>
          <div class="col-sm-10 tags" id="tags-suggest" :class="{ 'on-top': tagChooserActive }">
            <multiselect
              id="tagChooser"
              v-model="form.tags"
              :options="tagStructureSimple"
              :multiple="true"
              :close-on-select="false"
              placeholder="Sök taggar"
              selectLabel="Välj tagg"
              selectedLabel="Vald tagg"
              deselectLabel="Ta bort tagg"
              tag-placeholder="Lägg till tagg"
              group-values="tags"
              group-label="category"
              :group-select="false"
              @open="openTagChooser()"
              @close="closeTagChooser()"
              @change="modInput()"
            >
              <template slot="noResult">Inga taggar kunde hittas med det här namnet.</template>
            </multiselect>
          </div>
        </div>

        <div class="form-group row" ref="source">
          <label for="source" class="col-sm-2 col-form-label">
            Källa
          </label>
          <div class="col-sm-10">
            <input
              class="form-control"
              type="text"
              placeholder="https://example.com"
              id="source"
              v-model="form.source"
              @input="modInput()"
            />
          </div>
        </div>

        <div v-if="suggestion" class="form-group row">
          <label for="suggester" class="col-sm-2 col-form-label">
            *Ditt namn
          </label>
          <div class="col-sm-4">
            <input
              class="form-control"
              type="text"
              maxlength="100"
              placeholder="Johan Johansson"
              id="suggester"
              ref="suggester"
              v-model="form.suggester"
              required="required"
              @change="validateName()"
              @input="modInput()"
              v-bind:class="{ 'is-invalid': nameError }"
            />
            <div class="invalid-feedback">
              Du måste ange ditt namn!
            </div>
          </div>
        </div>

        <div v-if="form.suggester !== 'null' && !suggestion" class="form-group row">
          <label for="suggester" class="col-sm-2 col-form-label">
            Föreslagit av
          </label>
          <div class="col-sm-4">
            <input
              class="form-control"
              type="text"
              id="suggester"
              ref="suggester"
              v-model="form.suggester"
              @input="modInput()"
            />
          </div>
        </div>

        <div v-if="!suggestion" class="form-group row">
          <label class="col-sm-2 col-form-label">
            Publicera
            <span class="publish-tooltip" v-popover:publishTooltip>
              <i class="far fa-question-circle"></i>
            </span>
          </label>
          <div class="col-sm-1">
            <input
              class="form-control checkbox"
              type="checkbox"
              id="publish"
              ref="publish"
              v-model="form.published"
              required="required"
            />
          </div>
        </div>

        <div class="save-error" v-if="saveError" ref="saveErrorBox">
          <div calss="col-sm-12">
            {{ saveError }}
          </div>
        </div>

        <div class="row">
          <div class="col-sm-2"></div>
          <div class="buttons col-sm-10">
            <button type="button" class="btn btn-primary btn-sm" v-on:click="getPreview">
              <i class="far fa-eye"></i>
              Granska
            </button>

            <button
              v-if="edit_existing"
              type="button"
              class="btn btn-danger btn-sm button-danger-secondary"
              v-on:click="toggleConfirm"
            >
              <i class="fas fa-trash-alt"></i>
              Ta bort
            </button>
          </div>
        </div>
      </div>

      <div class="col-2 d-none d-lg-block right">
        <MarkdownHelp />
      </div>
    </div>

    <div id="previewWindow" v-if="previewActive" ref="previewWindow">
      <hr />
      <h1>Förhandsvisning</h1>

      <ShowRecipe :recipe="preview" :isError="isError" :preview="true"></ShowRecipe>

      <div class="row">
        <div class="buttons">
          <button v-if="!suggestion" type="button" class="btn btn-primary btn-sm" v-on:click="save(false)">
            <i class="fas fa-save"></i>
            Spara
          </button>

          <button v-if="suggestion" type="button" class="btn btn-primary btn-sm" v-on:click="save(true)">
            <i class="fas fa-envelope"></i>
            Skicka förslag
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import Multiselect from "vue-multiselect"

import MarkdownHelp from "@/components/MarkdownHelp.vue"
import ShowRecipe from "@/components/ShowRecipe.vue"
import ConfirmDialog from "@/components/ConfirmDialog.vue"
import DropdownDialog from "@/components/DropdownDialog.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { EventBus, axios, TagMixin, GetRecipeMixin } from "@/services.js"

export default {
  name: "EditRecipe",
  components: {
    Multiselect,
    MarkdownHelp,
    ShowRecipe,
    ConfirmDialog,
    DropdownDialog,
    LoadingSpinner
  },
  mixins: [TagMixin, GetRecipeMixin],
  data() {
    return {
      edit_existing: false,
      unsaved: false,
      suggestion: false,
      showOkSuggest: false,
      okSuggestMsg: "Tack! Ditt förslag har sparats och kommer att granskas av en kalufs-administratör!",
      showConfirm: false,
      showLeaveConfirm: false,
      confirmLeaveMsg: "Du har inte sparat än. Vill du verkligen lämna den här sidan?",
      tagChooserActive: false,
      showDropdown: false,
      newTag: "",
      confirmDeleteMsg: "Ta bort det här receptet?",
      loading: false,
      isError: false,
      titleError: false,
      urlError: false,
      urlErrorMessageDef: "Det här är inte en giltig adress!",
      urlErrorMessage: "",
      saveError: "",
      nameError: false,
      parsablePages: [],
      fileBrowseLabel: "Välj fil...",
      hasImage: false,
      previewActive: false,
      preview: Object,
      heading: {
        text: "Nytt recept",
        title: ""
      },
      url: "",
      form: {
        id: "",
        title: "Nytt recept",
        portions_text: "4 portioner",
        ingredients: "",
        contents: "",
        image: "",
        source: "",
        suggester: "",
        published: true,
        tags: [],
        tagsParents: {}
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.hash == "#confirmDelete") {
        this.showConfirm = true
      }
      if (from.hash == "#confirmDelete" && to.hash !== "#login") {
        this.showConfirm = false
      }
    }
  },
  created() {
    if (this.$route.params.url !== "New" && this.$route.params.url !== undefined) {
      this.getData()
      this.edit_existing = true
    } else {
      this.edit_existing = false
      // Set title
      document.title = this.$defaulttitle + " - " + this.heading.text
    }
    if (this.$router.currentRoute.name == "suggest") {
      this.suggestion = true
    } else {
      this.suggestion = false
    }
    this.get_parsable_pages()
    this.getTagStructureSimple()

    // Close tagChooser on esc
    document.onkeydown = evt => {
      evt = evt || window.event
      if (evt.keyCode == 27) {
        this.tagChooserActive = false
      }
    }
    // Insert asterisk when pressing enter in ingredients
    document.onkeyup = evt => {
      if (evt.keyCode == 13) {
        if (document.activeElement == this.$refs.ingredientsTextarea) {
          this.insertAtCursor(this.$refs.ingredientsTextarea, "* ")
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.unsaved) {
      this.showLeaveConfirm = true
      this.next = next
    } else {
      next()
    }
  },
  methods: {
    insertAtCursor(myField, myValue) {
      // https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
      // IE support
      if (document.selection) {
        myField.focus()
        let sel = document.selection.createRange()
        sel.text = myValue
      }
      // MOZILLA and others
      else if (myField.selectionStart || myField.selectionStart == 0) {
        var startPos = myField.selectionStart
        var endPos = myField.selectionEnd
        myField.value =
          myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)
        myField.selectionStart = startPos + myValue.length
        myField.selectionEnd = startPos + myValue.length
      } else {
        myField.value += myValue
      }
    },
    get_parsable_pages() {
      axios
        .get(this.$backend + "get_parsers")
        .then(response => {
          if (response.data.status == "success") {
            this.parsablePages = response.data.data
          } else {
            console.error("Message from backend:", response.data.message)
          }
        })
        .catch(e => {
          console.error("Response from backend:", e.response)
        })
    },
    sendUrl() {
      if (this.validateUrl()) {
        this.saveError = ""
        this.loading = true
        this.previewActive = false
        axios
          .get(this.$backend + "parse_from_url?url=" + this.url)
          .then(response => {
            this.loading = false
            if (response.data.status == "success") {
              this.data = response.data.data
              // Update form
              for (var key in this.data) {
                if (this.form.hasOwnProperty(key)) {
                  this.form[key] = this.data[key]
                }
              }
              this.validateTitle()
              // Replace the "Choose a file" label if there is an image
              if (this.form.image) {
                this.fileBrowseLabel = this.form.image
                this.hasImage = true
              }
            } else {
              console.error("Response from backend:", response.data)
            }
          })
          .catch(e => {
            this.loading = false

            if (typeof e.response == "undefined") {
              this.urlErrorMessage = "Någonting blev fel :("
              this.urlError = true
              console.error("Response from backend:", e.response)
            } else {
              this.message = e.response.data.message
              if (this.message.startsWith("Invalid URL")) {
                this.urlErrorMessage = this.urlErrorMessageDef
                this.urlError = true
              } else if (this.message.startsWith("No parser found")) {
                this.urlErrorMessage = "Adressen från den här sidan kan inte hanteras än :("
                this.urlError = true
              } else {
                this.urlErrorMessage = "Någonting blev fel :("
                this.urlError = true
              }
              console.error("Message from backend:", this.message)
            }
          })
      }
    },
    getPreview() {
      this.saveError = ""
      this.loading = true
      this.previewActive = false
      this.valid = this.validateForm()
      if (!this.valid) {
        return
      }
      this.formData = this.makeForm()
      if (this.valid) {
        axios
          .post(this.$backend + "preview_data", this.formData)
          .then(response => {
            this.loading = false
            if (response.data.status == "success") {
              this.previewActive = true
              this.preview = response.data.data
              this.$nextTick(() => this.$refs.previewWindow.scrollIntoView())
            } else {
              console.error("Response from backend:", response.data)
              this.previewActive = false
            }
          })
          .catch(e => {
            this.loading = false
            console.error("Response from backend:", e)
            this.previewActive = false
          })
      }
    },
    getData() {
      let params = this.getRecipeParams()
      axios
        .get(this.$backend + "get_recipe", { params })
        .then(response => {
          if (response.data.status == "success") {
            this.data = response.data.data
            // Update form
            for (var key in this.data) {
              if (this.form.hasOwnProperty(key)) {
                this.form[key] = this.data[key]
              }
            }
            // Set heading
            this.heading.text = "Redigera "
            this.heading.title = this.form.title
            // Set title
            document.title = this.$defaulttitle + " - " + this.form.title
            // Replace the "Choose a file" label if there is an image
            if (this.form.image) {
              this.fileBrowseLabel = this.form.image
              this.hasImage = true
            }
          } else {
            console.error("Response from backend:", response.data)
          }
        })
        .catch(e => {
          console.error("Response from backend:", e.response)
          this.isError = true
        })
    },
    handleFileUpload() {
      this.form.image = this.$refs.image.files[0]
      // Replace the "Choose a file" label
      this.fileBrowseLabel = this.form.image.name
      this.hasImage = true
    },
    removeImage() {
      this.fileBrowseLabel = "Välj fil..."
      this.form.image = ""
      this.hasImage = false
    },
    openTagChooser() {
      this.tagChooserActive = true
    },
    closeTagChooser() {
      this.tagChooserActive = false
    },
    closeDropdown() {
      this.showDropdown = false
    },
    chooseCat(newTag) {
      this.tagChooserActive = false
      newTag = newTag.trim().toLowerCase()
      this.newTag = newTag
      this.showDropdown = true
    },
    addTag(newCat) {
      this.showDropdown = false
      var index = this.tagCategories.indexOf(newCat)
      this.tagStructureSimple[index].tags.push(this.newTag)
      this.form.tags.push(this.newTag)
      // Save parent category for tag
      this.form.tagsParents[this.newTag] = newCat
    },
    modInput() {
      this.unsaved = true
      this.previewActive = false
    },
    validateUrl() {
      if (this.url == "") {
        this.urlErrorMessage = this.urlErrorMessageDef
        this.urlError = true
        return false
      }
      this.urlError = false
      return true
    },
    validateTitle() {
      if (this.form.title == "" || this.form.title == "New") {
        this.titleError = true
        return false
      }
      this.titleError = false
      return true
    },
    validateName() {
      // When suggestion is active, user must provide a name
      if (this.form.suggester == "") {
        this.nameError = true
        return false
      }
      this.nameError = false
      return true
    },
    validateForm() {
      if (!this.validateTitle()) {
        this.$nextTick(() => this.$refs.getRecipe.scrollIntoView())
        return false
      }
      if (this.suggestion && !this.validateName()) {
        this.$nextTick(() => this.$refs.source.scrollIntoView())
        return false
      }
      return true
    },
    save(suggest = false) {
      this.saveError = ""
      this.valid = this.validateForm()
      if (!this.valid) {
        return
      }
      this.loading = true
      this.formData = this.makeForm()
      if (this.edit_existing) {
        this.call = "edit_recipe"
      } else if (suggest) {
        this.call = "suggest"
      } else {
        this.call = "add_recipe"
      }
      axios
        .post(this.$backend + this.call, this.formData)
        .then(response => {
          this.loading = false
          if (response.data.status == "success") {
            this.unsaved = false
            if (suggest) {
              this.toggleOkSuggest()
            } else {
              this.$router.push({ name: "view", params: { url: response.data.url } })
              EventBus.$emit("save")
            }
          } else {
            console.error("Message from backend:", response.data.message)
            this.saveError = "Ett oväntat fel har inträffat. Receptet kunde inte sparas :("
          }
        })
        .catch(e => {
          this.loading = false
          if (typeof e.response !== "undefined" && e.response.data.message == "Recipe title already exists!") {
            this.saveError = "Receptnamn måste vara unika. Receptet '" + this.form.title + "' finns redan i databasen."
            this.titleError = true
            this.$nextTick(() => this.$refs.title.scrollIntoView())
          } else {
            console.error("Response from backend:", e.response)
            this.saveError = "Ett oväntat fel har inträffat. Receptet kunde inte sparas :("
            this.$nextTick(() => this.$refs.source.scrollIntoView())
          }
        })
    },
    remove() {
      this.saveError = ""
      this.loading = true
      this.showConfirm = false
      axios
        .get(this.$backend + "delete_recipe", { params: { id: this.form.id } })
        .then(response => {
          this.loading = false
          this.unsaved = false
          if (response.data.status == "success") {
            this.$router.push({ name: "recipes" })
          } else {
            console.error("Message from backend:", response.data.message)
            this.saveError = "Ett oväntat fel har inträffat. Receptet kunde inte tas bort :("
          }
        })
        .catch(e => {
          this.loading = false
          console.error("Response from backend:", e.response)
          this.saveError = "Ett oväntat fel har inträffat. Receptet kunde inte tas bort :("
        })
    },
    toggleConfirm() {
      if (this.showConfirm == false) {
        this.$router.push({ hash: "#confirmDelete", params: { savePosition: true } })
      } else {
        this.$router.push({ hash: "", params: { savePosition: true } })
      }
      this.showConfirm = !this.showConfirm
    },
    toggleOkSuggest() {
      if (this.showConfirm == false) {
        this.$router.push({ hash: "#okSuggest", params: { savePosition: true } })
      } else {
        this.$router.push({ hash: "", params: { savePosition: true } })
      }
      this.showOkSuggest = !this.showOkSuggest
    },
    makeForm() {
      let data = new FormData()
      // Stringify tags array
      data.append("tags", JSON.stringify(this.form.tags))
      // Stringify tag parents
      data.append("newTags", JSON.stringify(this.form.tagsParents))
      // Append formData
      for (var property in this.form) {
        data.append(property, this.form[property])
      }
      // Append image blob
      data.append("image", this.form.image)
      return data
    }
  }
}
</script>

<!-- ####################################################################### -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.url-popover ul {
  text-align: left;
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

input::placeholder,
textarea::placeholder {
  color: var(--placeholder-font-color);
}

.custom-file-input ~ .custom-file-label::after {
  content: "Blä" "ddra";
}
.image-removal {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
  display: block;
  height: 100%;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  color: #495057;
  background-color: #e9ecef;
  border-right: 1px solid #ced4da;
  border-top: 1px solid #ced4da;
  border-bottom: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.custom-file-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.checkbox {
  height: 1.5em;
  margin-top: 0.4em;
}

.tags div {
  float: left;
}

.on-top {
  z-index: 9990;
}

.force-scroll {
  overflow-y: scroll;
  height: 20vh;
}

#ingredients,
#contents {
  font-family: var(--monofont);
  font-weight: lighter;
}

#previewWindow {
  background: repeating-linear-gradient(
    135deg,
    var(--light-background-color),
    var(--light-background-color) 50px,
    var(--light-background-color-2) 50px,
    var(--light-background-color-2) 100px
  );
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

.buttons button {
  margin: 1em;
}

.save-error {
  color: red;
  font-weight: 500;
  font-size: 1.2em;
  padding-bottom: 1em;
}

.right {
  padding-top: 30vh;
  padding-right: 0;
}
</style>

<style>
.tags .multiselect__option--highlight,
.tags .multiselect__option--highlight:after {
  background: var(--theme-color);
}
.tags .multiselect .multiselect__tags {
  border: 1px solid #ced4da;
}
.multiselect__tags span,
.multiselect__tag-icon,
.multiselect__tag-icon:hover,
.multiselect__tag i::after {
  color: var(--bright-font-color);
  background: var(--theme-color);
}
span.multiselect__placeholder {
  background: white;
  color: var(--placeholder-font-color);
}
</style>
