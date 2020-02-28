const url = 'http://api.academicwork.net/api/adverts?country=fi';

// const LocalProxyURL = 'http://localhost:8080/';

const herokuProxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const getWorkData = async () => {
  return fetch(herokuProxyUrl + url).then(resp => resp.json());
};

export default getWorkData;
