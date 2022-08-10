import db from '../models/index'
import CRUDServices from '../services/CRUDservices'

let getHomePage = async (req,res) => {
    try{
        let data = await db.User.findAll();
        console.log(JSON.stringify(data));
        return res.render('index',{data : JSON.stringify(data)})
    }
    catch (e) {
        console.log(e)
    }
}

let getCRUD =  (req,res) => {
    return res.render('crud.ejs')

}

let postCrud = async (req,res) => {
   let message =  await CRUDServices.createNewUser(req.body)
    console.log(message)
    return res.send("post crud")

}


let displayGetCrud = async (req,res) => {
    let data = await CRUDServices.getAllUser();
    console.log("--------------")
    console.log(data)
    return res.render('displayCRUD',{dataTable : data})
}
let getEditCRUD = async (req,res) => {
    let getid = req.query.id;
    if(getid){
        let userData = await CRUDServices.getUserById(getid);
       return res.render('editCRUD',{userData : userData})
    }
    else {
        return res.send("user not found")
    }
   
}
let putCRUD =  async (req,res) => {
    let data  = req.body;
 let allUser = await CRUDServices.updateUserData(data);
  return res.render('displayCRUD',{dataTable : allUser})
    
}
module.exports = {
    getHomePage,
    getCRUD,
    postCrud,
    displayGetCrud,
    getEditCRUD,
    putCRUD
}