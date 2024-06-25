const interestService = require("../services/interest-service")

const userController = {}


userController.getMe = (req,res,next)=>{
    res.status(200).json({user: req.user})
}

userController.findEventListOfUser = async (req, res, next) => {
    try {
        const user = req.user
        const userInterest = await interestService.findInterestByUserId(user.id)
        console.log(user)
        res.json(user)
    } catch (err) {
        next(err)
    }
}

module.exports = userController