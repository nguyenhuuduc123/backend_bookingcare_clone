import Services from '../services/userServices'
let handleLogin = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password) {
        return res.status(500).json({
            errorCode : 1,
            message : 'missing input parameter'
        })
    }
    let userData = await Services.handleUserLogin(email, password);
        return res.status(200).json({
            errorCode :userData.errorCode,
            message: userData.errMessage,
             user : userData.user ? userData.user : {}
        })
}



let handleGetAllUser =async (req, res) => {
    let id = req.query.id ; //all , id
        let users  = await Services.getAllUsers(id);
        console.log(users)
        return res.status(200).json({
            errCode : 0,
            errMessage : 'ok',
            users
        })
}
let handleCreateNewUser = async (req,res)=> {
        try{
            let user  = req.body;
       let message  = await Services.createNewUser(user);
       console.log(message);
       return res.status(200).json({
        message : message
       });
            
        }
        catch(err){
            console.log(e)
        }
}


module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser
}