
        module.exports = 
 { type: 'object',
  title: 'restaurant_supermarket_wx_user',
  table: 'restaurant_supermarket_wx_user',
  additionalProperties: false,
  properties: 
   { id: { type: 'number' },
     openid: { type: 'string', description: 'openid' },
     awardname: { type: 'string', description: '奖品的名称' },
     award_id: { type: 'number', description: '奖品ID' },
     cuisine_type: { type: 'number', description: '菜品类型ID' },
     username: { type: 'string', description: '收货人' },
     ischance: { type: 'number', description: '是否有抽奖机会 0没有 1有', default: '1' },
     markettype: { type: 'number', description: '超市类型' },
     mobile: { type: 'string', description: '填写的手机号码' },
     area: { type: 'string', description: '收货区域' },
     address: { type: 'string', description: '填写的收货地址' },
     identity_card: { type: 'string', description: '身份证' },
     url: { type: 'string', description: '填写的URL' },
     cdkey: { type: 'string', description: '激活码' },
     amount: { type: 'number', description: '金额 单位分' },
     type: 
      { type: 'number',
        description: '奖品类型（0：实物，1：电子礼券,2:红包,3：积分，4:兑换码）' },
     isdeal: { type: 'number', description: '是否处理  0 处理 1未处理', default: '0' },
     remark: { type: 'string', description: '备注消息' },
     lotterytime: { type: 'string', description: '抽奖的时间' },
     createtime: { type: 'string', default: 'CURRENT_TIMESTAMP' } },
  required: [ 'id', 'openid', 'ischance', 'markettype' ] }
      