const express = require("express")
const multer = require('multer');
const path = require('path');

const router = express.Router()


const pageController = require("../controllers/pageController")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

router.get("/",pageController.homePage)
router.get("/dashboard",pageController.dashBoard)
router.get("/2d-gen",pageController.genHome)
router.get("/prompt-to-img",pageController.genP2IPage)
router.get("/prompt-and-img",pageController.genPandIPage)
router.get("/rainfall-analysis",pageController.rainFallAnalysis)
router.post("/text2img",pageController.postGen)
router.get("/river-analysis",pageController.river)
router.get("/meta-data",pageController.meta)
router.get("/river-data",pageController.river_data)
router.post('/img2img',upload.fields([{ name: 'image' }, { name: 'mask' }]),pageController.postGen2)

module.exports = router