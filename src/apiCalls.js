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

const postData = (postObject, type) => {
  fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postObject),
  });
};

export default getAllData;
