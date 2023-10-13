import Jwt  from "jsonwebtoken";


export const veryfyToken = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({error: "Access denied"});
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    }catch(err){
        res.status(401).json({error: err.message})
    }
}