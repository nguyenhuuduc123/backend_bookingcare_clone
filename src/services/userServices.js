import db from '../models/index'
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);    
let handleUserLogin = (myEmailInput,password) => {
    return new Promise( async (resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(myEmailInput);
            if(isExist) {
                let user = await db.User.findOne({
                    attributes: ['email','roleid','password'],
                    where : {email : myEmailInput},
                    raw : true
                })
                if(user){
                    
                let isCheck =  await bcrypt.compareSync(password, user.password);
                if(isCheck){
                    userData.errorCode = 0;
                    userData.errMessage = `ok`;
                    delete user.password;
                    userData.user = user;
                }
                else {
                    userData.errorCode = 1;
                    userData.errMessage = `wrong password`;
                }
                }
                else {
                    userData.errorCode = 2;
                    userData.errMessage = `User is not exist`;
                    
                }
               
                resolve(userData);
            }
            else {
                userData.errorCode = 1;
                userData.errMessage = `your's Email isn't exist ,.....`;
                resolve(userData);
            }    
        }catch(err)
        {   
            reject(err)
        }
    })
}




let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
            try{
                let user = await db.User.findOne({
                    where : {email: userEmail}
                })
                if(user){
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }catch(e){
                reject(e);
            }
    })
}


let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
            try{
                let users = '';
                if(userId === 'ALL'){
                    users = await db.User.findAll({
                        attributes: {
                            exclude: ['password'],
                        }
                    })
                }
                if(userId && userId !=='ALL') {
                    users = await db.User.findOne({where : {id : userId},
                        attributes: {
                            exclude: ['password'],
                        }});
                }
                resolve(users);
            }catch(e){
                        reject(e);
            }
    })
}
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
            resolve({
                errCode : 0,
                errMessage : 'ok'
            })
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
module.exports = {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
    createNewUser
}