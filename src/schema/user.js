
        module.exports = 
            { type: 'object',
  title: 'restaurant_user',
  table: 'restaurant_user',
  additionalProperties: false,
  properties: 
   { username: { type: 'string', description: '用户名' },
     password: { type: 'string', description: '用户密码' },
     type: 
      { type: 'number',
        description: '普通用户 1  超级管理员(可以修改) 2',
        default: '1' } },
  required: [ 'username', 'password' ] }
      