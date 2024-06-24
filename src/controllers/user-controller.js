const interestService = require("../services/interest-service")

const userController = {}

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