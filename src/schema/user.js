module.exports = {
  "type": "object",
  "title": "base_user",
  "additionalProperties": false,
  "properties": {
    "username": {
      "type": "string",
      "description": "用户名"
    },
    "password": {
      "type": "string",
      "description": "用户密码"
    },
    "type": {
      "type": "number",
      "description": "普通用户 1  超级管理员(可以修改) 2",
      "default": "1"
    },
    "e": {
      "type": "string",
      "enum": ["1", "2", "3", "4"]
    },
    "time": {
      "type": "string",
    }
  },
  "required": ["username", "password"]
}