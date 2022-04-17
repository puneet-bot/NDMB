
    window.onload = function(){  
        var MovieJson=(JSON.parse(localStorage.getItem('myParam1')));
        for (const key in MovieJson) {
            console.log(MovieJson[key]);
           var ListItem= document.querySelector(`#${key} > .my-content`);
           
            if(key==='Poster'){
                var image=document.getElementById('posterImage');
                if(MovieJson[key]==null)
                    image.setAttribute('src','https://www.bing.com/images/search?view=detailV2&ccid=o20qwkxS&id=01F8201FB8CBF0A937EF0EE8A69288D75C3845D8&thid=OIP.o20qwkxSqZ1p7ln3TvobGwHaGD&mediaurl=https%3a%2f%2faskleo.com%2fwp-content%2fuploads%2f2004%2f06%2fno_image.jpg&exph=944&expw=1155&q=not+available&simid=608045482462436061&FORM=IRPRST&ck=5062DBF7D9BA163B801407120136F835&selectedIndex=76');
                else
                    image.setAttribute('src',MovieJson[key]);
            }
            else if(key==='Ratings'){
                var rate=MovieJson[key][0];
                ListItem.textContent=rate['Value']
            }
            else if(ListItem){
                ListItem.textContent=MovieJson[key];                
            }
        }
        

    }
    export let movieDesign = async function (movie) {
    }



