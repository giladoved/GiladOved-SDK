const TheOne = require('../src/the-one');

const axios = require('axios');
const mockAxios = jest.genMockFromModule('axios');
mockAxios.create = jest.fn(() => mockAxios);

jest.mock('axios-retry', () => {
  return jest.fn().mockImplementation();
});

let apiSpy;
const axiosMock = jest.fn();
const axiosMockGet = jest.fn();

const theOne = new TheOne('TEST_TOKEN');
theOne.fetcher = axiosMock;
theOne.fetcher.get = axiosMockGet;

const sampleMoviesData = {
  docs: [
    {
      _id: '5cd95395de30eff6ebccde5c',
      name: 'The Fellowship of the Ring',
      runtimeInMinutes: 178,
      budgetInMillions: 93,
      boxOfficeRevenueInMillions: 871.5,
      academyAwardNominations: 13,
      academyAwardWins: 4,
      rottenTomatoesScore: 91,
    },
    {
      _id: '5cd95395de30eff6ebccde5d',
      name: 'The Return of the King',
      runtimeInMinutes: 201,
      budgetInMillions: 94,
      boxOfficeRevenueInMillions: 1120,
      academyAwardNominations: 11,
      academyAwardWins: 11,
      rottenTomatoesScore: 95,
    },
  ],
  total: 8,
  limit: 15,
  page: 1,
  pages: 1,
};

const sampleMovieData = {
  _id: '5cd95395de30eff6ebccde57',
  name: 'The Hobbit Series',
  runtimeInMinutes: 462,
  budgetInMillions: 675,
  boxOfficeRevenueInMillions: 2932,
  academyAwardNominations: 7,
  academyAwardWins: 1,
  rottenTomatoesScore: 66.33333333,
};

const sampleMovieDataWithQuotes = {
  _id: '5cd95395de30eff6ebccde57',
  name: 'The Hobbit Series',
  runtimeInMinutes: 462,
  budgetInMillions: 675,
  boxOfficeRevenueInMillions: 2932,
  academyAwardNominations: 7,
  academyAwardWins: 1,
  rottenTomatoesScore: 66.33333333,
  quotes: { docs: [], total: 0, limit: 1000, page: 1, pages: 1 },
};

describe('TheOne', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('test getAllMovies', async () => {
    axiosMockGet.mockResolvedValue({
      data: sampleMoviesData,
    });
    const res = await theOne.getAllMovies();
    expect(axiosMockGet).toBeCalledTimes(1);
    expect(axiosMockGet).toBeCalledWith('/movie', {
      params: { limit: 15, page: 1 },
    });
    expect(res).toEqual(sampleMoviesData);
  });
  it('test getAllMovies page', async () => {
    axiosMockGet.mockResolvedValue({
      data: sampleMoviesData,
    });
    let page = 2;
    const res = await theOne.getAllMovies(page);
    expect(axiosMockGet).toBeCalledTimes(1);
    expect(axiosMockGet).toBeCalledWith('/movie', {
      params: { limit: 15, page: 2 },
    });
    expect(res).toEqual(sampleMoviesData);
  });
  it('test searchMovieByTitle', async () => {
    axiosMockGet.mockResolvedValue({
      data: sampleMoviesData,
    });
    const res = await theOne.searchMovieByTitle('Lord');
    expect(axiosMockGet).toBeCalledTimes(1);
    expect(axiosMockGet).toBeCalledWith('/movie', {
      params: { limit: 15, page: 1, name: /Lord/i },
    });
    expect(res).toEqual(sampleMoviesData);
  });
  it('test getMovie', async () => {
    axiosMockGet.mockResolvedValue({
      data: {
        docs: [sampleMovieData],
      },
    });
    let movieId = '1234';
    const res = await theOne.getMovie(movieId);
    expect(axiosMockGet).toBeCalledTimes(1);
    expect(axiosMockGet).toBeCalledWith('/movie/1234');
    expect(res).toEqual(sampleMovieData);
  });
  it('test getMovieWithQuotes', async () => {
    axiosMockGet.mockResolvedValue({
      data: {
        docs: [sampleMovieDataWithQuotes],
      },
    });
    let movieId = 1234;
    const res = await theOne.getMovie(movieId);
    expect(axiosMockGet).toBeCalledTimes(1);
    expect(axiosMockGet).toBeCalledWith('/movie/1234');
    expect(res).toEqual(sampleMovieDataWithQuotes);
  });
  it('test getMovie parsing error', async () => {
    axiosMockGet.mockResolvedValue({
      data: [sampleMovieData],
    });
    theOne
      .getMovie()
      .then(() => {})
      .catch((error) => {
        expect(error).toEqual(
          'There was an error parsing the results'
        );
      });
  });
});
