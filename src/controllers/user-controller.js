const interestService = require("../services/interest-service")

const userController = {}

userController.findEventListOfUser = async (req, res, next) => {
    try {
        const user = req.user
        const userInterest = await interestService.findInterestByUserId(user.id)
        console.log(userInterest)
        // res-frontEnd => [{id,eventName,eventImage,eventStartDate,eventEndDate,sellerId,sellerFirstName,sellerCoverImage}]

        const eventInterest = userInterest.map(el => {
            const obj = {}
            obj.id = el.id
            obj.eventName = el.event.name
            obj.eventImage = el.event.images
            obj.eventStartDate = el.event.startDate
            obj.eventEndDate = el.event.endDate
            obj.sellerId = el.event.storeProfile.id
            obj.sellerFirstName = el.event.storeProfile.user.firstName
            obj.sellerCoverImage = el.event.storeProfile.user.profileImage
            return obj
        })

        res.json(eventInterest)
    } catch (err) {
        next(err)
    }
}

module.exports = userController