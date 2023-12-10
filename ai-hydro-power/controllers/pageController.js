const statesInIndia = {
    'Andhra Pradesh': 'Andhra Pradesh',
    'Arunachal Pradesh': 'Arunachal Pradesh',
    'Assam': 'Assam',
    'Bihar': 'Bihar',
    'Chhattisgarh': 'Chhattisgarh',
    'Goa': 'Goa',
    'Gujarat': 'Gujarat',
    'Haryana': 'Haryana',
    'Himachal Pradesh': 'Himachal Pradesh',
    'Jharkhand': 'Jharkhand',
    'Karnataka': 'Karnataka',
    'Kerala': 'Kerala',
    'Madhya Pradesh': 'Madhya Pradesh',
    'Maharashtra': 'Maharashtra',
    'Manipur': 'Manipur',
    'Meghalaya': 'Meghalaya',
    'Mizoram': 'Mizoram',
    'Nagaland': 'Nagaland',
    'Odisha': 'Odisha',
    'Punjab': 'Punjab',
    'Rajasthan': 'Rajasthan',
    'Sikkim': 'Sikkim',
    'Tamil Nadu': 'Tamil Nadu',
    'Telangana': 'Telangana',
    'Tripura': 'Tripura',
    'Uttar Pradesh': 'Uttar Pradesh',
    'Uttarakhand': 'Uttarakhand',
    'West Bengal': 'West Bengal',
    'Andaman and Nicobar Islands': 'Andaman and Nicobar Islands',
    'Chandigarh': 'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu': 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi': 'Delhi',
    'Jammu and Kashmir': 'Jammu and Kashmir',
    'Ladakh': 'Ladakh',
    'Puducherry': 'Puducherry'
  };

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

const rainFallAnalysis = async(req,res)=>{
    res.render('rainfall',{statesInIndia})
}


module.exports = { homePage,dashBoard,genPandIPage,genP2IPage,genHome,rainFallAnalysis }