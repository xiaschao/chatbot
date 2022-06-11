class FieldValidator {
  /**
   *
   * @param {string} txtId 文本框的id
   * @param {Function} validatorFunc 表单验证规则函数
   */
  constructor(txtId, validatorFunc) {
    this.input = document.getElementById(txtId);
    this.errP = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.onblur = () => {
      this.validate();
    };
  }

  async validate() {
    const err = await this.validatorFunc(this.input.value);
    // console.log(err);
    if (err) {
      this.errP.innerText = err;
      return false;
    } else {
      this.errP.innerText = '';
      return true;
    }
  }

  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    const results = await Promise.all(proms);
    return results.every((r) => r);
  }
}
