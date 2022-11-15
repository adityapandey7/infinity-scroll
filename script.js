const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];
let ready=false;
let imagesLoaded =0;
let totalImages = 0;

// Unsplash API
const count=10;
const apiKey='6iP5x2T-xj-el4aITQ_87i-RRP2bmYkzMTwORAJhJZk';
const unsplashApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;
    }
}

//display photo

function displayPhotos() {
    imagesLoaded=0;
    totalImages=photoArray.length;
    photoArray.forEach((photo) => {
        //create <a> to link to unsplash image 
        const item= document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        //addevent listener to check photo is loaded
        img.addEventListener('load',imageLoaded);
        //putting img and <a> together inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//check to see if scroll is near the bottom, and to load more photos

window.addEventListener('scroll', () =>
{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready=false;
        getPhotos();
    }
});

//get photo from api

async function getPhotos() {
    try{
        const response = await fetch(unsplashApi);
        photoArray = await response.json();
        displayPhotos();
    }catch(error){
        console.log(error);
    }
}

getPhotos();