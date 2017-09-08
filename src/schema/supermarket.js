
        module.exports = 
            { type: 'object',
  title: 'restaurant_supermarket',
  table: 'restaurant_supermarket',
  additionalProperties: false,
  properties: 
   { type: { type: 'number', description: '超市的id' },
     name: { type: 'string', description: '超市名' },
     starttime: { type: 'string', description: '开始时间' },
     endtime: { type: 'string', description: '结束时间' } },
  required: [ 'type' ] }
      