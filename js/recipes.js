const links = document.querySelectorAll('.navbar .nav-link');
const row = document.querySelector('footer .row');
const modal=document.querySelector('.modal-body');
const input = document.getElementById('input');
const button =document.getElementById('button');
let dataContainer1=[];
let dataContainer2=[];
let dataContainer3=[];


// this event uesd to change api data
links.forEach(a => {a.addEventListener('click',function(e){
    console.log(e.target.innerHTML);
    getData1(e.target.innerHTML)
})
    
});



// this function used to get the api data 1 from server
async function getData1(type){
    let myResponse = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${type}`);
    let myData =await myResponse.json();
    dataContainer1=myData.data.recipes;

    console.log(dataContainer1)
    showData1();
}
getData1('pizza');


// this function to show data from api 1
function showData1(){
    let divs ='';
    for(let i=0; i<dataContainer1.length; i++){
        divs +=
        ` <div class="col-lg-3">
        <div class="innerData" >
        <div class="pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <img src="${dataContainer1[i].image_url}" alt="">
          <h5>${dataContainer1[i].title}</h5>
          </div>
          <p>${dataContainer1[i].publisher}</p>

        </div>
      </div>
        `
    }
    row.innerHTML=divs;
}

// this function to get data from api 2
async function getData2(id){
    let myResponse = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
   let myData = await myResponse.json();
   dataContainer2=myData.data.recipe;
   dataContainer3=myData.data.recipe.ingredients;
    console .log(myData.data.recipe);
    showData2()
}


// this function to show data from api 2
function showData2(){
    divs='';
    for(let i=0; i<dataContainer3.length; i++){
        divs+=`
        
          <p>${i+1}- ${dataContainer3[i].quantity??''} ${dataContainer3[i].unit} ${dataContainer3[i].description}</p>
        `
    }
    modal.innerHTML=`
    <img src="${dataContainer2.image_url}" alt="">
    <h3>${dataContainer2.title}</h3>
    <h5>servings: ${dataContainer2.servings}</h5>
    <h5>cooking time: ${dataContainer2.cooking_time} min</h5>
    ${divs}
    `;
}

// this event used to get the id from api 1 and put it as a parmeter to api 2 function
row.addEventListener('click',function(e){

    for(let i=0; i<dataContainer1.length; i++){
        if(dataContainer1[i].image_url==e.target.src||dataContainer1[i].title==e.target.innerHTML){
            let id =dataContainer1[i].id
            getData2(id)

        }
    }
})


// this event used to search data from api 1
button.addEventListener('click',function(){
    let divs= '';
    for(let i=0; i<dataContainer1.length; i++){
        if(dataContainer1[i].title.includes(input.value)){
            divs +=
            ` <div class="col-lg-3">
            <div class="innerData" >
            <div class="pointer" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <img src="${dataContainer1[i].image_url}" alt="">
              <h5>${dataContainer1[i].title}</h5>
              </div>
              <p>${dataContainer1[i].publisher}</p>
    
            </div>
          </div>
            `
        }
    }
    row.innerHTML=divs;
    
})

