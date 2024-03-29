const bcrypt = require('bcrypt')


const isvalidpassword = async(password, confirmPassword) => {
    const iscorrect = await bcrypt.compare(password,confirmPassword)
    if(!iscorrect){
       return {error:"password incorrect"}
    }
    return iscorrect
}

module.exports={isvalidpassword}