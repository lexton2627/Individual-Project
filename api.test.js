const axios = require('axios');
API_URL="http://localhost:5000/api"
//Test cause to see if the first user if "mary123"
test('test device array', () => {
  expect.assertions(1);
  return axios.get(`${API_URL}/devices`)
    .then(resp => resp.data)
    .then(resp => {
      expect(resp[0].name).toEqual('Smart light');
    });
});