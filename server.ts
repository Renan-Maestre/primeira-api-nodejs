import fastify from "fastify";
import crypto from "node:crypto";

const server = fastify(
    {logger: {
        transport :{
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            }
        }
    }}
)

const cursos = [
{ id: '1', title: "Node.js" },
    { id: '2', title: "React.js" },
    { id: '3', title: "Vue.js" },
]




server.get("/courses", () => {
    return { cursos }
})

server.get("/courses/:id", (request, reply) =>{

    type Params = {
        id: string
    }

    const params = request.params as Params
       const couseId = params.id

        const course = cursos.find(course => course.id === couseId)

        if(course){
            return course
        }


        return reply.status(404)
})

server.post("/courses", (request, reply) => {
    type Body = {
        title: string
    }

    const body = request.body as Body
    const couseTitle = body.title
    const curseId = crypto.randomUUID()


    if(!couseTitle){
        return reply.status(400).send({message : "Titulo obrigatorio"})
    }



    cursos.push({ id: curseId, title: couseTitle })

    return reply.status(201).send({
        courseid: curseId
    })
})



server.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
})
