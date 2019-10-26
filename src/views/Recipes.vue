<template>
  <div class="recipes container">

    <LoadingSpinner :loading="loading"/>

    <!-- Filter menu for small screens -->
    <div class="d-lg-none" :class="{hidden: !showMobileFilter}">
      <div class="overlay" @click="toggleMobileFilter()"></div>
      <div class="mobile-filter-modal">
        <div class="modal-content">
          <button type="button" class="close" v-on:click="toggleMobileFilter()" aria-hidden="true">&times;</button>
          <FilterMenu :tagStructureSimple="tagStructureSimple" @clickTag="clickTag"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-2 d-none d-lg-block left">
        <div v-if="showPublished" class="sidebar-search input-group input-group-sm">
          <div class="search-icon input-group-prepend" @click="preSearch">
            <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Sök" v-model="searchString" @keyup.enter="preSearch">
        </div>

        <!-- Placeholder - level filter height with height of recipe list -->
        <div class="row">
          <div v-if="!loggedIn" class="mb-3">
          </div>
          <span v-if="loggedIn">&nbsp;</span>
        </div>

        <FilterMenu :tagStructureSimple="tagStructureSimple" @clickTag="clickTag"/>

      </div>

      <div class="col-lg-8 col-md-10 col-sm-12 middle">
        <h1>
          {{ tableTitle }} <span class="hits" v-if="nHits!==-1"> ({{ nHits }})</span>
        </h1>
        <div class="menu container">
          <div class="menu row mb-3">

            <div v-if="showPublished" class="input-group input-group-sm col-6">
              <div class="search-icon input-group-prepend d-inline d-lg-none" @click="preSearch">
                <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
              </div>
              <input type="text" class="form-control d-inline d-lg-none" placeholder="Sök" v-model="searchString" @keyup.enter="preSearch">
            </div>

            <div v-if="!showPublished" class="unpublished-notice">
              <i class="fas fa-info-circle"></i>
              Dessa recept är opublicerade. Gå in i redigeringsläget och spara för att publicera.
            </div>

            <div v-if="loggedIn && showPublished" class="new-recipe-container col-6">
              <router-link v-if="admin" class="new-recipe" :to="{ name: 'edit', params: {title: 'New'}}">
                <strong>&plus;</strong> Nytt recept
              </router-link>
              <router-link v-if="!admin" class="new-recipe" :to="{ name: 'suggest'}">
                <strong>&plus;</strong> Nytt recept
              </router-link>
            </div>

            <button v-if="showPublished" type="button" class="btn btn-primary d-lg-none btn-sm" :class="{'mt-2': loggedIn}" @click="toggleMobileFilter()">
              <i class="fas fa-filter"></i>
              Filtrera recept
            </button>

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
          <div v-if="nHits==0">
            <span>Sökningen gav inga träffar 😟</span>
          </div>

            <div class="main-entry container" v-for="recipe in results" :key="recipe.id">
              <div class="row">
                <div class="main-img-container col-3" v-on:click="openLink(recipe.title)" v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe) + ')' }"/>
                <div class="text-container container col-9">
                  <div class="row title">
                    <router-link :class="{'col-11': loggedIn && admin}" :to="{ name: 'view', params: {title: recipe.title}}">{{ recipe.title }}</router-link>
                    <div class="mini-edit-menu container col-1" v-if="loggedIn && admin">
                      <router-link :to="{ name: 'edit', params: {title: recipe.title}}" title="redigera">
                        <i class="fas fa-pencil-alt"></i>
                      </router-link>
                    </div>
                  </div>
                  <div class="tags-container row">
                    <router-link class="tag-link" v-for="tag in recipe.tags" :key="tag.id" :to="{ name: 'recipes', query: {tag: tag}}" title="Sök på recept med denna tagg">
                      <span class="tag">{{ tag }}</span>
                    </router-link>
                    <span class="tag-placeholder" v-if="recipe.tags == undefined || recipe.tags.length == 0">&nbsp;</span>
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
import { LoginMixin, TagMixin, axios } from "@/services.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import FilterMenu from "@/components/FilterMenu.vue";

