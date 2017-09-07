// 跨域
module.exports = (req,res,next)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , Cookie');
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
}
