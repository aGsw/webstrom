/**
 * events 事件触发器  引入事件类  注册事件  触发事件
 * 
 */
var events = require ('events')
    emitter = new events.EventEmitter()
    username = 'Eyal'
    password = 'password'

   /**
    * event handlers
    * 
    */
emitter.on('userAdd',function(username,password){
    console.log('Added user'+ username)
})    
// emit an event

emitter.emit('userAdd',username,password)