export default {
  name: "recipes",
  components: {
    LoadingSpinner,
    FilterMenu
  },
  mixins: [LoginMixin, TagMixin],
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
      activeTags: [],
      showMobileFilter: false
    };
  },
  mounted() {
    document.title = this.$defaulttitle;
    document.body.style.overflowY = "auto";
    this.getTagStructureSimple()
      .then( () => {
        this.updateTags();
      });
    if (Object.keys(this.$route.query).length !== 0 && !("redirect" in this.$route.query)) {
      this.search(this.$route.query);
    } else {
      // Otherwise, get all data (or suggestions)
      if (this.$router.currentRoute.name == "suggestions") {
        this.showSuggestions();
      } else {
        this.showRecipes();
      }
      this.loadAll();
    }
    this.searchError = "";
  },
  watch: {
    "$route" (to, from) {
      this.updateTags();
      if (Object.keys(this.$route.query).length !== 0) {
        this.search(this.$route.query);
      } else {
        if (this.$router.currentRoute.name == "suggestions") {
          this.showSuggestions();
        } else {
          this.showRecipes();
        }
        this.loadAll();
      }
      // Handle history for filter display on small screens
      if (to.hash == "#filter") {
        document.body.style.overflowY = "hidden";
        this.showMobileFilter = true;
      }
      if (from.hash == "#filter" && to.hash !== "#filter") {
        document.body.style.overflowY = "auto";
        this.showMobileFilter = false;
      }
    }
  },
  methods: {
    updateTags() {
      // Update tag style in filter sidebar
      if (this.$route.query.tag !== undefined) {
        this.activeTags = this.$route.query.tag.split(",");
      } else {
        this.activeTags = [];
      }
      for (var i in this.tagList) {
        if (this.activeTags.includes(this.tagList[i])) {
          document.getElementById(this.tagList[i]).classList.add("tag");
          document.getElementById(this.tagList[i]).parentElement.classList.add("active-tag");
        } else {
          document.getElementById(this.tagList[i]).classList.remove("tag");
          document.getElementById(this.tagList[i]).parentElement.classList.remove("active-tag");
        }
      }
    },
    clickTag(tag) {
      var hash = this.showMobileFilter ? "#filter" : "";
      if (!this.activeTags.includes(tag)) {
        this.activeTags.push(tag);
        this.$router.push({ name: "recipes", query: {tag: this.activeTags.join(",")}, hash: hash });
      } else {
        this.activeTags.splice(this.activeTags.indexOf(tag), 1);
        if (this.activeTags.length == 0) {
          this.$router.push({ name: "recipes", hash: hash });
        } else {
          this.$router.push({ name: "recipes", query: {tag: this.activeTags.join(",")}, hash: hash });
        }
      }
    },
    showSuggestions() {
      this.showPublished = false;
      this.defaultTableTitle = "Alla förslag";
    },
    showRecipes() {
      this.showPublished = true;
      this.defaultTableTitle = "Alla recept";
    },
    toggleMobileFilter() {
      if (!this.showMobileFilter) {
        this.$router.push({hash: "#filter", query: this.$route.query});
      } else {
        this.$router.push({hash: "", query: this.$route.query});
      }
      this.showMobileFilter = !this.showMobileFilter;
    },
    loadAll() {
      var call = "recipe_data";
      if (!this.showPublished) {
        call = "recipe_suggestions";
      }
      axios
        .get(this.$backend + call, { params: { title: this.$route.params.title } })
        .then(response => {
          if (response.data.status !== "success"){
            this.results = false;
          } else {
            this.results = response.data.data;
            this.nHits = response.data.hits;
            this.tableTitle = this.defaultTableTitle;
          }
        })
        .catch(e => {
          console.error("Response from backend:", e.response);
          this.results = false;
        });
    },
    openLink(title) {
      this.$router.push({ name: "view", params: { title: title } });
    },
    getImgUrl(recipe_data) {
      if (recipe_data.image !== undefined && recipe_data.image !== "") {
        return this.$backend + "thumbnail/" + recipe_data.id;
      } else {
        return this.$defaultthumb;
      }
    },
    preSearch() {
      this.searchString = this.searchString.trim();
      if (this.searchString !== "") {
        this.$router.push({ query: { q: this.searchString } });
      }
    },
    search(queryParams) {
      this.searchError = "";
      this.loading = true;
      axios
        .get(this.$backend + "search", { params: queryParams })
        .then(response => {
          this.loading = false;
          if (response.data.status == "success") {
            this.results = response.data.data;
            this.nHits = response.data.hits;
            if (queryParams.user !== undefined) {
              this.tableTitle = "Recept av " + queryParams.user;
            } else if (queryParams.tag !== undefined) {
              if (this.activeTags.length > 1) {
                this.tableTitle = "Recept med taggar " + this.activeTags.join(", ");
              } else {
                this.tableTitle = "Recept med tagg " + queryParams.tag;
              }
            } else {
              this.tableTitle = "Recept med '" + queryParams.q + "'";
            }
          } else {
            this.results = false;
            this.tableTitle = "Recept med '" + this.searchString + "'";
            console.error("Message from backend:", response.data.message);
            this.searchError = "Det gick inte att göra den här sökningen. Ett oväntat fel har inträffat.";
          }
        })
        .catch(e => {
          this.loading = false;
          this.results = false;
          console.error("Response from backend:", e.response);
          this.searchError = "Det gick inte att göra den här sökningen. Ett oväntat fel har inträffat.";
        });
    },
  }
};
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
  width: 350px;
  z-index: 10000;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0%);
  max-height: 90vh;
}
.mobile-filter-modal .modal-content {
  padding: 15px 30px 15px 30px;
  border-radius: 5px;
  border-color: transparent;
  border-width: 2.5px;
  overflow: auto;
  height: 100%;
}
.modal-content .close {
  position: fixed;
  top: 8px;
  right: 10px;
}

.hits {
  font-size: 0.8em;
  filter: brightness(130%);
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

.search-icon {
  cursor: pointer;
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

.mini-edit-menu {
  margin: 0.2em 0 0 0;
  padding: 0;

}
.mini-edit-menu i {
  float: right;
}
.mini-edit-menu i:hover {
  color: black;
}

@media only screen and (min-width : 1200px) {
    .recipes { max-width: 1400px; }
}
</style>
