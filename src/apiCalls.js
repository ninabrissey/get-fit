const getData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`).then((response) =>
    response.json()
  );
};

const getAllData = () => {
  return Promise.all([
    getData('users'),
    getData('hydration'),
    getData('sleep'),
    getData('activity'),
  ]);
};

export default getAllData;
