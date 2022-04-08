const express = require("express")

const router = express.Router()

const {auth} = require("../midlewere/auth")

const {register,login,checkAuth} = require("../controllers/auth")
const {creteGroupLink,getGroups,getGroup,editGroup,deleteGroup} = require("../controllers/groupLink")
const {addLink,editLink,getLinks} = require("../controllers/link")
const {uploadFile} = require("../midlewere/uploadFile")

router.post("/register",register)
router.post("/login",login)
router.get("/checkauth",auth,checkAuth)

router.post("/grouplink",auth,uploadFile("image"),creteGroupLink)
router.get("/grouplink",auth,getGroups)
router.get("/grouplink/:id",getGroup)
router.patch("/grouplink/:id",editGroup)
router.delete("/grouplink/:id",deleteGroup)

router.post("/link",uploadFile("imageLink"),addLink)
router.patch("/link/:id",editLink)
router.get("/links",getLinks)



module.exports = router