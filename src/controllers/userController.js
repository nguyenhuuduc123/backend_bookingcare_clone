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
module.exports = {
    handleLogin
}