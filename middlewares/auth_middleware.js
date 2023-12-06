import jwt from 'jsonwebtoken'
import config from "../helpers/config.js";

export const generateToken = (admin) => {
    const token = jwt.sign(
        { id: admin.id,  is_super: admin.is_super},
        config.tokenKey,
        {
          expiresIn: "1h",
        }
    );
    return token
}

export const verifyToken = (req, res, next) => {;
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    jwt.verify(token, config.tokenKey,(err, decode)=>{
        if (err) {
            res.status(401).redirect('/dashboard/login')
        }else{
            next();
        }
    })
}