

exports.isAdmin = async (req,res,next)=>{
  try {
    const role = req.user.role
    if(role !== "ADMIN"){
      console.log("not admin", role)
      res.status(401).json({message: "Not allowed to access"})
    }
    next()
  } catch (error) {
    next(error)
  }
}