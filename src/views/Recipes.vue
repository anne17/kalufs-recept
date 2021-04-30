<template>
  <div class="recipes container">
    <LoadingSpinner :loading="loading" />

    <!-- Filter menu for small screens -->
    <div class="d-lg-none" :class="{ hidden: !showMobileFilter }" v-scroll-lock="showMobileFilter">
      <div class="overlay" @click="toggleMobileFilter()"></div>
      <div class="mobile-filter-modal">
        <div class="modal-content">
          <button type="button" class="close" v-on:click="toggleMobileFilter()" aria-hidden="true">&times;</button>
          <FilterMenu
            :tagStructureSimple="tagStructureSimple"
            :activeTags="activeTags"
            :activeCats="activeCats"
            @clickTag="clickTag"
            @toggleCategoryFilter="toggleCategoryFilter"
            :mobileFilter="Boolean('true')"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-2 d-none d-lg-block left">
        <div v-if="showPublished" class="sidebar-search input-group input-group-sm">
          <div class="search-icon input-group-prepend" @click="preSearch">
            <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Sök" v-model="searchString" @keyup.enter="preSearch" />
        </div>

        <!-- Placeholder - level filter height with height of recipe list -->
        <div class="row">
          <div v-if="!loggedIn" class="mb-1"></div>
          <span v-if="loggedIn">&nbsp;</span>
        </div>

        <FilterMenu
          :tagStructureSimple="tagStructureSimple"
          :activeTags="activeTags"
          :activeCats="activeCats"
          @clickTag="clickTag"
          @toggleCategoryFilter="toggleCategoryFilter"
        />
      </div>

      <div class="col-lg-8 col-md-10 col-sm-12 middle">
        <h1>
          {{ tableTitle }}
          <template v-if="activeTags.length > 0">
            <span v-for="tag in activeTags" :key="tag.id" class="tag search-tag">{{ tag }}</span>
          </template>
          <span class="hits" v-if="nHits !== -1"> ({{ nHits }})</span>
        </h1>
        <div class="menu container">
          <!-- Row above recipes, small screens -->
          <div class="menu mb-2 row d-lg-none">
            <div v-if="showPublished" class="input-group input-group-sm col-6">
              <div class="search-icon input-group-prepend d-inline" @click="preSearch">
                <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
              </div>
              <input
                type="text"
                class="form-control d-inline"
                placeholder="Sök"
                v-model="searchString"
                @keyup.enter="preSearch"
              />
            </div>

            <div v-if="loggedIn && showPublished" class="new-recipe-container col-6">
              <router-link v-if="admin" class="new-recipe" :to="{ name: 'edit', params: { title: 'New' } }">
                <strong>&#43;</strong> Nytt recept
              </router-link>
              <router-link v-if="!admin" class="new-recipe" :to="{ name: 'suggest' }">
                <strong>&#43;</strong> Nytt recept
              </router-link>
            </div>
          </div>
          <button
            v-if="showPublished"
            type="button"
            class="filter-button btn btn-primary d-lg-none btn-sm mb-2"
            @click="toggleMobileFilter()"
          >
            <i class="fas fa-filter"></i>
            Filtrera recept
          </button>
          <button
            v-if="showPublished"
            type="button"
            class="btn btn-primary d-lg-none btn-sm float-right mb-2"
            title="Visa ett receptförslag"
            @click="hitRandom()"
          >
            <i class="fas fa-utensils"></i>
            Jag är hungrig!
          </button>

          <!-- Row above recipes, large screens -->
          <div class="menu mb-2 row d-none d-lg-block">
            <button
              v-if="showPublished"
              class="btn btn-primary btn-sm float-left mb-2"
              title="Visa ett receptförslag"
              @click="hitRandom()"
            >
              <i class="fas fa-utensils"></i>
              Jag är hungrig!
            </button>
            <div v-if="loggedIn && showPublished" class="new-recipe-container d-inline float-right">
              <router-link v-if="admin" class="new-recipe" :to="{ name: 'edit', params: { title: 'New' } }">
                <strong>&#43;</strong> Nytt recept
              </router-link>
              <router-link v-if="!admin" class="new-recipe" :to="{ name: 'suggest' }">
                <strong>&#43;</strong> Nytt recept
              </router-link>
            </div>
          </div>

          <div v-if="!showPublished" class="unpublished-notice">
            <i class="fas fa-info-circle"></i>
            Dessa recept är opublicerade. Gå in i redigeringsläget och spara för att publicera.
          </div>
        </div>

        <!-- Recipe list -->
        <div id="recipe-data" class="recipe-list">
          <div class="search-error" v-if="searchError">
            <span>{{ searchError }}</span>
          </div>
          <div v-if="!results">
            <span>Inga recept kunde visas 😟</span>
          </div>
          <div v-if="nHits == 0">
            <span>Sökningen gav inga träffar 😟</span>
          </div>

          <div class="main-entry container" v-for="recipe in results" :key="recipe.id">
            <div class="row">
              <div
                class="main-img-container col-3"
                v-on:click="openLink(recipe.title)"
                v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe, 'thumb') + ')' }"
              />
              <div class="text-container container col-9">
                <div class="row title">
                  <router-link
                    :class="{ 'col-11': loggedIn && admin }"
                    :to="{ name: 'view', params: { title: recipe.title } }"
                    >{{ recipe.title }}</router-link
                  >
                  <div class="mini-menu container col-1" v-if="loggedIn && admin">
                    <div v-if="!recipe.stored">
                      <i class="far fa-bookmark" @click="toggleRememberRecipe(recipe)" title="Kom ihåg receptet"></i>
                    </div>
                    <div v-if="recipe.stored">
                      <i
                        class="fas fa-bookmark"
                        @click="toggleRememberRecipe(recipe)"
                        title="Ta bort från sparade recept"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="tags-container row">
                  <router-link
                    class="tag-link"
                    v-for="tag in recipe.tags"
                    :key="tag.id"
                    :to="{ name: 'recipes', query: { tag: tag } }"
                    title="Sök på recept med denna tagg"
                  >
                    <span class="tag">{{ tag }}</span>
                  </router-link>
                  <span class="tag-placeholder" v-if="recipe.tags == undefined || recipe.tags.length == 0"
                    >&#8205;</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col-2 d-none d-lg-block right"></div> -->
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import { ImageMixin, LoginMixin, TagMixin, axios } from "@/services.js"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import FilterMenu from "@/components/FilterMenu.vue"

