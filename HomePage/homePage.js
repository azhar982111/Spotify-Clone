
import navBar from "../component/getNavbar.js"

document.getElementById("up-bar").innerHTML = navBar();


const clientId = "e358f27f1cf744e49b880aaf0807be8c";
const clientSecret = "4204725dea5941b2a7c17ab60372d054";

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    localStorage.setItem("authToken",JSON.stringify(data.access_token))
    getCategroies(data.access_token)
    getGonre(data.access_token)
}
_getToken()

    // 


// let authToken = JSON.parse(localStorage.getItem("authToken"));

    let getCategroies = async function (authToken) {
        try {

            //  categories = https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5
            //  genre = https://api.spotify.com/v1/recommendations/available-genre-seeds


            let res = await fetch(`https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=4&offset=5`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }

            })

            let data = await res.json();
            playlistsIds(data.categories.items,authToken);
        } catch (error) {
            console.log(error);
        }
    }
    // getCategroies();

    function playlistsIds(data,authToken) {
        data.forEach(categories => {
            let categorie = categories.id;
            getPlaylist(categorie,authToken);

        });
    }

    let getPlaylist = async function (categorie,authToken) {
        try {
            

            //  categories = https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5
            //  genre = https://api.spotify.com/v1/recommendations/available-genre-seeds

            let res = await fetch(`https://api.spotify.com/v1/browse/categories/${categorie}/playlists?country=IN&limit=20&offset=5`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }

            })

            let data = await res.json();
            // console.log("playlist item === ",data.playlists.items)
            if (!data.error) {
                // console.log(categorie)
                // console.log(data);
                appendData(data.playlists.items);
            }
        } catch (error) {
            console.log("get playlist err",error);
        }
    }

    let getGonre = async function (authToken) {
        try {
            let res = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }

            })

            let data = await res.json();
            // console.log( "genre Data", data);
            localStorage.setItem("genre", JSON.stringify(data.genres))
            // console.log(data.categories.items)
            // playlistsIds(data.categories.items);
        } catch (error) {
            console.log("Genere Error",error);
        }
    }
    
    let genres = JSON.parse(localStorage.getItem("genre"));
    let i = 0;


    function toUpperCase(str){
        let lowerCase = "abcdefghijklmnopqrstuvwxyz";
        let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        str = str.split("");
        for(let i =0;i<str.length;i++){
            // console.log(str[0])
            if(str[0]===lowerCase[i]){
                str[0] = upperCase[i];
                return str.join("");
            }
        }
        return str.join();
    }


    const appendData = function (gotData) {
        



        if (gotData.length !== 0) {

            let main = document.createElement("div");

            let genreAndButton = document.createElement("div");
            genreAndButton.className = "genre";
            let genre = document.createElement("h1");
             genres[i] = toUpperCase(genres[i]);
            genre.textContent = genres[i];
            i++
            
            let seeAllButtonDiv = document.createElement("div");
            genreAndButton.append(genre);
            let seeAllButton = document.createElement("button");
            seeAllButton.className = "showAll";
            seeAllButton.onclick = "storeId()";
            seeAllButton.textContent = "SEE ALL";
            seeAllButtonDiv.append(seeAllButton);
            genreAndButton.append(seeAllButtonDiv);
            seeAllButton.addEventListener('click', () => {
                localStorage.setItem("seeAllData",JSON.stringify(gotData));
                localStorage.setItem("playlistGenreName",JSON.stringify(genres[i-1]));
                location.href = "./seeAll.html";
            })
         
            main.append(genreAndButton);

            let playlists = document.createElement("div")
            playlists.className = "playlists";
            console.log(gotData);
            // gotData.splice(0,6);

            

            gotData.splice(0, 6).forEach(data => {



                const div = document.createElement("div");

                const imgDiv = document.createElement("div");
                imgDiv.className = "imgDiv";
                const img = document.createElement("img");
                img.src = data.images[0].url;
                imgDiv.append(img);

                const playButtonDiv = document.createElement("span");
                playButtonDiv.className = "playButton";
            
                const playButton = document.createElement("button");
                playButton.addEventListener('click', () => {
                    getTracks(data.id)
                    console.log("playsong")
                });
                playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>`;
                playButtonDiv.append(playButton);
                imgDiv.append(playButtonDiv);

                const titleDiv = document.createElement("div");
                titleDiv.className = "title";
                const title = document.createElement("h2");
                title.textContent = data.name;
                titleDiv.append(title);
                const pDiv = document.createElement("div");
                pDiv.className = "description";
                const description = document.createElement("p");
                description.textContent = data.description;
                pDiv.append(description);
                div.append(imgDiv, titleDiv, pDiv);

                playlists.append(div);
                main.append(playlists)
            });
          
            document.getElementById("container").append(main);
         
            
        //     let show = document.getElementsByClassName("showAll")
        //     addEventListener("click",function(){
        //     // localStorage.setItem("seeAllPageData",json.stringify(gotData))
        //     console.log("helloo")

        // })
        
        
        }

    }
    //  document.getElementsByClassName("showAll").addEventListener("onclick",storeId);
    // document.addEventListener
    //     console.log(1)
    //  let check = document.querySelectorAll(".showAll")
    // console.log(check)
    // for(let i =0; i<check.length;i++){
    //     check[i].addEventListener("click", () => {
    //         alert(i)
    //     });
    // }
    
    
    // function storeTrackId(playlistId){
    //     let getCategroies = async function () {
    //         try {
    
    //             //  categories = https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5
    //             //  genre = https://api.spotify.com/v1/recommendations/available-genre-seeds
    
    
    //             let res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=ES&limit=10&offset=5`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${authToken}`,
    //                 }
    
    //             })
    
    //             let data = await res.json();
    //             // console.log(data);
    //             playlistsIds(data.categories.items);
    //             console.log((data.categories.items[Math.floor(Math.random()*10)].id))
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getCategroies();
    // }

    let getTracks = async function (playlistId) {
    let authToken = JSON.parse(localStorage.getItem("authToken"));

        console.log(playlistId,authToken)
    try {
        

        //  categories = https://api.spotify.com/v1/browse/categories?country=IN&locale=sv_IN&limit=10&offset=5
        //  genre = https://api.spotify.com/v1/recommendations/available-genre-seeds

        let res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=ES&limit=5&offset=5`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            }

        })

        let data = await res.json();
        localStorage.setItem("trackId", JSON.stringify(data.items[0].track.album.id))
        console.log(JSON.parse(localStorage.getItem("trackId")))
        console.log(data);
        // location.reload();

       
    } catch (error) {
        console.log("get playlist err",error);
    }
}



        //Navbar JS

        
