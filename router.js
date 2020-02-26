var express = require("express")
var tool = require("./tool")

var router = express.Router()

//路由至首页
router.get("/", function(req, res) {
    tool.messages(function(err, data) {
        if (err) {
             return res.send("server error")
        }
        res.render("index.html", {
            students: data
        })
    })
})

//路由至添加学生信息
router.get("/add", function(req, res) {
    res.render("addStudent.html")
})

//路由至提交新添加学生信息
router.post("/add", function(req, res) {
    tool.addMessages(req.body,function(err){
    	if(err){
    		return res.send("server error")
    	}
    	res.redirect("/")
    })
    
})

//路由至编辑学生信息
router.get("/edit", function(req, res) {
    tool.editMessage(req.query, function(err, data) {
        if (err) {
            return res.send("server error")
        }
        res.render("editStudent.html", {
            message: data
        })
    })
})

//路由至完成更新学生信息
router.post("/edit", function(req, res) {
    tool.updataMessage(req.body,function(err){
    	if(err){
    		return res.send("server error")
    	}
    	res.redirect("/")
    })
    
})

//路由至删除学生信息
router.get("/delete", function(req, res) {
    tool.deleteMessage(req.query.id,function(err){
    	if(err){
    		return res.send("server error")
    	}
    	res.redirect("/")

    })
    
})


module.exports = router;