var fs = require("fs")


exports.messages = function(callback) {
    fs.readFile("./db.json", function(err, data) {
        if (err) {
            return callback(err)
        }else{
        	callback(null, JSON.parse(data).students)
        }
        
    })

}

exports.addMessages = function(message,callback) {
    fs.readFile("./db.json",function(err, data) {
        if (err) {
             return callback(err)
        }
        var messages = JSON.parse(data).students
        if(messages.length){
        	message.id = (messages[messages.length - 1].id) + 1
        }else{
        	message.id = 0
        }
        message.id = parseInt(message.id)
        
        messages.push(message)
        fs.writeFile("./db.json", JSON.stringify({ students: messages }), function(err) {
        	if(err){
        		callback(err)
        	}
        })
        callback(null)
    })

}

exports.editMessage = function(editStudent, callback) {
    fs.readFile("./db.json",function(err, data) {
        if (err) {
            return callback(err)
        }
        var messages = JSON.parse(data).students

        var message = messages.find(function(item) {
            return item.id == editStudent.id
        })
        callback(null, message)
    })

}

exports.updataMessage = function(updata,callback) {

        fs.readFile("./db.json", function(err, data) {
            if (err) {
                return callback(err)
            }
            var messages = JSON.parse(data).students

            var message = messages.find(function(item) {
                return item.id == updata.id
            })

            for (var key in updata){
            	message[key] = updata[key];
            }

            var fileData = JSON.stringify({students:messages})

            fs.writeFile("./db.json",fileData,function(err){
            	if(err){
            		return callback(err)
            	}
            })
            callback(null)
        })
    }

    exports.deleteMessage = function(id,callback) {

        fs.readFile("./db.json", function(err, data) {
        	console.log(JSON.parse(data))
            if (err) {
                return callback(err)
            }
            var messages = JSON.parse(data).students

            var index = messages.findIndex(function(item) {
                return item.id == id
            })
            messages.splice(index,1);

           
            var fileData = JSON.stringify({students:messages})

            fs.writeFile("./db.json",fileData,function(err){
            	if(err){
            		return callback(err)
            	}
            })
            callback(null)
        })
    }