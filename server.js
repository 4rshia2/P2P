const { json } = require('body-parser')

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 9090})
function sendTo(connection , message){
    connection.send(JSON.stringify(message))
}
users = {}
wss.on("connection" ,function(connection){
    console.log("user connected")
    connection.on('message' , function(msg){
        var data;
        try{
            data = JSON.parse(msg)
        }catch(e){
            console.log("invalid json")
            data = {}
        }
        console.log("have got message from user:" , msg)
        switch(data.type){
            case 'login':
                console.log(`user ${data.name} logged in`)
                if(users[data.name]){
                    sendTo(connection , {
                        type:"login",
                        success : false
                    })
                }else{
                    users[data.name] = connection
                    connection.name = data.name
                }
                break;
            case "offer":
                console.log("sending offer to" , data.name);
                var conn = users[data.name];
                if(conn != null){
                    connection.othername = data.name
                }
                sendTo(conn , {
                    type:"offer",
                    offer : data.offer,
                    name : connection.name
                })
                break;
            case "answer":
                console.log("sending answer to" , data.name);
                var conn = users[data.name];
                if (conn != null){
                    connection.othername = data.name;
                    sendTo(conn , {
                        type:"answer",
                        answer : data.answer
                    })
                }
                break;
            case "candidate":
                var conn = users[data.name];
                if(conn != null){
                    sendTo(conn, {
                        type:"candidate",
                        candidate:data.candidate
                    })
                }
                break;
            case "leave":
                console.log("disconnectioning from " , data.name)
                var conn = users[data.name]
                conn.othername = null
                if(conn != null){
                    sendTo(conn , {
                        type : "leave"
                    })
                }
                break;
            default:
                sendTo(connection ,{
                    type : 'error',
                    message : `command ${data.type} not found`
                })
                break;
        }
    })
    connection.on("close" , function(){
        if(connection.name){
            delete users[connection.name]
            if(connection.othername){
                var conn = users[connection.othername];
                conn.othername = null
                if(conn != null){
                    sendTo(conn , {type:"leave"})
                }
            }
        }
    })

})
