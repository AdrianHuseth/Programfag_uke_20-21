
// const mybtn = document.getElementById('myList');
// const tre = document.getElementById('btn');
// tre.addEventListener("click", openmenu );
// function openmenu() {
//     if(mybtn.style.display != 'block') {
//         mybtn.style.display = 'block';
//     } else {
//         mybtn.style.display = 'none';
//     }
//     console.log('clicked');
// }


                // Søkefelt og plassering av markører 


// Map settings
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

// Nullstiller kartet slik at den viser hele verden fra midtpunktet
let map = L.map('map1').setView([0,0], 1);
    const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles =L.tileLayer(tileURL,{attribution})
    tiles.addTo(map)

// En variabel som bytter ut markøren med ett custom øll ikon
let point = L.icon({iconUrl:'https://cdn-icons-png.freepik.com/256/703/703531.png?semt=ais_hybrid',iconSize:[38,38]})

// Lager en asynkron funksjon
async function show_me(){

    // En variabel hvor verdien til "place" er det man skriver inn i søkebaren på nettsiden
    let place = document.getElementById("searchbar").value;
    // Får konsolloggen til å skrive ut verdien til "place"
    console.log(place);

    // Nok en variabel som heter "api"en til alle bryggeriene i databasen og plusser det sammen med verdien til "place" 
    const api_url1 = 'https://api.openbrewerydb.org/v1/breweries/search?query=' + place; 

    // En variabel som jeg kaller "response" og hvor jeg ber koden vente (await) til den har returnert løftet (promise) i form av en ett resultat som enten er oppfylt eller avlyst
    let response = await fetch(api_url1);
    // Denne variabelen ber koden om å vente (await) til verdien av "response" er blitt gjort om til en json fil
    let data = await response.json();
    // Får konsolloggen til å skrive ut verdien til "data"
    console.log(data);

    // Starter en "forEach" loop som går gjennom alle elementene i array individuelt.
    data.forEach(element => {
        // Gir "lat" verdien til lattitude til elementene i array (X cordinater)
        let lat = element.latitude
        // Gir "long" verdien til longitude til elementene i array (Y kordineter)
        let long = element.longitude
        // En "if" statment som sjekker om array inneholder lattitude og longitude
        if (lat && long ) {
            // En "const" variabel som plasserer markøren iforhold til verdiene til "lat" og "long"
            const marker = L.marker([lat,long],{icon:point}).addTo(map)
            // Lager en poppup som hvis man holder musa over viser ett bryggeri, denne poppupen viser informasjon om landet, navnet, staten bryggeriet ligger i, adresse og nettsiden til bryggeriet
            marker.bindPopup(`<p>Land: ${element.country}<p>Navn: ${element.name}<p>State: ${element.state}<p>Adresse: ${element.adress}</p>Nettside: <a href=${element.website_url} target="_blank">${element.website_url}</a>`)
        }
    });
}


                    // Ekstra søkefelt


// Lager en asynkron funksjon
async function potet(){

    // En variabel hvor verdien til "place" er det man skriver inn i søkebaren på nettsiden
    let place = document.getElementById("searchbar2").value;
    // Får konsolloggen til å skrive ut verdien til "place"
    console.log(place);

    // Nok en variabel som heter "api"en til alle bryggeriene i databasen og plusser det sammen med verdien til "place" 
    const api_url1 = 'https://api.openbrewerydb.org/v1/breweries/search?query=' + place; 

    // En variabel som jeg kaller "response" og hvor jeg ber koden vente (await) til den har returnert løftet (promise) i form av en ett resultat som enten er oppfylt eller avlyst
    let response = await fetch(api_url1);
    // Denne variabelen ber koden om å vente (await) til verdien av "response" er blitt gjort om til en json fil
    let data = await response.json();
    // Får konsolloggen til å skrive ut verdien til "data"
    console.log(data);

    // Lager en "forEach" loop som går gjennom alle de individuelle argumentene i arrayen
    data.forEach(element => {
        // Definerer "Name" som verdien av "element.Name" som da er navnet til bryggeriet
        let Name = element.name;
        // Definerer "Phone" som verdien av "element.phone" som da er telefon nummeret til bryggeriet
        let Phone = element.phone;
        
        // Bruker "document.getElementById" til å hente elementer basert på id'ene deres og endrer innholdene til å være verdiene av variablene over denne linjen.
        document.getElementById("name").textContent=Name
        document.getElementById("phone").textContent=Phone
        document.getElementById("website").innerHTML = `<a href=${element.website_url} target="_blank">${element.website_url}</a>`
    })
}