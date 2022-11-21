const { createApp } = Vue

createApp({
  data() {
    return {
      artist1: './img/1.jpg',
      artist2: './img/2.jpg',
      term: '',
      data: [],
      genres: {},
    }
  },
  methods: {
    async searchArtist() {
      const res = await fetch('https://itunes.apple.com/search?entity=song&attribute=artistTerm&term=' + this.term)
      const { results } = await res.json()
      this.data = results
      console.log(this.data)
      genreFilter = new Set()
      for (var idx in this.data) {
        // console.log(obj["primaryGenreName"])
        genreFilter.add(this.data[idx]["primaryGenreName"])
      }
      console.log(genreFilter)
      this.genres = genreFilter

      console.log(this.genres)
      // this.data[1]["primaryGenreName"]
      // this.genreSelect()
    },
    // genreSelect: function () {
    //   for (entry in this.data) {
    //     alert(entry[primaryGenreName])
    //   }
    // },
  }
}).mount('#app')
