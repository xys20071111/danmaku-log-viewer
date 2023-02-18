import { Context } from '../deps.ts';
import { fixDate, createResult, filterInt } from '../utils/mod.ts';
import { db } from '../db.ts'

export async function queryByRoom(ctx: Context) {
    const query = ctx.request.url.searchParams
    const dateString = query.get('date')
    const countString = query.get('count')
    const roomidString = query.get('room')
    const roomid = filterInt(roomidString)
    const count = filterInt(countString)
    if (isNaN(roomid)) {
        ctx.response.body = {
            code: 400,
            msg: 'Bad Request'
        }
        return
    }
    if (dateString && (/(^[0-9]{4})-([0-9]{2})-([0-9]{2})/.test(dateString))) {
        const result = await db.query('SELECT `id`, `uid`, DATE_FORMAT(`time`, "%Y-%c-%d %H:%i:%S"), `nickname`, `text` FROM log WHERE roomId=? AND DATE(time)=? ORDER BY id DESC', [roomid, dateString])
        fixDate(result)
        ctx.response.body = createResult(result)
        return
    }
    if(!isNaN(count)) {
        const result = await db.query('SELECT `id`, `uid`, DATE_FORMAT(`time`, "%Y-%c-%d %H:%i:%S"), `nickname`, `text` FROM log WHERE roomId=? ORDER BY id DESC LIMIT ?', [roomid, count])
        fixDate(result)
        ctx.response.body = createResult(result)
        return
    }
    const result = await db.query('SELECT `id`, `uid`, DATE_FORMAT(`time`, "%Y-%c-%d %H:%i:%S"), `nickname`, `text` FROM log WHERE roomId=? ORDER BY id DESC LIMIT 100', [roomid])
    fixDate(result)
    ctx.response.body = createResult(result)
}