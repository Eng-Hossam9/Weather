let tempData;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function search(searchval) {
    let request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5c52f5fd17e549609a9155906233012&q=${searchval}&days=3`);
    tempData = await request.json();
    console.log(tempData);
    display();
    displayNextDay();

}

search('cairo');

document.getElementById("search").addEventListener("keypress", e => { search(e.target.value) });


function display() {
    if (tempData != null) {
        var date = new Date(tempData.current.last_updated.replace(" ", "T"));
        let temp = `
        <div class="col-md-4  px-0 ">

        <div class="weather-today mt-3 rounded-start-2">
                        <div class="today-header p-3 d-flex justify-content-between rounded-2">
                             <div class=" day">${days[date.getDay()]}</div>
                                <div class=" date">${date.getDate()}${month[date.getMonth()]}
                                </div>
                            </div>
            <div class="forecast-content p-3" id="current">
                <div class="location fs-4">${tempData.location.name}</div>
                <div class="degree d-flex">
                    <div class="num">${tempData.current.temp_c}<sup>o</sup>C</div>
    
                    <div class="forecast-icon">
                    <img src="https:${tempData.current.condition.icon}" alt="" width="90">
                    </div >
                </div >
                <div class="custom pt-2">${tempData.current.condition.text}</div>
    
                    <div class="my-4">
                                    <span  class="me-3"><img src="images/icon-umberella.png" alt=""
                                            width="21" height="21">20%</span>
                                    <span class="me-3"><img src="images/icon-wind.png" alt="" width="23"
                                            height="21" >18km/h</span>
                                    <span class="me-3"><img src="images/icon-compass.png" alt=""
                                            width="21" height="21" >East</span>
                    </div>
            </div >
            </div >
             `;

        document.getElementById("tempdata").innerHTML = temp;

    }

}


function displayNextDay() {
    var date;
    let temp = '';
    for (let i = 1; i < tempData.forecast.forecastday.length; i++) {
        date = new Date(tempData.forecast.forecastday[i].date.replace(" ", "T"));
        if (i == 2) {
            temp += `
            <div class="col-md-4 text-center px-0 " id="">
                    <div class="weather-today mt-3  wheatherhight">
                        <div class="today-header p-3  d-flex justify-content-between text-center ">
                            <div class="text-center mx-auto day">${days[date.getDay()]}</div>
                        </div>
                        <div class="d-flex flex-column justify-content-center align-items-center mt-4 ">
                            <div class="padbottom mb-3 ">
                                <img src=https:${tempData.forecast.forecastday[i].day.condition.icon} alt="" width="60" alt="">
                            </div>
                            <div class="d-flex justify-content-center align-items-center flex-column py-2">
                                <h4 class="text-white">${tempData.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h4>
                                <h6>${tempData.forecast.forecastday[i].day.mintemp_c}<sup>o</sup></h6>
                            </div>
                            <div class="custom py-5">${tempData.forecast.forecastday[i].day.condition.text}</div>
                        </div>
                    </div>
                 </div>  
                
                 `
        } else {
            temp += `
            <div class="col-md-4 text-center px-0 " id="">
                    <div class="weather-tomorrow mt-3  wheatherhight">
                        <div class="tomorrow-header p-3  d-flex justify-content-between text-center ">
                            <div class="text-center mx-auto day">${days[date.getDay()]}</div>
                        </div>
                        <div class="d-flex flex-column justify-content-center align-items-center mt-4 ">
                            <div class="padbottom mb-3 ">
                                <img src=https:${tempData.forecast.forecastday[i].day.condition.icon} alt="" width="60" alt="">
                            </div>
                            <div class="d-flex justify-content-center align-items-center flex-column py-2">
                                <h4 class="text-white">${tempData.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h4>
                                <h6>${tempData.forecast.forecastday[i].day.mintemp_c}<sup>o</sup></h6>
                            </div>
                            <div class="custom py-5">${tempData.forecast.forecastday[i].day.condition.text}</div>
                        </div>
                    </div>
                 </div>  
                
                 `
        }


    }

    document.getElementById("tempdata").innerHTML += temp;

}

