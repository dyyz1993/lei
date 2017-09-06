const Ajv = require('ajv');
var ajv = new Ajv({ownProperties:true,allErrors: true,removeAdditional: true,useDefaults: true,coerceTypes: true });
require('ajv-errors')(ajv);
var schema = {
  title:'Person',
  type:'object',
  additionalProperties: false,
  properties:{
    firstName:{
      type:'string',
      description:'firstName',
      errorMessage:{
        type: "你TM是不是傻逼，要写string类型啊",
        required:'必填'
      }
    },
    child:{
      type:"array",
      items:[
        {
          type:'object',
          errorMessage:{
            type:'儿子必须是一个对象'
          }
        }],
        errorMessage:{
          type:'必须是一个数组'
        }
    },
    lastName:{
      type:'string'
    },
    url:{
      type:'string',
      format:'uri',
      errorMessage:{
        format:'URL格式不对'
      }
    },
    email:{
      type:'string',
      format:'email'
    },
    // tel:{
    //   type:'string',
    //   format:'phone'
    // },
    age:{
      description:'age in years',
      type:'integer',
      minimum:0,
      errorMessage:{
        type:'类型不对',
        minimum:'不能小于0'
      }
    }
  },
  required:['firstName','lastName'],
}

var data = {
  "firstName":111,
  "foo": 222,
  "pro":1,
  url:'000',
  age:-1,
  email:'dyyz1993@qq.com',
  child:[{}],
  "pro1":5,
 // "additional1": 1, // will be removed; `additionalProperties` == false
  "bar": {
    "baz": "abc",
    "additional2": 2 // will NOT be removed; `additionalProperties` != false
  },
}

var validate = ajv.compile(schema);

// console.log(ajv)

console.log(ajv.validateSchema(schema))

// console.log(ajv.getSchema('bar'))



// ajv.removeSchema(schema);
console.log(validate(data)); // true
// console.log(validate)
console.log(ajv.errorsText(validate.errors)); 
// { "foo": 0, "bar": { "baz": "abc", "additional2": 2 }
console.log(validate.errors);

console.log(data)
var result = ajv.getKeyword("bar")
var result = ajv.getSchema("foo")
var result = ajv.errorsText("foo")

// var result = ajv.getKeyword();


// console.log(ajv)