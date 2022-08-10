import db from '../models/index'
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let createNewUser = async(data) => {
    return new Promise( async (resolve, reject) => {
        try{
            let hashPassWordFromBcrypt  = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassWordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address : data.address,
                gender : data.gender === '1'? true:false,
                phoneNumber : data.phonenumber,
                roleId : data.roleid,
            })
            resolve('ok xu ly thanh cong')
        }catch(err){
            reject(err);
        }
    })
    
}   
let hashUserPassword = (password)=> {
    return  new Promise( async (resolve,reject) => {
        try{
            let hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord)
        }catch(e) {
                reject(e);
        }
    })
}
let getAllUser = () => {
    return new Promise( async (resolve,reject) => {
        try{
            let users = await db.User.findAll();
            resolve(users)
        }catch(e) {
            reject(e);  
        }
    })
}
let getUserById = (userId)=> {
    return new Promise( async (resolve,reject) => {
        try{
                let user = await db.User.findOne({
                    where : {id : userId}
                        });
                resolve(user)
        }catch(e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
   return new Promise( async (resolve,reject) => {
        try {
            let user = await db.User.findOne({where : {id : data.id}});
            if(user){
               user.firstName = data.firstname;
               user.lastName = data.lastname;
               user.address = data.address;
               await user.save();
                let allUser = await db.User.findAll();
               resolve(allUser);
            }
            }
            catch(error) {
                console.log(error);
        } }
   )
   }
module.exports = {
    createNewUser: createNewUser,
    getAllUser : getAllUser,
    getUserById : getUserById,
    updateUserData : updateUserData

}