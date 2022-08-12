import db from '../models/index'
const bcrypt = require('bcryptjs');
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
                    userData.errorCode = 0;
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
module.exports = {
    handleUserLogin,
    checkUserEmail
}