import jwt from 'jsonwebtoken';
const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d',
    });

    res.cookie("jwt",token,{
        httpOnly:true, //this cookie cannot be accessed by browser, hence makes it more secure
        maxAge:15*24*60*60*1000,//15 days
        samSite:"strict", //CSRF
    })

    return token;
}

export default generateTokenAndSetCookie;