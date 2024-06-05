// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.


const http = require('http');
const fs = require('fs');

let homePageViews = 0;
let aboutPageViews = 0;

const server = http.createServer((req, res) =>{
    if (req.url === '/') {
        homePageViews++;
        fs.readFile('index.html', (err, data) =>{
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});

                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            data = data.toString().replace('{{views}}', homePageViews);
            res.end(data);
        });
     } else if (req.url === '/about') {
            aboutPageViews++;
            fs.readFile('about.html',(err, data) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not found");
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                data = data.toString().replace('{{views}}', aboutPageViews);
                res.end(data);
            });
            }else{
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end("404 Not Found");
            }
        
    
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});


