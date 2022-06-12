(() => {
  const loginAccount = new FieldValidator('txtLoginId', (val) => {
    if (!val) return '请输入账号';
  });

  const loginPsd = new FieldValidator('txtLoginPwd', (val) => {
    if (!val) return '请输入密码';
  });

  const loginForm = $('.user-form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await FieldValidator.validate(loginAccount, loginPsd);
    // console.log(res);
    if (!res) return;
    const { data } = await API.exists(loginAccount.input.value);
    // console.log(data);
    if (!data) {
      alert('账号不存在，点击确定，重新输入');
      $('#txtLoginPwd').value = '';
      $('#txtLoginId').value = '';
      return;
    }

    const fromData = new FormData(loginForm);
    const dataObj = Object.fromEntries(fromData.entries());
    const resp = await API.login(dataObj);
    console.log(resp);
    if (resp.code !== 0) {
      alert('密码错误，点击确定，重新输入');
      $('#txtLoginPwd').value = '';
      return;
    } else {
      alert('登录成功，点击确定，跳转聊天机器人首页');
      location.href = './index.html';
    }
  });
})();
