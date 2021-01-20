// first get the real time API from website (openweather Global service)
// and generate adding city_name and key value API by removing {}braces
//download or copy API

const http = require('http');
const fs = require('fs');
const requests = require('requests');


const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal, orgVal) =>{
    let temperature = tempVal.replace("{%tempVal%}", orgVal.main.feels_like);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    return temperature;
};
const server = http.createServer((req, res) => {
    if (req.url == "/"){
        requests( 
            "http://api.openweathermap.org/data/2.5/weather?q=Motihari&units=metric&appid=073d600d4d5dde23b01902f48985e396"
            )
            .on('data', (chunk) => {
                const objData = JSON.parse(chunk);
                const arrData = [objData];
                //console.log(arrData[0].main.temp);
                const realTimeData = arrData.map((val) => replaceVal(homeFile, val))
                .join('');
                res.write(realTimeData);
                //console.log(realTimeData);
                })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                //console.log('end');
                res.end(); 
            });
        }
    });
    
    
    server.listen(8000, "127.0.0.1");

    // http://api.openweathermap.org/data/2.5/weather?q=Motihari&units=metric&appid=073d600d4d5dde23b01902f48985e396