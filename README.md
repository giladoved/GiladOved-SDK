# The One JavscriptSDK

Use this SDK to retrieve data about the Lord of the Rings movies

# Setup

```
npm install lord-of-the-rings-javascript-sdk
```

# Setup

## API Key

Signup for an API Key [here](https://the-one-api.dev/sign-up)

## Import SDK

```
// import the library
const { TheOne } = require('lord-of-the-rings-javascript-sdk');

// optionally define the page size - 15 is the default
const PAGE_SIZE = 25;

// create an instance of the SDK
const theOne = new TheOne(<API_KEY>, PAGE_SIZE);
```

# Methods

- `getAllMovies(page?)` - returns list of movies, optional page parameter
- `searchMovieByTitle(search, page?)` - returns list of movies that match, optional page parameter
- `getMovie(movieId)` - returns details about one movie
- `getMovieWithQuotes(movieId, page?)` - returns details about one movie with list of quotes, optional page parameter for the quotes

# Usage

## Get All Movies

```
theOne
  .getAllMovies()
  .then((movies) => console.log(movies))
  .catch((error) => console.log(error));
```

Sample response:

```
{
  docs: [
    {
      _id: '5cd95395de30eff6ebccde5c',
      name: 'The Fellowship of the Ring',
      runtimeInMinutes: 178,
      budgetInMillions: 93,
      boxOfficeRevenueInMillions: 871.5,
      academyAwardNominations: 13,
      academyAwardWins: 4,
      rottenTomatoesScore: 91
    },
    {
      _id: '5cd95395de30eff6ebccde5d',
      name: 'The Return of the King',
      runtimeInMinutes: 201,
      budgetInMillions: 94,
      boxOfficeRevenueInMillions: 1120,
      academyAwardNominations: 11,
      academyAwardWins: 11,
      rottenTomatoesScore: 95
    }
    ...
  ],
  total: 8,
  limit: 15,
  page: 1,
  pages: 1
}
```

With paging:

```
var page = 2;
theOne
  .getAllMovies(page)
  .then((movies) => console.log(movies))
  .catch((error) => console.log(error));
```

Search by Title:

```
theOne
  .searchMovieByTitle('Series')
  .then((movies) => console.log(movies))
  .catch((error) => console.log(error));
```

## Get Movie Details

```
theOne
  .getMovie('5cd95395de30eff6ebccde57')
  .then((movieDetails) => console.log(movieDetails))
  .catch((error) => console.log(error));
```

Sample Response:

```
{
  _id: '5cd95395de30eff6ebccde57',
  name: 'The Hobbit Series',
  runtimeInMinutes: 462,
  budgetInMillions: 675,
  boxOfficeRevenueInMillions: 2932,
  academyAwardNominations: 7,
  academyAwardWins: 1,
  rottenTomatoesScore: 66.33333333
}
```

Get movie details with quotes:

```
theOne
  .getMovieWithQuotes('5cd95395de30eff6ebccde57')
  .then((movieDetails) => console.log(movieDetails))
  .catch((error) => console.log(error));
```

Sample response:

```
{
  _id: '5cd95395de30eff6ebccde57',
  name: 'The Hobbit Series',
  runtimeInMinutes: 462,
  budgetInMillions: 675,
  boxOfficeRevenueInMillions: 2932,
  academyAwardNominations: 7,
  academyAwardWins: 1,
  rottenTomatoesScore: 66.33333333,
  quotes: { docs: [], total: 0, limit: 1000, page: 1, pages: 1 }
}
```

With paging:

```
var page = 2;
theOne
  .getMovieWithQuotes('5cd95395de30eff6ebccde5d', page)
  .then((movieDetails) => console.log(movieDetails))
  .catch((error) => console.log(error));
```

## Tests

Run the tests by running: `npm test`
