const getData = () => {
  return fetch('http://localhost:3001/api/v1/users').then((response) =>
    response.json()
  );
};

const getHydration = () => {
  return fetch('http://localhost:3001/api/v1/hydration').then((response) =>
    response.json()
  );
};

const getSleep = () => {
  return fetch('http://localhost:3001/api/v1/sleep').then((response) =>
    response.json()
  );
};

const getAllData = () => {
  return Promise.all([getData(), getHydration(), getSleep()]);
};

export default getAllData;
