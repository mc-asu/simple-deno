import { Application } from "https://deno.land/x/oak/mod.ts";
import todosRoutes from './routes/todos.ts'

const app = new Application();

//always await next to ensure proper execution
app.use(async (ctx, next) => {
    console.log('MiddleWare')
    await next()
})

app.use(todosRoutes.routes())
app.use(todosRoutes.allowedMethods())

await app.listen({ port: 3000 });