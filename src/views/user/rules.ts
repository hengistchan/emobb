export const registerRules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  confirm_password: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
  ],
  code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
  email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
};
