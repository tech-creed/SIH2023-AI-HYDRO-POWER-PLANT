const express = require("express")
const router = express.Router()

// route controller
const pageController = require("../controllers/pageController")


router.get("/",pageController.homePage)
router.get("/dashboard",pageController.dashBoard)
router.get("/2d-gen",pageController.genHome)
router.get("/prompt-to-img",pageController.genP2IPage)
router.get("/prompt-and-img",pageController.genPandIPage)
router.get("/rainfallanalysis",pageController.rainFallAnalysis)
router.post("/text2img",pageController.postGen)
router.get("/river",pageController.river)

module.exports = router