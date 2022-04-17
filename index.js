import { movieDesign } from '/second.js';
var searchMovie     =   document.getElementById('search-bar');
var sugesttionBar   =   document.getElementById('suggestions');
var movieName       =   "";
var MovieDocument   ;

//to complete
searchMovie.addEventListener('keyup',function(e){
    switch(e.key){
        case 'Shift':
            break;
        case 'Enter':
            parameter(movieName);
            break;
        case 'CapsLock':
            break;
        case 'Backspace':
            if(movieName.length<=1)
                movieName='';
            else{
                movieName=movieName.substring(0,movieName.length-1);
                console.log('after del', movieName);
            }
            parameter(movieName);
        break;
        default:
            console.log('executed',movieName)
            movieName+=e.key;
            parameter(movieName);
            break;
    }
    // console.log(e.key);
    
});




searchMovie.addEventListener('click',function(){
    sugesttionBar.classList.toggle('invisible');
})

let parameter = async function (movie) {
    if(!movie){
        // to be replaced with models
        alert('Please add a valid name');
    }
    // console.log(movie);
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
        // console.log(para);
            anchorTag.addEventListener('click',async function(){
            // console.log(this.getAttribute('id'));
            let myParam1 = await func('get', `http://www.omdbapi.com/?i=${this.getAttribute('id')}&page=*&apikey=e9b11b9d`);
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