<template>
  <div class="recipes container">

    <LoadingSpinner :loading="loading"/>

    <div class="row">
      <div class="col-2 d-none d-lg-block left">
        <div v-if="showPublished" class="input-group input-group-sm mb-3">
          <div class="search-icon input-group-prepend" @click="preSearch">
            <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Sök" v-model="searchString" @keyup.enter="preSearch">
        </div>
      </div>

      <div class="col-lg-8 col-md-8 col-sm-12 middle">
        <h1>
          {{ tableTitle }} <span class="hits" v-if="nHits!==-1"> ({{ nHits }})</span>
        </h1>
        <div class="menu container">
          <div class="menu row">

            <div v-if="showPublished" class="input-group input-group-sm mb-3 col-6">
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
                  <div class="main-img-container col-3" v-on:click="openLink(recipe.title)" v-bind:style="{ backgroundImage: 'url(' + getImgUrl(recipe) + ')' }">
                    <img class="default-img" v-if="!recipe.image" :src="$defaultimg">
                  </div>
                  <div class="text-container container col-8">
                    <div class="row title">
                      <router-link :to="{ name: 'view', params: {title: recipe.title}}">{{ recipe.title }}</router-link>
                    </div>
                    <div class="tags-container row">
                      <router-link class="tag-link" v-for="tag in recipe.tags" :key="tag.id" :to="{ name: 'recipes', query: {tag: tag}}" title="Sök på recept med denna tagg">
                        <span class="tag">{{ tag }}</span>
                      </router-link>
                      <span class="tag-placeholder" v-if="recipe.tags == undefined || recipe.tags.length == 0">&nbsp;</span>
                    </div>
                  </div>
                  <div class="mini-edit-menu container col-1">
                    <router-link :to="{ name: 'edit', params: {title: recipe.title}}" v-if="loggedIn && admin" title="redigera">
                      <i class="fas fa-pencil-alt"></i>
                    </router-link>
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
import { LoginMixin, axios } from "@/services.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "recipes",
  components: {
    LoadingSpinner
  },
  mixins: [LoginMixin],
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
      showPublished: true
    };
  },
  mounted() {
    document.body.style.overflowY = "auto";
    if (Object.keys(this.$route.query).length !== 0) {
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
    "$route" () {
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
    }
  },
  methods: {
    showSuggestions() {
      this.showPublished = false;
      this.defaultTableTitle = "Alla förslag";
    },
    showRecipes() {
      this.showPublished = true;
      this.defaultTableTitle = "Alla recept";
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
        return this.$backend + recipe_data.image;
      } else {
        return "";
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
              this.tableTitle = "Recept med tagg " + queryParams.tag;
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
  background: var(--light-accent-color);
  border-right: 1px solid var(--light-accent-color);
  border-radius: 0 15px 15px 0;
}

.main-img-container {
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: var(--lightish-accent-color);
  /* background-color: blue; */
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

.title:hover {
  text-decoration: underline;
}

.mini-edit-menu {
  margin: 0.6em 0 0 0;
  padding: 0 0.6em 0 0;
}
.mini-edit-menu i {
  float: right;
}
.mini-edit-menu i:hover {
  color: black;
}
</style>
