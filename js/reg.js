(function () {
  function $(selector) {
    return document.querySelector(selector);
  }

  const regDoms = {
    account: $('#txtLoginId'),
    nickname: $('#txtNickname'),
    password: $('#txtLoginPwd'),
    passwordConfirm: $('#txtLoginPwdConfirm'),
    regBtn: $('.form-group .submit'),
  };

  function bindEvent() {
    regDoms.passwordConfirm.addEventListener('change', function () {
      const pwd = regDoms.password.value;
      if (this.value !== pwd) {
        alert('密码输入与上次不一致，请重新输入');
        this.value = '';
        regDoms.password.value = '';
      }
    });
  }

  bindEvent();
})();
