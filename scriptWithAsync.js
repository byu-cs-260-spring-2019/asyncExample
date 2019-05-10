window.onload = function(){
    document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "")
          return;


        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" 
            + "&APPID=c4ff1588a9d2f30d3e437c898d902f11";
        try{
            var response = await fetch(url);
            var json = await response.json();
            let results = "";
            results += '<h2>Weather in ' + json.name + "</h2>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description;
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;
        }catch(err){
            console.log(err);
        }
        

        try{
            const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + 
            ", US&units=imperial" + "&APPID=c4ff1588a9d2f30d3e437c898d902f11";
            var response = await fetch(url2);
            var json = await response.json();    
            let forecast = "";
            for (let i=0; i < json.list.length; i++) {
                forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
                forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
            }
            document.getElementById("forecastResults").innerHTML = forecast;
        }catch(err){
            console.log(err);
        }
        
            
        
    });
}