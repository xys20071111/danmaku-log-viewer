import { Application, Router, send } from './deps.ts'
import { queryByNickname } from './logic/queryByNickname.ts'
import { queryByRoom } from './logic/queryByRoom.ts'
import { queryByUID } from './logic/queryByUID.ts'

export const app = new Application()

const router = new Router()
router.get('/api/query/uid', queryByUID)
router.get('/api/query/room', queryByRoom)
router.get('/api/query/nickname', queryByNickname)

app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx, next) => {
    try {
        await send(ctx, ctx.request.url.pathname, {
            root: `${Deno.cwd()}/ui`,
            index: 'index.html'
        })
    } catch {
        await next()
    }
})