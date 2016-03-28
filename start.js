/**
 * Created by nizhiwang on 16/3/28.
 */
var process=require("child_process");

function spawn(js){
    console.log("start")
    var worker=process.spawn("node",[js],{
        detached:true,

        });
    worker.on("eixt",function(code,signal){
        worker.kill(signal);
        worker=spawn(js);
        console.log("close and restart:"+new Date);
    });

    return worker;
}
spawn("app.js");