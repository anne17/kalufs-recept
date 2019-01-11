<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col-2 d-none d-lg-block side-menu right">
        <div class="buttons">
          <button type="button" class="btn btn-default btn-sm" v-on:click="save" disabled>
            <i class="fas fa-save"></i>
            Spara
          </button>
        </div>

      </div> -->
      <div class="col-lg-12 col-md-12 col-sm-12 middle">
        <ShowRecipe :recipe="recipe" :isError="isError"></ShowRecipe>
      </div>

      <!-- <div class="col-3 d-none d-lg-block left">
      </div> -->

    </div>
  </div>
</template>

<!-- ####################################################################### -->
<script>
import ShowRecipe from '@/components/ShowRecipe.vue'
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "ViewRecipe",
  components: {
    ShowRecipe
  },
  data() {
    return {
      isError: false,
      recipe: {
        title: "",
        portions: 0,
        ingredients: "",
        contents: "",
        source: "",
        image: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$backend + "view_recipe?title=" + this.$route.params.title)
        .then(response => {
          if (response.data.status == "success") {
            this.recipe = response.data.data;
          } else {
            console.log(response.data);
          }
        })
        .catch(e => {
          console.log(e.response.data.message);
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
  display: flex;
  max-height: 50%;
}

.main-img {
  margin-right: auto;
  margin-left: auto;
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
