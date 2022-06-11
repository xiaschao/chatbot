(() => {
  const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) return '账号不能为空';
    const resp = await API.exists(val);
    if (resp.data) {
      return '账号已存在，请重新输入一个账号名';
    }
  });

  const nicknameValidator = new FieldValidator('txtNickname', function (val) {
    if (!val) return '请填写昵称';
  });

  const pwdValidator = new FieldValidator('txtLoginPwd', (val) => {
    if (!val) return '密码不能为空';
  });

  const pwdAgainValidator = new FieldValidator('txtLoginPwdConfirm', (val) => {
    if (!val) return '请填写确认密码';
    if (val !== $('#txtLoginPwd').value) {
      return '密码不一致';
    }
  });

  const form = $('.user-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await FieldValidator.validate(
      loginIdValidator,
      nicknameValidator,
      pwdValidator,
      pwdAgainValidator
    );
    if (!res) {
      return;
    }

    const fromData = new FormData(form);
    const dataObj = Object.fromEntries(fromData.entries());
    // console.log(dataObj);

    const resp = await API.reg(dataObj);
    // console.log(resp);
    if (resp.code === 0) {
      alert('注册成功，点击确定跳转登录页面');
      location.href = './login.html';
    }
  });
})();
