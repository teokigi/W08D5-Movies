<template lang="html">
  <div class="film-wrapper">

    <film-grid-item v-if="!selectedFilm" v-for="(film, index) in films" :key="index" :film="film" />

    <film-detail v-if="selectedFilm" :film="selectedFilm" />
  </div>
</template>

<script>
import FilmGridItem from './FilmGridItem'
import MoviesService from '@/services/MoviesService.js'
import FilmDetail from '@/components/FilmDetail.vue'
import {eventBus} from '@/main.js'
export default {

    data(){
        return {
          films: [],
          selectedFilm: null
        };
    },

    mounted(){
        MoviesService.getMovies()
        .then(films => this.films = films),

        eventBus.$on('select-film',id =>{
            MoviesService.getMovie(id)
            .then(filmFromServer => this.selectedFilm = filmFromServer)
        })

        eventBus.$on('de-select-film', film => this.selectedFilm = null)

        eventBus.$on('delete-film',id =>{
            MoviesService.deleteMovie(id)
            const index = this.films.findIndex(film => film._id === id);
            this.films.splice(index,1);
        })
    },

    components: {
        'film-grid-item': FilmGridItem,
        'film-detail':FilmDetail
    }
}
</script>

<style lang="css" scoped>

.film-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
