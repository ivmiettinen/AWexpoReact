const url = 'http://api.academicwork.net/api/adverts?country=fi';

const proxyURL = 'http://localhost:8080/';

export const getWorkData = async () => {
  return fetch(proxyURL + url).then(resp => resp.json());
};

export default getWorkData;
