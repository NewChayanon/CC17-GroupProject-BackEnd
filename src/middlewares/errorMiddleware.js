const errorMiddleware = (err,req,res,next)=>{
  console.log(err)
  res.status(err.statusCode || 500).json({message: err.message})
}


module.exports = errorMiddleware;