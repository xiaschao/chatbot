var API = (function () {
  const BASE_URL = 'https://study.duyiedu.com';
  const TOKEN_KEY = 'token';

  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) headers.authorization = `Bearer ${token}`;
    return fetch(BASE_URL + path, { headers });
  }

  function post(path, bodyObj) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) headers.authorization = `Bearer ${token}`;
    return fetch(BASE_URL + path, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyObj),
    });
  }

  async function reg(userInfo) {
    const resp = await post('/api/user/reg', userInfo);
    return await resp.json();
  }

  function login(loginInfo) {
    return post('/api/user/login', loginInfo).then((resp) => {
      const result = resp.json();
      if (result.code === 0) {
        localStorage.setItem(TOKEN_KEY, resp.headers.get('authorization'));
      }
      return result;
    });
  }

  function exists(loginId) {
    return get(`/api/user/exists?loginId=${loginId}`).then((resp) => resp.json());
  }

  function profile() {
    return get('/api/user/profile').then((resp) => resp.json());
  }

  function sendChat(content) {
    return post('/api/chat', content).then((resp) => resp.json());
  }

  function getChatHistory() {
    return get('/api/chat/history').then((resp) => resp.json());
  }
  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getChatHistory,
  };
})();
