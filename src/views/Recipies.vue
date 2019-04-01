<template>
  <div class="recipies container">
    <div class="row">
      <div class="col-2 d-none d-lg-block left">

        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Sök" disabled>
        </div>

      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 middle">
        <h1>
          Alla recept
        </h1>
        <div class="container">
          <div class="menu row">

            <div class="input-group input-group-sm mb-3 col-6">
              <div class="input-group-prepend d-inline d-lg-none">
                <span class="input-group-text" id="inputGroup-sizing-sm"><i class="fas fa-search"></i></span>
              </div>
              <input type="text" class="form-control d-inline d-lg-none" placeholder="Sök" disabled>
            </div>

            <div v-if="loggedIn" class="new-recipe-container col-6">
              <router-link class="new-recipe" :to="{ name: 'edit', params: {title: 'New'}}">
                <strong>&plus;</strong> Nytt recept
              </router-link>
            </div>
          </div>
        </div>
        <!-- <RecipiesList :loggedIn="loggedIn"/> -->

        <!-- Recipe list -->
        <div id="recipe-data" class="recipe-list">
            <div v-if="!results">
              <span>Inga recept kunde visas 😟</span>
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
                      <span class="tag" v-for="tag in recipe.tags" :key="tag.id">{{ tag }}</span>
                      <span class="tag-placeholder" v-if="!recipe.tags">&nbsp;</span>
                    </div>
                  </div>
                  <div class="mini-edit-menu container col-1">
                    <router-link :to="{ name: 'edit', params: {title: recipe.title}}" v-if="loggedIn" title="redigera">
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

export default {
  name: "recipies",
  mixins: [LoginMixin],
  data() {
    return {
      results: [],
      loggedIn: false,
      loading: false
    };
  },
  mounted() {
    axios.get(this.$backend + "recipe_data").then(response => {
      if (response.data.status != "success"){
        this.results = false;
      } else {
        this.results = response.data.data;
      }
    })
      .catch(e => {
        console.error("Response from backend:", e.response);
        this.results = false;
      });
  },
  methods: {
    openLink: function(title) {
      this.$router.push({ name: "view", params: { title: title } });
    },
    getImgUrl: function(recipe_data) {
      if (recipe_data.image !== undefined && recipe_data.image !== "") {
        return this.$backend + recipe_data.image;
      } else {
        return "";
      }
    }
  }
};
</script>

<!-- ####################################################################### -->
<style scoped>
* {
  box-sizing: border-box;
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

.menu {
  margin-top: 0.4em;
}

.input-group {
  padding-left: 0;
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
