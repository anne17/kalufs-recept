<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col-2 d-none d-lg-block side-menu right"></div> -->
      <div class="col-lg-12 col-md-12 col-sm-12 middle">
        <ShowRecipe
          :recipe="recipe"
          :isError="isError"
          :showEditOption="loggedIn && admin"
          :published="published"
        ></ShowRecipe>
      </div>

      <!-- <div class="col-3 d-none d-lg-block left"></div> -->
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import ShowRecipe from "@/components/ShowRecipe.vue"
import { axios, GetRecipeMixin, LoginMixin } from "@/services.js"

export default {
  name: "ViewRecipe",
  mixins: [GetRecipeMixin, LoginMixin],
  components: {
    ShowRecipe
  },
  data() {
    return {
      isError: false,
      recipe: {},
      published: true
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let params = this.getRecipeParams()
      axios
        .get(this.$backend + "view_recipe", { params })
        .then(response => {
          if (response.data.status == "success") {
            this.recipe = response.data.data
            // This is needed to avoid a flashing unpublished message
            this.published = this.recipe.published
            document.title = this.$defaulttitle + " - " + this.recipe.title
            // Redirect to "correct" url if necessary
            if (this.$route.params.url != this.recipe.url) {
              this.$router.push({ params: { url: this.recipe.url } })
            }
          } else {
            console.error(response.data)
          }
        })
        .catch(e => {
          console.error(e.response.data.message)
          this.isError = true
        })
    }
  }
}
</script>

<!-- ####################################################################### -->
<style scoped>
.side-menu {
  padding: 22em 0.8em 22em 0.8em !important;
}

.side-menu button {
  margin-bottom: 1em;
}

.img-container {
  max-height: 400px;
  display: contents;
}

.main-img {
  margin-right: auto;
  margin-left: auto;
  object-fit: contain;
  max-width: 100%;
  display: flex;
}

.errormsg {
  color: red;
}

h2 {
  text-align: center;
}

h3 {
  font-size: 1.5rem;
}
</style>
