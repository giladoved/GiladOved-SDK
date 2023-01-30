const axios = require('axios').default;
const axiosRetry = require('axios-retry');

class TheOne {
  constructor(token, pageSize = 15) {
    // initialize the instance with an api token
    this.token = token;
    this.pageSize = pageSize;

    // setup axios
    this.fetcher = axios.create({
      baseURL: 'https://the-one-api.dev/v2/',
      timeout: 1000,
      headers: { Authorization: 'Bearer ' + token },
    });

    // add retry logic if the request fails - 3 retries and exponential backoff
    axiosRetry(this.fetcher, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  getAllMovies(page = 1) {
    return this.#fetchMovies(page);
  }

  searchMovieByTitle(search, page = 1) {
    return this.#fetchMovies(page, search);
  }

  getMovie(movieId, page = 1) {
    return this.#fetchMovie(movieId, page);
  }

  getMovieWithQuotes(movieId, page = 1) {
    return this.#fetchMovieWithQuotes(movieId, page);
  }

  #fetchMovies(page = 1, search) {
    return new Promise((resolve, reject) => {
      const params = {
        page: page,
        limit: this.pageSize,
      };
      if (search) {
        const regex = new RegExp(search, 'i');
        params['name'] = regex;
      }
      this.fetcher
        .get('/movie', {
          params: params,
        })
        .then(function (response) {
          const data = response.data;
          return resolve(data);
        })
        .catch(function (error) {
          console.log(error);
          return reject(error);
        });
    });
  }

  #fetchMovie(movieId, page = 1) {
    return new Promise((resolve, reject) => {
      this.fetcher
        .get(`/movie/${movieId}`)
        .then(function (response) {
          if (response && response.data && response.data.docs) {
            const movieDetails = response.data.docs;
            if (movieDetails.length) {
              return resolve(response.data.docs[0]);
            } else {
              return resolve([]);
            }
          }
          return reject('There was an error parsing the results');
        })
        .catch(function (error) {
          console.log(error);
          return reject(error);
        });
    });
  }

  #fetchMovieWithQuotes(movieId, page = 1) {
    return new Promise((resolve, reject) => {
      axios
        .all([
          this.fetcher.get(`/movie/${movieId}`),
          this.fetcher.get(`/movie/${movieId}/quote`, {
            params: {
              page: page,
            },
          }),
        ])
        .then(
          axios.spread(
            (movieDetailsResponse, movieQuotesResponse) => {
              const movieDetailsWithQuotes =
                movieDetailsResponse.data.docs[0];
              movieDetailsWithQuotes['quotes'] =
                movieQuotesResponse.data;
              return resolve(movieDetailsWithQuotes);
            }
          )
        )
        .catch((error) => {
          return reject(error);
        });
    });

    return new Promise((resolve, reject) => {
      this.fetcher
        .get(`/movie/${movieId}`, {
          params: {
            page: page,
            limit: this.pageSize,
            name: /search/i,
          },
        })
        .then(function (response) {
          const data = response.data;
          return resolve(data);
        })
        .catch(function (error) {
          console.log(error);
          return reject(error);
        });
    });
  }
}

module.exports = TheOne;
