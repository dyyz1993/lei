
module.exports = 
{ type: 'object',
  title: 'restaurant_wx_user',
  table: 'restaurant_wx_user',
  additionalProperties: false,
  properties: 
   { user_id: { type: 'number' },
     openid: { type: 'string' },
     headimgurl: { type: 'string' },
     nickname: { type: 'string' },
     sex: { type: 'string' },
     city: { type: 'string' },
     province: { type: 'string' },
     country: { type: 'string' },
     cnl: { type: 'string' },
     subscribe: { type: 'number', description: '是否关注', default: '0' },
     createtime: 
      { type: 'string',
        description: '用户进来的时间',
        default: 'CURRENT_TIMESTAMP' },
     ip: { type: 'string', description: '用户IP' },
     useragent: { type: 'string', description: 'User-Agent' },
     isblock: { type: 'number', description: '是否拉黑', default: '0' } },
  required: [ 'user_id', 'openid', 'ip', 'isblock' ] }
      