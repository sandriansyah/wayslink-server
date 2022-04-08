const {user}= require('../../models')
const joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") 

exports.register= async (req,res)=>{

    const schema = joi.object({
        fullName:joi.string().min(6).required(),
        email:joi.string().email().min(6).required(),
        password:joi.string().min(6).required(),
    })

    const {error}= schema.validate(req.body)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const createUser = await user.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password:hashedPassword
    })

    const dataToken = {
        id:createUser.id,
        fullName:createUser.fullName,
        email:createUser.email,
    }

    const SEKRET_KEY = process.env.TOKEN_KEY
    const token = jwt.sign(dataToken,SEKRET_KEY)

    res.status(200).send({
        status:"success",
        data:{
            id: createUser.id,
            fullName:createUser.fullName,
            email: createUser.email,
            token
        }
    })

    if(error){
        return res.status(400).send({
            message:error.details[0].message
        })
    }

    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
} 

exports.login= async (req,res)=>{

    const schema = joi.object({
        email:joi.string().email().min(6).required(),
        password:joi.string().min(6).required(),
    })

    const {error}= schema.validate(req.body)

    if(error){
        return res.status(400).send({
            message:error.details[0].message
        })
    }

    try {

    const findingUser = await user.findOne({
        where:{
            email:req.body.email
        },
        attributes:{
            exclude:["createdAt","updatedAt"]
        }
    })

    const comparePassword = await bcrypt.compare(req.body.password,findingUser.password)

    if(!comparePassword){
            res.status(400).send({
                status:"failed",
                message:"your email and password is invalid"
            })
        }

        const dataToken = {
            id:findingUser.id,
            fullName:findingUser.fullName,
            email:findingUser.email,
        }

        const SEKRET_KEY = process.env.TOKEN_KEY
        const token = jwt.sign(dataToken,SEKRET_KEY)

        res.status(200).send({
            status:"success",
            data:{
                id:findingUser.id,
                fullName: findingUser.fullName,
                email: findingUser.email,
                token
            }
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.checkAuth = async(req,res)=>{
    try {
        const id = req.user.id
        const dataUser = await user.findOne({
            where:{
                id:id
            },
            attributes:{
                exclude:["createdAt","updatedAt","password"]
            }
        })

        if(!dataUser){
            return res.status(404).send({
                status:"failed"
            })
        } 

        res.send({
            status:"success",
                user:{
                    id: dataUser.id,
                    name: dataUser.fullName,
                    email: dataUser.email,
                }
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}