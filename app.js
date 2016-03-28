/**
 * Created by nzw on 2016/3/24.
 */
var process = require('child_process').exec;
var http = require('http');
var fs = require('fs');
var os = require('os');
var url = require('url');
var encoding = 'cp936';
var binaryEncoding = 'binary';
var count = 0;
var iconv;

/*
 *֧��linux
 * windows
 */
if (/$win/.test(os.platform())) {  //mac : darwin
    console.log(os.platform());
    iconv = require('iconv-lite').decode;
}
else {
    Iconv = require('iconv').Iconv;
    iconv=new Iconv(encoding,'UTF-8').convert;

}

/*
 * 过滤危险命令
 *
 */
function filter(str) {
    if (/rm|delete|format/gi.test(str)) {
        return "echo  cmd not supported";
    }
    return str;
}
/*
 *启一个服务web访问
 */
http.createServer(function (req, res) {
    if (url.parse(req.url).pathname == '/') {
        console.log('/');
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        })
    }
    else if (url.parse(req.url).pathname == '/COM') {
        console.log(url.parse(req.url, true).query.cmd + ":" + filter(url.parse(req.url, true).query.cmd));
        process(filter(url.parse(req.url, true).query.cmd), {encoding: 'binary'}, function (err, stdout, stderr) {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(iconv(new Buffer(stdout,binaryEncoding),encoding));
                // res.end(iconv.convert(new Buffer(stdout, binaryEncoding)));
            }
        );
    }

    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404 error! ');
    }

}).listen(8844);
console.log('server running...')
//<editor-fold desc="Description">
//region Description
function ad(hell) {

}
//endregion
}