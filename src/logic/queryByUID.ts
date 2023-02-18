import { Context } from '../deps.ts'
import { db } from '../db.ts'
import { filterInt, fixDate, createResult } from '../utils/mod.ts'

export async function queryByUID(ctx: Context) {
    const query = ctx.request.url.searchParams
    const uidString = query.get('uid')
    const countString = query.get('count')
    const dateString = query.get('date')
    const uid = filterInt(uidString)
    const count = filterInt(countString)
    if(isNaN(uid)) {
        ctx.response.status = 400
        ctx.response.body = {
            code: 400,
            msg: 'Bad Request'
        }
        return
    }
    if (/(^[0-9]{4})-([0-9]{2})-([0-9]{2})/.test(dateString as string)) {
        const result = await db.query('SELECT `id`, `uid`, DATE_FORMAT(`time`, "%Y-%c-%d %H:%i:%S"), `nickname`, `text` FROM log WHERE uid=? AND DATE(time)=?', [uid, dateString])
        fixDate(result)
        ctx.response.body = createResult(result)
        return
    }
    if(!isNaN(count)) {
        const result = await db.query('SELECT `id`, `uid`, DATE_FORMAT(`time`, "%Y-%c-%d %H:%i:%S"), `nickname`, `text` FROM log WHERE uid=? ORDER BY id DESC LIMIT ?', [uid, count])
        fixDate(result)
        ctx.response.body = createResult(result)
        return
    }
    const result = await db.query('SELECT `id`, `uid`, DATE_FORMAT(`time`, "%Y-%c-%d %H:%i:%S"), `nickname`, `text` FROM log WHERE uid=? ORDER BY id DESC LIMIT 100', [uid])
    fixDate(result)
    ctx.response.body = createResult(result)
}