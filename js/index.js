(async () => {
  const { code, data } = await API.profile();
  if (code !== 0) {
    alert('请先进行登录');
    location.href = './login.html';
    return;
  }
  // console.log(data);

  const doms = {
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId'),
    },
    close: $('.close'),
    chatContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    msgContainer: $('.msg-container'),
  };

  // console.log(data);
  doms.aside.nickname.innerText = data.nickname;
  doms.aside.loginId.innerText = data.loginId;
  doms.close.addEventListener('click', () => {
    localStorage.removeItem(API.TOKEN_KEY);
    location.href = './login.html';
  });

  // content: "你好"
  // createdAt: 1655022539153
  // from: "xiaschao"
  // to: null
  // _id: "62a5a3cb0ca69231c87219e1"
  function addChat(chatInfo) {
    const chatItem = document.createElement('div');
    chatItem.classList.add('chat-item');
    if (chatInfo.from) chatItem.classList.add('me');

    const chatAvatar = document.createElement('img');
    chatAvatar.classList.add('chat-avatar');
    chatAvatar.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';
    const chatContent = document.createElement('div');
    chatContent.classList.add('chat-content');
    chatContent.innerText = chatInfo.content;
    const chatDate = document.createElement('div');
    chatDate.classList.add('chat-date');
    chatDate.innerText = dataFormat(chatInfo.createdAt);

    chatItem.appendChild(chatAvatar);
    chatItem.appendChild(chatContent);
    chatItem.appendChild(chatDate);
    doms.chatContainer.appendChild(chatItem);
  }

  function dataFormat(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  // addChat({
  //   content: '你',
  //   createdAt: 1655022539153,
  //   from: 'xiaschao',
  //   to: null,
  //   _id: '62a5a3cb0ca69231c87219e1',
  // });

  const { data: hisData } = await API.getChatHistory();
  // console.log(hisData);
  hisData.forEach((item) => addChat(item));
  doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;

  async function sendMessage(content) {
    if (!content) return;
    addChat({
      content: content,
      createdAt: new Date(),
      from: data.loginId,
      to: null,
    });
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;

    doms.txtMsg.value = '';

    const { data: resp } = await API.sendChat(content);
    console.log(resp);
    addChat({
      content: resp.content,
      createdAt: resp.createdAt,
      from: null,
      to: data.loginId,
    });
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  doms.msgContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(doms.txtMsg.value);
  });
})();
