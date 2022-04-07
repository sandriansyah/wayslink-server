const jwt= require('jsonwebtoken')

exports.auth=(req,res,next)=>{

    try {
        const autHeader = req.header('authorization')
        const token = autHeader && autHeader.split(' ')[1]

        if(!token){
            return res.status(401).send({
                message: "access denied"
            })
        }

        const SEKRET_KEY = process.env.TOKEN_KEY
        const verified = jwt.verify(token,SEKRET_KEY)

        req.user = verified

        next()

    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:"invalidtoken"
        })
    }
}