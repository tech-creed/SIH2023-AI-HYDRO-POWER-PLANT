const homePage = async(req,res)=>{
    res.render('index')
}

const dashBoard = async(req,res)=>{
    res.render('dashboard')
}

module.exports = { homePage,dashBoard }