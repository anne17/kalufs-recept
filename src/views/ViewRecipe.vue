<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col-2 d-none d-lg-block side-menu right"></div> -->
      <div class="col-lg-12 col-md-12 col-sm-12 middle">
        <ShowRecipe :recipe="recipe" :isError="isError" :showEditOption="loggedIn && admin"></ShowRecipe>
      </div>

      <!-- <div class="col-3 d-none d-lg-block left"></div> -->
    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import ShowRecipe from "@/components/ShowRecipe.vue";
import { axios, LoginMixin } from "@/services.js";

export default {
  name: "ViewRecipe",
  mixins: [LoginMixin],
  components: {
    ShowRecipe
  },
  data() {
    return {
      isError: false,
      recipe: {}
    };
  },
  created() {
    document.body.style.overflowY = "auto";
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$backend + "view_recipe", { params: { title: this.$route.params.title } })
        .then(response => {
          if (response.data.status == "success") {
            this.recipe = response.data.data;
          } else {
            console.error(response.data);
          }
        })
        .catch(e => {
          console.error(e.response.data.message);
          this.isError = true;
        });
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
