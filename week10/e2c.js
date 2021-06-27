//源自老師之程式碼改編
var e2c = { egg: '雞蛋', pig: '豬', an: '一顆', a: '一隻', the: '這隻', chase: '追', eat: '吃' }

function mt (e) {
  var c = []
  for (let i in e) {
    var eword = e[i]
    var cword = e2c[eword]
    c.push(cword)
  }
  return c
}

console.log('Deno.args=', Deno.args)
var c = mt(Deno.args)
console.log(c)

/*
$ deno run e2c.js a pig eat an egg
Deno.args= [ "a", "pig", "eat", "an", "egg" ]
[ "一隻", "豬", "吃", "一顆", "雞蛋" ]
*/
