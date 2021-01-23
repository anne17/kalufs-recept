<template>
  <div class="show-recipe">
    <h2 class="errormsg" v-if="isError">Kan inte hitta receptet!</h2>

    <div class="theRecipe" v-if="!isError">
      <div
        class="img-container"
        v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe, preview ? 'full' : 'medium') + ')' }"
      >
        <img class="invisible-img" :src="getImgUrl(recipe, preview ? 'full' : 'medium')" />
      </div>

      <h2 v-html="recipe.title" class="recipe-title"></h2>

      <div v-if="!published && !preview" class="unpublished-notice">
        <i class="fas fa-info-circle"></i>
        Receptet är opublicerat. Gå in i redigeringsläget och spara för att publicera.
      </div>

      <div v-if="showEditOption" class="mini-edit-menu">
        <router-link :to="{ name: 'edit', params: { title: recipe.title } }" title="Redigera" v-if="recipe.title">
          <i class="fas fa-pencil-alt"></i>
        </router-link>
      </div>
      <div class="mini-button" v-if="!preview && !recipe.stored && admin">
        <i class="far fa-bookmark" @click="toggleRememberRecipe" title="Kom ihåg receptet"></i>
      </div>
      <div class="mini-button" v-if="!preview && recipe.stored && admin">
        <i class="fas fa-bookmark" @click="toggleRememberRecipe" title="Ta bort från sparade recept"></i>
      </div>
      <div
        class="mini-button d-lg-none"
        v-if="!preview && published"
        v-clipboard:copy="recipeUrl"
        v-clipboard:success="handleCopyStatus"
      >
        <i class="fas fa-copy" title="kopiera länk"></i>
      </div>

      <div v-if="recipe.image !== undefined && recipe.image !== ''" class="print-img-container">
        <img :src="getImgUrl(recipe, preview ? 'full' : 'medium')" />
      </div>

      <div class="ingredients">
        <div class="small-header caps-header" v-if="recipe.ingredients">Ingredienser</div>
        <p v-if="recipe.portions_text">
          <span v-html="recipe.portions_text"></span>
        </p>
        <p v-html="recipe.ingredients"></p>
      </div>

      <div class="contents" v-if="recipe.contents">
        <div class="small-header caps-header">Gör så här</div>
        <p v-html="recipe.contents"></p>
      </div>

      <p v-if="recipe.tags !== undefined && recipe.tags.length !== 0" class="recipe-tags">
        <router-link
          class="tag-link"
          v-for="tag in recipe.tags"
          :key="tag.id"
          :to="{ name: 'recipes', query: { tag: tag } }"
          title="Sök på recept med denna tagg"
        >
          <span class="tag">{{ tag }}</span>
        </router-link>
      </p>

      <p class="recipe-source">
        <template v-if="recipe.source">
          <span>Källa: </span>
          <a v-if="isUrl(recipe.source)" class="dont-break-out" :href="recipe.source" target="_blank">{{
            recipe.source
          }}</a>
          <span v-if="!isUrl(recipe.source)">{{ recipe.source }}</span>
          <br />
        </template>
        <span v-if="recipe.suggester && recipe.suggester !== 'null'">Föreslagit av: </span>
          <router-link
            v-if="recipe.suggester && recipe.suggester !== 'null'"
            class="user-link"
            :to="{ name: 'recipes', query: { user: recipe.suggester } }"
            title="Sök på recept av denna användare"
          >
          <span>{{ recipe.suggester }}</span>
        </router-link>
      </p>

      <p class="info-button" v-if="!preview && !showMeta" @click="displayMetadata">
        <i class="fas fa-info-circle" title="Visa mer info"></i>
        <span>Visa metadata</span>
      </p>

      <p v-if="showMeta" class="recipe-metadata" ref="metaData">
        <span>Skapat av: </span>
        <router-link
          class="user-link"
          :to="{ name: 'recipes', query: { user: recipe.created_by.displayname } }"
          title="Sök på recept av denna användare"
        >
          <span>{{ getUsername(recipe.created_by) }}</span>
        </router-link>
        <span> ({{ convertDatetime(recipe.created) }})</span>
        <br />
        <span v-if="recipe.changed">Ändrat av: </span>
        <router-link
          v-if="recipe.changed"
          class="user-link"
          :to="{ name: 'recipes', query: { user: recipe.changed_by.displayname } }"
          title="Sök på recept av denna användare"
        >
          <span>{{ getUsername(recipe.changed_by) }}</span>
        </router-link>
        <span v-if="recipe.changed"> ({{ convertDatetime(recipe.changed) }})</span>
      </p>
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import moment from "moment"
import { ImageMixin, LoginMixin, axios } from "@/services.js"

