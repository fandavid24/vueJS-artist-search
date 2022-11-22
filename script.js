const { createApp } = Vue

createApp({
  data() {
    return {
      term: '',
      origin: [],
      data: [],
      shown: [],
      genres: [{
        'genre': "ALL",
        'clicked': true
      }],
      shownGenres: new Set(),
      sort: [true, false, false]
    }
  },
  methods: {
    async searchArtist() {
      const res = await fetch('https://itunes.apple.com/search?attribute=allArtistTerm&term=' + this.term)
      const { results } = await res.json()
      this.data = results
      this.shown = results
      this.origin = [...results]
      console.log(this.data)
      genreFilter = new Set()
      for (var idx in this.data) {
        // console.log(obj["primaryGenreName"])
        genreFilter.add(this.data[idx]["primaryGenreName"])
      }
      genreFilter = Array.from(genreFilter);
      this.genres = [{
        'genre': "ALL",
        'clicked': true
      }]
      idx = 0
      for (var entry in genreFilter){
        temp = {
          'genre': genreFilter[idx],
          'clicked': false
        }
        this.genres.push(temp)
        idx++
      }
      // console.log(genreFilter)
      // console.log(this.genres)
    },
    btnClick(index){
      shownGenres = new Set()
      this.genres[index]["clicked"] = !this.genres[index]["clicked"]
      if(index == 0){
        for (let i = 1; i < this.genres.length; i++) {
          this.genres[i]['clicked'] = true
        }
      }
      var CLICKED = 0
      for (let i = 1; i < this.genres.length; i++) {
        if( this.genres[i]['clicked'] == true){
          CLICKED = CLICKED + 1
          shownGenres.add(this.genres[i]['genre'])
        }
      }
      this.shownGenres = shownGenres
      // console.log(this.shownGenres)
      if(CLICKED == 0){
        this.genres[0]['clicked'] = true
      }
      else if(CLICKED == this.genres.length-1){
        this.genres[0]['clicked'] = true
        for (let i = 1; i < this.genres.length; i++) {
          this.genres[i]['clicked'] = false
        }
      }
      else{
        this.genres[0]['clicked'] = false
      }
      this.render()
    },
    sortBy(index){
      if(index == 0){
        this.sort[0] = true
        this.sort[1] = false
        this.sort[2] = false
        this.data = [...this.origin]
        this.render()
      }
      else if(index == 1){
        this.sort[0] = false
        this.sort[1] = true
        this.sort[2] = false
        this.data.sort((a, b) => { 
          if(a['collectionName'] < b['collectionName']){return -1} 
          if(a['collectionName'] > b['collectionName']){return 1} 
          return 0
        })
        this.render()
      }
      else if(index == 2){
        this.sort[0] = false
        this.sort[1] = false
        this.sort[2] = true
        this.data.sort((a, b) => { 
          if(a['collectionPrice'] < b['collectionPrice']){return -1} 
          if(a['collectionPrice'] > b['collectionPrice']){return 1} 
          return 0
        })
        this.render()
      }
    },
    render(){
      if(this.shownGenres.size == 0){
        this.shown = this.data
      }
      else{
        this.shown = []
        for (entry of this.data){
          if(this.shownGenres.has(entry.primaryGenreName)){
            this.shown.push(entry)
          }
        }
      }
    }
  },
}).mount('#app')
