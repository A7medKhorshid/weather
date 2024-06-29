async function search(a) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b9ca0b8bfb494432b59183422242706&q=${a}&days=3`)
    if (t.ok && 400 !== t.status) {
        let a = await t.json();
        currentDisplay(a.location, a.current);
        anotherDisplay(a.forecast.forecastday);
    }
}

document.getElementById("search").addEventListener("keyup", a => {
    search(a.target.value)
});

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function currentDisplay(a,t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        let innerBox = `
        <div class="col-md-4">
            <div class="inner h-100">
                <div class="d-flex flex-row justify-content-between p-2 date">
                    <div id="day1">${days[e.getDay()]}</div> 
                    <div id="date1">${e.getDate() + months[e.getMonth()]}</div>
                </div>
                <div class="details ps-3 pt-4 pb-4 d-flex flex-column justify-content-center">
                    <div class="city-name">${a.name}</div>
                    <div class="degree1"><h1>${t.temp_c}<sup>o</sup>C</h1></div>
                    <div class="wthr-img1"><img src="https:${t.condition.icon}" alt="" width=90></div>
                    <div class="discripe" id="desc1">${t.condition.text}</div>
                    <div class="icons pt-3">
                        <span><i class="fa-solid fa-umbrella"></i> 20%</span>
                        <span><i class="fa-solid fa-wind"></i> 18km/h</span>
                        <span><i class="fa-regular fa-compass"></i> East</span>
                    </div>
                </div>
            </div>
        </div>`
        document.getElementById("show").innerHTML = innerBox;
    }
}

function anotherDisplay(a) {
    let t = "";
    for (let e = 1; e < a.length; e++)
        t += `
        <div class="col-md-4">
            <div class="inner h-100">
                <div class="text-center p-2 date${e}">
                    <div id="day2">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>
                </div>
                <div class="details${e} h-100 text-center overflow-hidden">
                    <div class="wthr-img2 mt-4 mb-4"><img src="https:${a[e].day.condition.icon}" alt="" width=48></div>
                    <div class="degree2"><h4>${a[e].day.maxtemp_c}<sup>o</sup>C</h4></div>
                    <div class="min-deg1"><h6>${a[e].day.mintemp_c}<sup>o</sup>C</h6></div>
                    <div class="discripe mt-4" id="desc2">${a[e].day.condition.text}</div>
                </div>
            </div>
        </div>
        `
    document.getElementById("show").innerHTML += t;
}
search("dubai");