const http = require('http')
const fs = require('fs').promises



http.createServer(async (req,res)=>{
    res.setHeader("Content-Type","application/json")
    if (req.url === '/users' && req.method === 'GET') {
        const users = JSON.parse(
            await fs.readFile('./database/users.json')
        )
        const teacher = JSON.parse(
            await fs.readFile('./database/teachers.json')
        )
      const text = []
      for (let i = 0; i < users.length; i++) {
        const element = users[i];
        for (let i = 0; i < teacher.length; i++) {
            const teach = teacher[i];
            if (element.teacher_id === teach.id) {
                element.teacher_id = teach
                text.push(element)
                
                
            }
        }
        
      }
     
      
      
      res.statusCode = 201
      res.end(JSON.stringify(text))
    }
}).listen(4000,()=>{
    console.log(4000);
})
