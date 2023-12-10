const homePage = async(req,res)=>{
    res.render('index')
}

const dashBoard = async(req,res)=>{
    res.render('dashboard')
}

const genHome = async(req,res)=>{
    res.render('2d_gen_homepage')
}

const genP2IPage = async(req,res)=>{
    res.render('dashboard')
}

const genPandIPage = async(req,res)=>{
    res.render('dashboard')
}


module.exports = { homePage,dashBoard,genPandIPage,genP2IPage,genHome }