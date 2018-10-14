// And $backend will be available in all Vue instances:
//
// new Vue({
//   beforeCreate: function () {
//     console.log(this.$backend)
//   }
// })

Vue.prototype.$backend = 'http://demo.spraakdata.gu.se/anne/recept/receptsida-backend/'

var recipedata = new Vue({
  el: '#recipe-data',
  data: {
    results: []
  },
  mounted() {
    axios.get(this.$backend+"recipe-data")
    .then(response => {
        this.results = response.data.recipies,
        this.pdfaddress = this.$backend + 'pdf/'
        this.imgaddress = this.$backend + 'img/'
    })
  }
});

// var simple_recipedata = new Vue({
//   el: '#simple-recipe-data',
//   data: {
//     results: [
//       { title: 'Chili con carne med kikarter',
//         pdf: 'Chili con carne med kikarter - Recept Arla.pdf'},
//       { title: 'Mug cake',
//         pdf: 'Mug cake - Koppkaka.pdf'},
//       { title: 'Pastagratang med bacon',
//         pdf: 'Pastagratang med bacon Recept ICA.se.pdf'}
//     ]
//   }
// })

// var app2 = new Vue({
//   el: '#app-2',
//   data: {
//     message: 'You loaded this page on ' + new Date().toLocaleString()
//   }
// })