export default {
  name: "ShowRecipe",
  mixins: [ImageMixin, LoginMixin],
  props: {
    showEditOption: Boolean,
    isError: Boolean,
    preview: Boolean,
    published: Boolean,
    recipe: {
      type: Object,
      default() {
        return {
          title: "",
          portions_text: "",
          portions: 0,
          ingredients: "",
          contents: "",
          source: "",
          image: "",
          tags: [],
          created_by: {
            displayname: ""
          },
          created: "",
          changed_by: {
            displayname: ""
          },
          changed: "",
          suggester: "",
          published: true
        }
      }
    }
  },
  data() {
    return {
      showMeta: false
    }
  },
  computed: {
    recipeUrl() {
      return "https://kalufs.lol/recept" + this.$route.path
    }
  },
  methods: {
    isUrl(s) {
      this.regexp = /^(?:https?:\/\/)?(?:[\w.]+\.)?(\w+\.\w+)(?:\/|$)/
      return this.regexp.test(s)
    },
    displayMetadata() {
      this.showMeta = true
      this.$nextTick(() => this.$refs.metaData.scrollIntoView())
    },
    getUsername(user) {
      if (user !== undefined) {
        return user.displayname
      }
    },
    convertDatetime(datetime) {
      return moment(datetime, "ddd, DD MMM YYYY hh:mm:ss")
        .locale("sv")
        .format("DD MMM YYYY, HH:mm")
    },
    handleCopyStatus() {
      this.$toasted.show("Receptets URL kopierad")
    },
    toggleRememberRecipe() {
      var error_msg
      if (this.recipe.stored == false) {
        error_msg = "Det gick inte att spara receptet"
      } else {
        error_msg = "Det gick inte att ta bort receptet från sparade recept"
      }
      axios
        .post(this.$backend + "toggle_stored", JSON.stringify(this.recipe), {
          headers: {"Content-Type": "application/json"}})
        .then(response => {
          if (response.data.status == "success") {
            this.recipe.stored = !this.recipe.stored
            if (this.recipe.stored == true){
              this.$toasted.show("Receptet tillagt till sparade recept")
            } else {
              this.$toasted.show("Receptet borttaget från sparade recept")
            }

          } else {
            console.error("Message from backend:", response.data.message)
            this.$toasted.show(error_msg)
          }
        })
        .catch(e => {
          console.error("Response from backend:", e.response)
          this.$toasted.show(error_msg)
        })
    }
  }
}
</script>

<!-- ####################################################################### -->
<style scoped>
.show-recipe {
  text-align: left;
  font-size: 1.3rem;
}

.unpublished-notice {
  text-align: center;
  color: var(--warning-color);
  font-weight: bold;
}

.invisible-img {
  opacity: 0;
  width: 100%;
  height: 100%;
}

a {
  color: var(--theme-color);
}

.mini-edit-menu,
.mini-button {
  margin: 0.6em 0 0 0;
  padding: 0 0.6em 0 0;
  float: right;
  /* color: var(--standard-font-color-2); */
  color: var(--theme-color-5);
}
.mini-edit-menu a {
  color: inherit;
  float: right;
}
.mini-edit-menu i:hover,
.mini-button i:hover {
  /* color: var(--standard-font-color); */
  color: var(--theme-color);
  cursor: pointer;
}

.info-button {
  color: var(--theme-color-5);
  cursor: pointer;
}
.info-button:hover {
  color: var(--theme-color);
}
.info-button i {
  margin-right: 0.4em;
}

.img-container {
  display: flex;
  height: 40vh;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  align-items: center;
}
.print-img-container {
  display: none;
}

.default-img {
  margin-right: auto;
  margin-left: auto;
}
.errormsg {
  color: red;
  text-align: center;
  margin-top: 1em;
}

h2 {
  font-size: 1.4em;
  text-align: center;
  padding-top: 0.5em;
  margin: 0;
}

.small-header {
  /* color: var(--standard-font-color-2); */
  color: var(--theme-color-5);
  font-weight: 600;
  padding-bottom: 0.2em;
  padding-top: 0.2em;
}

.recipe-title {
  margin-bottom: 0.8em;
}

.ingredients,
.contents {
  padding: 0.3em;
  /* box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2); */
}

.contents >>> li {
  margin: 0.5em 0;
}

.ingredients >>> a,
.contents >>> a {
  color: var(--theme-color);
}

.recipe-tags,
.recipe-source,
.info-button,
.recipe-metadata {
  font-size: 0.8em;
}

@keyframes blink {
  from {
    background: inherit;
  }
  to {
    background: var(--primary-color-5);
  }
}
.recipe-metadata > span,
.recipe-metadata a {
  animation: blink 0.7s 2 alternate;
}

@media print {
  .mini-edit-menu,
  .mini-button,
  .img-container,
  .info-button,
  .recipe-tags {
    display: none;
  }
  .print-img-container {
    display: inline-block;
    float: right;
    margin: 5% 15% 1em 1em;
    max-width: 40%;
  }
  .print-img-container img {
    width: 100%;
  }
  a {
    text-decoration: none;
    color: var(--standard-font-color);
  }
}
</style>
