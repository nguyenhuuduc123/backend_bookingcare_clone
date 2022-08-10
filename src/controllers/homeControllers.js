import db from '../models/index'

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


module.exports = {
    getHomePage 
}