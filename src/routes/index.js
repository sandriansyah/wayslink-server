const express = require("express")

const router = express.Router()

const {auth} = require("../midlewere/auth")

const {getUser,editUser,deleteUser} = require("../controllers/user")
const {register,login,checkAuth} = require("../controllers/auth")
const {creteGroupLink,getGroups,getGroup,editGroup,deleteGroup,viewAcount} = require("../controllers/groupLink")
const {addLink,editLink,getLinks,deleteLink} = require("../controllers/link")
const {uploadFile} = require("../midlewere/uploadFile")

router.post("/register",register)
router.post("/login",login)
router.get("/checkauth",auth,checkAuth)

router.get("/user",auth,getUser)
router.patch("/user",auth,editUser)
router.delete("/user",auth,deleteUser)

router.post("/grouplink",auth,uploadFile("image"),creteGroupLink)
router.get("/grouplink",auth,getGroups)
router.get("/grouplink/:id",getGroup)
router.patch("/grouplink/:id",uploadFile("image"),editGroup)
router.delete("/grouplink/:id",deleteGroup)
router.patch("/viewAcount/:id",viewAcount)

router.post("/link",uploadFile("imageLink"),addLink)
router.patch("/link/:id",uploadFile("imageLink"),editLink)
router.get("/links/:id",getLinks)
router.delete("/link/:id",deleteLink)



module.exports = router