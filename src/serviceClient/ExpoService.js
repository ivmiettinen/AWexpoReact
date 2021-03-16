const url = 'http://api.academicwork.net/api/adverts?country=fi';



const herokuProxyUrl = 'https://corsanywherenodejs.herokuapp.com/';

export const getWorkData = async () => {
  return fetch(herokuProxyUrl + url).then(resp => resp.json());
};

export default getWorkData;
