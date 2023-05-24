const http = require('http')
const Classes = require('./modul/Classes')
const Io = require('./Io');
const Todos = new Io("./database/All.json")





http.createServer( async (req,res)=>{
    res.setHeader("Content-Type","application/json")
    if (req.url === '/new' && req.method === 'POST') {
      const Database = await Todos.read()
      const id = Database.length + 1;

      req.on('data', async (data) => {
        const Data = JSON.parse(data)
        let yes = true
        if (Database.length === 0) {
          const SaveData = new Classes(
            id,
            Data.name,
            Data.jami
        )
        await Todos.write([SaveData])
        res.end(`birinc mahsulot qowld ${Data.name}: ${Data.jami} dona`)

        }
         
      for(let i = 0; i < Database.length; i++)
      {
        if(Database[i].name === Data.name)
        {
          yes = false
          Database[i].jami += Data.jami
          await Todos.write(Database)
          res.end(`Bu mahsulot bor ${Database[i].jami} dona`)
        }
      }
      if(yes)
      {
        const SaveData = new Classes(
         id,
         Data.name,
         Data.jami
        )
        Database.push(SaveData);
        await Todos.write(Database)
        res.end(`mahsulot qoshildi ${Data.name}: ${Data.jami} dona`)
      }
    })
    }
    if (req.url === "/delete" && req.method === "POST") {
      req.on('data',async (data) => {
        const Data = JSON.parse(data);
        const id = Data.id
        const Database = await Todos.read()
        Database.splice(id - 1,1)
        await Todos.write(Database)
        res.end('deleting succes')
      })
    }
}).listen(4000,()=>{
    console.log(4000);
})