let locationHref = JSON.parse(localStorage.getItem("locationHref")) || [];
let loactionAt = locationHref.length - 1;


let forwardAt = JSON.parse(localStorage.getItem("forwardAt"));

if(locationHref[forwardAt] == window.location.href ){

}else{
    locationHref.push(window.location.href);
}
let backAt = JSON.parse(localStorage.getItem("backAt")) || locationHref.length - 1;


localStorage.setItem("locationHref", JSON.stringify(locationHref));

document.getElementById("leftArrow").addEventListener("click", goBack);

document.getElementById("rightArrow").addEventListener("click", goForward);



function goBack() {
    console.log("PressBack")
    if(backAt >= 1){
        console.log(backAt)
        backAt--;
    location.href = locationHref[backAt];
    
    forwardAt = backAt + 1;
    }
    console.log(backAt)

    localStorage.setItem("forwardAt", JSON.stringify(forwardAt));
    localStorage.setItem("backAt", JSON.stringify(backAt));
}

function goForward() {
    console.log("PressForward")

    if (forwardAt && locationHref[forwardAt]) {
        location.href = locationHref[forwardAt];
        if (locationHref[forwardAt++]) {
            forwardAt++;
            backAt++;
        }
        localStorage.setItem("forwardAt", JSON.stringify(forwardAt));
        localStorage.setItem("backAt", JSON.stringify(backAt))
    }

}