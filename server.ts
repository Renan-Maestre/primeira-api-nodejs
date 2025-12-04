import fastify from "fastify";
import { log } from "node:console";
import crypto from "node:crypto";
import { request } from "node:http";

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

server.delete("/courses/:id", (request, reply) =>{
    type Params = {
        id : String
    }

    const params = request.params as Params

    const courseId = params.id

    const index = cursos.findIndex(course => course.id === courseId)

    if(index === -1){
        return reply.status(404).send({message: "Curso não encontrado "})
    }

    cursos.splice(index, 1)

    return reply.status(204).send()
    


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

server.patch("/courses/:id", (request, reply) =>{

    type Params = {
        id : String
    }
    type Body = {
        title: string
    }

    const params = request.params as Params
    const courseId = params.id
    const index = cursos.findIndex(course => course.id === courseId)

    if(index === -1){
        return reply.status(404).send({message: "Curso não encontrado "})
    }

    

    const body = request.body as Body
    const couseTitle = body.title

    if (couseTitle === '') {
        return reply.status(404).send({message: "title deve ser passado"})
    }

    cursos[index].title = couseTitle

    return reply.status(201).send()

})



server.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
})
