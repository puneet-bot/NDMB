//Import the second javascript file
import { movieDesign } from '/second.js';
var searchMovie     =   document.getElementById('search-bar');
var sugesttionBar   =   document.getElementById('suggestions');
var SearchButton    =   document.getElementById('get-my-search');
var movieName       =   "";
var MovieDocument   ;

//Storing movie names when key is pressed 
searchMovie.addEventListener('keyup',function(e){
    switch(e.key){
        case 'Shift':
            break;
        case 'Enter':
            parameter(movieName);
            break;
        case 'CapsLock':
            break;
        case 'ArrowLeft':
            break;
        case 'ArrowRight':
            break;
        case 'Backspace':
            if(movieName.length<=1)
                movieName='';
            else{
                movieName=movieName.substring(0,movieName.length-1);
            }
            parameter(movieName);
        break;
        default:
            movieName+=e.key;
            parameter(movieName);
            break;
    }
    
});

//search movie on clicking search button
SearchButton.addEventListener('click',function(){
    parameter(movieName);
})


searchMovie.addEventListener('click',function(){
    sugesttionBar.classList.toggle('invisible');
})

//Hitting the api when users expects to find the results and returing the object
let parameter = async function (movie) {
    if(!movie){
        // to be replaced with models
        alert('Please add a valid name');
    }
    let myParam = await func('get', `http://www.omdbapi.com/?t=${movie}&s=${movie}&page=*&apikey=e9b11b9d`);
    MovieDocument=myParam;
    sugesttionBar.innerHTML='';
    for(let i=0;i<10;i++){
        let anchorTag=document.createElement("a");
        anchorTag.setAttribute('class','movie-link')
        anchorTag.setAttribute('id',`${MovieDocument.Search[i].imdbID}`);
        let para = document.createElement("p");
        para.setAttribute('class','search-back-color');
        para.setAttribute('id',`${MovieDocument.Search[i].Title}--${i}`);
        para.innerText = MovieDocument.Search[i].Title;
        para.innerHTML+=`<i class="fas fa-solid fa-bookmark" style="color:yellow; float:right; font-size:20px;"></i>`;
        anchorTag.appendChild(para);
        sugesttionBar.appendChild(anchorTag);
            anchorTag.addEventListener('click',async function(){
            let myParam1 = await func('get', `https://www.omdbapi.com/?i=${this.getAttribute('id')}&page=*&apikey=e9b11b9d`);
            localStorage.clear();
            localStorage.setItem('myParam1',JSON.stringify(myParam1));
            movieDesign(myParam1);
            window.location.href = "/movie.html";

        })
        
    }
}





let func = async function (type, path) {
    let parameter = await fetch(path);
    let response = await parameter.json();
    return response;
}