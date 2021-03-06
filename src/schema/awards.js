
        module.exports = 
            { type: 'object',
  title: 'restaurant_awards',
  table: 'restaurant_awards',
  additionalProperties: false,
  properties: 
   { award_id: { type: 'number', description: '奖品id' },
     awardname: { type: 'string', description: '奖品名称' },
     total_amount: { type: 'number', description: '总数量', default: '0' },
     rest_amount: { type: 'number', description: '剩余数量', default: '0' },
     receive_amount: { type: 'number', description: '接收数量', default: '0' },
     send_amount: { type: 'number', description: '发放数量', default: '0' },
     manual_amount: { type: 'number', description: '人工干预数量', default: '0' },
     is_manual: 
      { type: 'number',
        description: '是否人工干预（0：不干预，1：干预）',
        default: '0' },
     type: 
      { type: 'number',
        description: '奖品类型（0：实物，1：电子礼券,2:红包,3：积分，4:兑换码）' },
     rate: { type: 'number', description: '概率份额', default: '0' },
     markettype: { type: 'number', description: '超市类型' } },
  required: 
   [ 'award_id',
     'awardname',
     'total_amount',
     'rest_amount',
     'receive_amount',
     'send_amount',
     'manual_amount',
     'is_manual',
     'rate',
     'markettype' ] }
      