export default {
  name: "recipes",
  components: {
    LoadingSpinner,
    FilterMenu
  },
  mixins: [LoginMixin, TagMixin, ImageMixin],
  data() {
    return {
      tableTitle: "",
      defaultTableTitle: "",
      nHits: -1,
      results: true,
      loggedIn: false,
      loading: false,
      searchString: "",
      searchError: "",
      showPublished: true,
      activeCats: [],
      activeTags: [],
      showMobileFilter: false
    }
  },
  mounted() {
    document.title = this.$defaulttitle

    if (this.$route.hash == "#filter") {
      this.showMobileFilter = true
    }

    this.getTagStructureSimple().then(() => {
      this.updateTags()
      // display all cateogries as open
      for (let cat of this.tagStructureSimple) {
        this.activeCats.push(cat.category)
      }
    })
    if (Object.keys(this.$route.query).length !== 0 && !("redirect" in this.$route.query)) {
      this.search(this.$route.query)
    } else if (this.$router.currentRoute.name == "random") {
      this.ShowRandomRecipe()
    } else if (this.$router.currentRoute.name == "stored") {
      this.showStoredRecipes()
    } else {
      // Otherwise, get all data or suggestions
      if (this.$router.currentRoute.name == "suggestions") {
        this.showSuggestions()
      } else {
        this.showRecipes()
      }
      this.loadAll()
    }
    this.searchError = ""
  },
  watch: {
    $route(to, from) {
      this.updateTags()
      if (Object.keys(this.$route.query).length !== 0) {
        this.search(this.$route.query)
      } else if (this.$router.currentRoute.name == "random") {
        this.ShowRandomRecipe()
      } else if (this.$router.currentRoute.name == "stored") {
        this.showStoredRecipes()
      } else {
        if (this.$router.currentRoute.name == "suggestions") {
          this.showSuggestions()
        } else {
          this.showRecipes()
        }
        this.loadAll()
      }
      // Handle history for filter display on small screens
      if (to.hash == "#filter") {
        this.showMobileFilter = true
      }
      if (from.hash == "#filter" && to.hash !== "#filter") {
        this.showMobileFilter = false
      }
    }
  },
  methods: {
    updateTags() {
      // Update tag style in filter sidebar
      if (this.$route.query.tag !== undefined) {
        this.activeTags = this.$route.query.tag.split(",")
      } else {
        this.activeTags = []
      }
    },
    clickTag(tag, filter = true) {
      if (!this.activeTags.includes(tag)) {
        this.activeTags.push(tag)
      } else {
        this.activeTags = this.activeTags.filter(t => t !== tag)
      }
      // Do filtering on tag click if not in mobile mode
      if (filter) {
        this.sendTags()
      }
    },
    sendTags() {
      var hash = this.showMobileFilter ? "#filter" : ""
      if (this.activeTags.length == 0) {
        this.$router.push({ name: "recipes", hash: hash })
      } else {
        this.$router.push({ name: "recipes", query: { tag: this.activeTags.join(",") } })
      }
    },
    toggleCategoryFilter(category) {
      if (this.activeCats.includes(category)) {
        this.activeCats = this.activeCats.filter(c => c !== category)
      } else {
        this.activeCats.push(category)
      }
    },
    showSuggestions() {
      this.showPublished = false
      this.defaultTableTitle = "Alla förslag"
    },
    showRecipes() {
      this.showPublished = true
      this.defaultTableTitle = "Alla recept"
    },
    toggleMobileFilter() {
      if (!this.showMobileFilter) {
        this.$router.push({ name: "recipes", hash: "#filter", query: this.$route.query })
      } else if (this.activeTags.length > 0) {
        this.$router.push({ name: "recipes", hash: "", query: { tag: this.activeTags.join(",") } })
      } else {
        this.$router.push({ name: "recipes", hash: "" })
      }
      this.showMobileFilter = !this.showMobileFilter
    },
    loadAll() {
      var call = "recipe_data"
      if (!this.showPublished) {
        call = "recipe_suggestions"
      }
      axios
        .get(this.$backend + call, { params: { title: this.$route.params.title } })
        .then(response => {
          if (response.data.status !== "success") {
            this.results = false
          } else {
            this.results = response.data.data
            this.nHits = response.data.hits
            this.tableTitle = this.defaultTableTitle
          }
        })
        .catch(e => {
          console.error("Response from backend:", e.response)
          this.results = false
        })
    },
    openLink(title) {
      this.$router.push({ name: "view", params: { title: title } })
    },
    preSearch() {
      this.searchString = this.searchString.trim()
      if (this.searchString !== "") {
        this.$router.push({ name: "recipes", query: { q: this.searchString } })
      }
    },
    search(queryParams) {
      this.searchError = ""
      this.loading = true
      axios
        .get(this.$backend + "search", { params: queryParams })
        .then(response => {
          this.loading = false
          if (response.data.status == "success") {
            this.results = response.data.data
            this.nHits = response.data.hits
            if (queryParams.user !== undefined) {
              this.tableTitle = "Recept av " + queryParams.user
            } else if (queryParams.tag !== undefined) {
              this.tableTitle = "Recept med "
            } else {
              this.tableTitle = "Recept med '" + queryParams.q + "'"
            }
          } else {
            this.results = false
            this.tableTitle = "Recept med '" + this.searchString + "'"
            console.error("Message from backend:", response.data.message)
            this.searchError = "Det gick inte att göra den här sökningen. Ett oväntat fel har inträffat."
          }
        })
        .catch(e => {
          this.loading = false
          this.results = false
          console.error("Response from backend:", e.response)
          this.searchError = "Det gick inte att göra den här sökningen. Ett oväntat fel har inträffat."
        })
    },
    hitRandom() {
      if (this.$router.currentRoute.name == "random") {
        this.ShowRandomRecipe()
      } else {
        this.$router.push("random")
      }
    },
    ShowRandomRecipe() {
      this.searchError = ""
      this.loading = true
      axios
        .get(this.$backend + "random")
        .then(response => {
          this.loading = false
          if (response.data.status == "success") {
            this.results = response.data.data
            this.nHits = -1
            this.tableTitle = "Ät det här:"
          } else {
            this.results = false
            this.tableTitle = ""
            console.error("Message from backend:", response.data.message)
            this.searchError = "Det gick inte att göra den här sökningen. Ett oväntat fel har inträffat."
          }
        })
        .catch(e => {
          this.loading = false
          this.results = false
          console.error("Response from backend:", e.response)
          this.searchError = "Det gick inte att göra den här sökningen. Ett oväntat fel har inträffat."
        })
    },
    showStoredRecipes() {
      this.searchError = ""
      this.loading = true
      this.showPublished = true
      axios
        .get(this.$backend + "stored_recipes")
        .then(response => {
          this.loading = false
          this.tableTitle = "Sparade recept"
          if (response.data.status == "success") {
            this.results = response.data.data
            this.nHits = response.data.hits
          } else {
            this.results = false
            console.error("Message from backend:", response.data.message)
            this.searchError = "Det gick inte att visa sparade recept. Ett oväntat fel har inträffat."
          }
        })
        .catch(e => {
          this.loading = false
          this.results = false
          console.error("Response from backend:", e.response)
          this.searchError = "Det gick inte att visa sparade recept. Ett oväntat fel har inträffat."
        })
    },
    toggleRememberRecipe(recipe) {
      var error_msg
      if (recipe.stored == false) {
        error_msg = "Det gick inte att spara receptet"
      } else {
        error_msg = "Det gick inte att ta bort receptet från sparade recept"
      }
      axios
        .post(this.$backend + "toggle_stored", JSON.stringify(recipe), {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          if (response.data.status == "success") {
            recipe.stored = !recipe.stored
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
* {
  box-sizing: border-box;
}

.hidden {
  display: none;
}

.mobile-filter-modal {
  width: 330px;
  z-index: 10000;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0%);
  height: 90vh;
}
.mobile-filter-modal .modal-content {
  padding: 30px 30px 15px 30px;
  border-radius: 5px;
  border-color: transparent;
  border-width: 2.5px;
  overflow: auto;
  height: 100%;
}
.modal-content .close {
  font-size: 2em;
  position: fixed;
  top: 5px;
  right: 10px;
}

.hits {
  font-size: 0.8em;
  filter: brightness(130%);
}

.sidebar-search {
  margin-bottom: 0.5em;
}

.recipe-list {
  clear: both;
}

.recipes,
.menu {
  padding-left: 0px;
  padding-right: 0px;
}

.new-recipe-container {
  text-align: right;
  padding-right: 0.2em;
}
.new-recipe {
  cursor: pointer;
  text-decoration: none;
  color: unset;
}
.new-recipe:hover {
  color: black;
}

.unpublished-notice {
  text-align: center;
  color: var(--warning-color);
  font-weight: bold;
  margin-bottom: 0.5em;
}

.menu {
  margin-top: 0.4em;
}

.input-group {
  padding-left: 0;
}

.filter-button {
  float: left;
}

.search-icon {
  cursor: pointer;
}

.search-tag {
  vertical-align: middle;
  font-size: medium;
}

.search-error {
  color: red;
  font-weight: 500;
  padding-bottom: 1em;
}

.main-list {
  padding-left: 0pt;
  margin-left: 0pt;
}

.row {
  margin-right: unset;
  margin-left: unset;
}

.main-entry {
  list-style-type: none;
  margin-bottom: 0.5em;
  padding: 0px;
}

.main-entry a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}

.main-entry > div {
  clear: left;
  background: var(--primary-color-5);
  border-right: 1px solid var(--primary-color-5);
  border-radius: 0 15px 15px 0;
}

.main-img-container {
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.default-img {
  max-height: 71px;
  max-width: 100%;
  margin: auto;
}

.text-container {
  margin: 0.4em 0em 0.5em 0em;
  text-align: left;
}

.title {
  padding-bottom: 0.3em;
}
.title a:hover {
  text-decoration: underline;
}
.title a {
  padding-left: 0px;
  padding-right: 0px;
}

.mini-menu {
  margin: 0.2em 0 0 0;
  padding: 0;
  cursor: pointer;
}
.mini-menu i {
  float: right;
}
.mini-menu i:hover {
  color: black;
}

@media only screen and (min-width: 1200px) {
  .recipes {
    max-width: 1400px;
  }
}
</style>
