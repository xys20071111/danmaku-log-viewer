export function fixDate(data: any[]) {
    for (let i = 0; i < data.length; i++) {
        data[i].time = data[i]['DATE_FORMAT(`time`, "%Y-%c-%d %H:%i:%S")']
        data[i]['DATE_FORMAT(`time`, "%Y-%c-%d %H:%i:%S")'] = undefined
    }
}