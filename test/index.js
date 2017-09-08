function* sub() {
    for (let i = 65; i < 70; i++) {
         yield String.fromCharCode(i);
    }
}

function* main() {
    yield "begin";
    yield sub();    // 返回的是 sub() 的结果，一个对象
    yield "---------";
    yield* sub();   // 依次返回 sub() 结果的的每一项
    yield "end";
}

for (var v of main()) {
    console.log(v);
}