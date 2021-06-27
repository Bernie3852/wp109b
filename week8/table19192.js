for (var i = 1; i < 20; ++i) {
    var list = []
    for (var j = 1; j < 20; ++j) {
        list.push('\t'+(i * j))
    }
    console.log(list.join(' '))
}
