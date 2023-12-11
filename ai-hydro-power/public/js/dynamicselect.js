const stateAndDist = {
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'Y.S.R.'],
    'Arunachal Pradesh': ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey', 'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Siang', 'Upper Siang'],
    'Assam': ['Dhubri', 'Kokrajhar', 'Bongaigaon', 'Goalpara', 'Barpeta', 'Nalbari', 'Darrang', 'Sonitpur', 'Lakhimpur', 'Dhemaji', 'Tinsukia', 'Dibrugarh'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Nalanda', 'Vaishali', 'Darbhanga', 'Purnia', 'Madhubani', 'Saran', 'Begusarai', 'Rohtas'],
    'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Bastar', 'Raigarh', 'Korba', 'Janjgir-Champa', 'Kanker', 'Koriya'],
    'Goa': ['North Goa', 'South Goa'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Anand', 'Panchmahal', 'Bharuch', 'Narmada'],
    'Haryana': ['Ambala', 'Bhiwani', 'Faridabad', 'Gurgaon', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'Himachal Pradesh': ['Kangra', 'Shimla', 'Mandi', 'Sirmaur', 'Una', 'Kullu', 'Chamba', 'Hamirpur', 'Bilaspur', 'Kinnaur', 'Lahaul and Spiti'],
    'Jharkhand': ['Ranchi', 'Dhanbad', 'Bokaro', 'Deoghar', 'Giridih', 'Hazaribagh', 'Jamtara', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Sahebganj', 'Simdega'],
    'Karnataka': ['Bangalore Urban', 'Bangalore Rural', 'Belgaum', 'Bellary', 'Bidar', 'Bijapur', 'Chamarajanagar', 'Chikmagalur', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Gulbarga', 'Hassan', 'Haveri', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysore', 'Raichur', 'Ramanagara', 'Shimoga', 'Tumkur', 'Udupi', 'Uttara Kannada', 'Yadgir'],
    'Kerala': ['Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasargod'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Ratlam', 'Rewa', 'Satna', 'Katni', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha'],
    'Maharashtra': ['Mumbai City', 'Mumbai Suburban', 'Thane', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded', 'Jalgaon', 'Akola', 'Ahmednagar', 'Latur', 'Dhule', 'Raigad', 'Palghar', 'Sangli', 'Satara', 'Beed', 'Osmanabad'],
    'Manipur': ['Imphal East', 'Imphal West', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Senapati', 'Tamenglong', 'Ukhrul'],
    'Meghalaya': ['East Garo Hills', 'West Garo Hills', 'East Khasi Hills', 'West Khasi Hills', 'Jaintia Hills', 'Ri-Bhoi', 'South Garo Hills', 'South West Garo Hills'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Serchhip', 'Kolasib', 'Lawngtlai', 'Mamit'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Mon', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
    'Odisha': ['Khordha', 'Cuttack', 'Balasore', 'Mayurbhanj', 'Jagatsinghpur', 'Kendrapara', 'Puri', 'Bhadrak', 'Jajpur', 'Angul', 'Nayagarh', 'Kandhamal', 'Ganjam', 'Gajapati', 'Rayagada', 'Koraput', 'Malkangiri', 'Nabarangpur', 'Balangir', 'Bargarh', 'Sambalpur', 'Sundergarh', 'Deogarh', 'Jharsuguda', 'Keonjhar', 'Dhenkanal', 'Nuapada', 'Boudh', 'Kalahandi'],
    'Punjab': ['Amritsar', 'Ludhiana', 'Patiala', 'Jalandhar', 'Bathinda', 'Hoshiarpur', 'Pathankot', 'Firozpur', 'Mansa', 'Moga', 'Sangrur', 'Gurdaspur', 'Kapurthala', 'Faridkot', 'Fatehgarh Sahib', 'Rupnagar', 'Shahid Bhagat Singh Nagar (Nawanshahr)', 'Tarn Taran', 'Barnala'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bharatpur', 'Bhilwara', 'Alwar', 'Sikar', 'Pali', 'Jhunjhunu', 'Sawai Madhopur', 'Barmer', 'Nagaur', 'Tonk', 'Rajsamand', 'Dausa', 'Dholpur', 'Hanumangarh', 'Karauli'],
    'Sikkim': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Thoothukudi', 'Erode', 'Thanjavur', 'Dindigul', 'Cuddalore', 'Kanchipuram', 'Tiruvannamalai', 'Kanyakumari', 'Namakkal', 'Villupuram', 'Karur', 'The Nilgiris', 'Perambalur', 'Nagapattinam', 'Krishnagiri', 'Ariyalur', 'Ramanathapuram', 'Virudhunagar', 'Sivaganga', 'Pudukkottai', 'Theni', 'Tirupathur', 'Tenkasi'],
    'Telangana': ['Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri', 'Karimnagar', 'Warangal Urban', 'Nizamabad', 'Khammam', 'Mahabubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Jagtial', 'Bhadradri Kothagudem', 'Sangareddy', 'Kamareddy', 'Nirmal', 'Mancherial', 'Medak'],
    'Tripura': ['West Tripura', 'South Tripura', 'North Tripura', 'Dhalai', 'Khowai', 'Unakoti', 'Gomati', 'Sepahijala'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Varanasi', 'Allahabad', 'Agra', 'Meerut', 'Jhansi', 'Bareilly', 'Aligarh', 'Moradabad', 'Gorakhpur', 'Faizabad', 'Firozabad', 'Noida', 'Etawah', 'Mathura', 'Shahjahanpur', 'Ayodhya', 'Bulandshahr', 'Rampur', 'Banda', 'Saharanpur', 'Mau', 'Basti', 'Amroha', 'Hardoi', 'Unnao', 'Jaunpur', 'Barabanki', 'Sambhal', 'Sitapur', 'Azamgarh'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Almora', 'Pauri Garhwal', 'Tehri Garhwal', 'Udham Singh Nagar', 'Chamoli', 'Rudraprayag', 'Bageshwar', 'Pithoragarh'],
    'West Bengal': ['Kolkata', 'Howrah', 'North 24 Parganas', 'South 24 Parganas', 'Hooghly', 'Purba Medinipur', 'Paschim Medinipur', 'Purulia', 'Nadia', 'Murshidabad', 'Malda', 'Uttar Dinajpur', 'Dakshin Dinajpur', 'Jalpaiguri', 'Cooch Behar', 'Alipurduar', 'Bankura', 'Birbhum', 'Purba Bardhaman', 'Paschim Bardhaman'],
    'Andaman and Nicobar Islands': ['South Andaman', 'North and Middle Andaman', 'Nicobar'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Dadra and Nagar Haveli'],
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Baramulla', 'Anantnag', 'Kupwara', 'Udhampur', 'Pulwama', 'Rajouri', 'Doda', 'Kathua', 'Poonch', 'Samba', 'Kishtwar', 'Ramban', 'Reasi'],
    'Ladakh': ['Leh', 'Kargil'],
    'Puducherry': ['Puducherry', 'Karaikal', 'Yanam', 'Mahe']
  };
  

function ChangecatList() {
    var catList = document.getElementById("state");
    var actList = document.getElementById("district");
    var selCat = catList.options[catList.selectedIndex].value;
    while (actList.options.length) {
        actList.remove(0);
    }
    var cats = stateAndDist[selCat];
    if (cats) {
        var i;
        for (i = 0; i < cats.length; i++) {
            var cat = new Option(cats[i], i);
            actList.options.add(cat);
        }
    }
} 