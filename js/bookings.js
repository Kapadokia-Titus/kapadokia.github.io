//global init 
const url ="https://blushing-husky-acapella.glitch.me/hotels";
const bookingsUrl ='https://blushing-husky-acapella.glitch.me/bookings';
// main function
function init(){
    addBooking();
    getOtherHotels();
    handleOnClick(1);
    fetchBookings();
}


// submit a Booking
function addBooking(){
    //get data from the form input
    let form = document.getElementById('booking-form')
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        // get form data
        let username = document.getElementById('username').value;
        let provider = document.getElementById('airbnb-name').textContent;
        let arrivalDate = document.getElementById('input_from').value;
        let depature = document.getElementById('input_to').value;
        let numberOfRooms = document.getElementById('number-of-rooms').value;
        let numberOfpeople = document.getElementById('number-of-people').value;
        let uuid = Math.floor(Math.random() * 100);

        // submit the form to the bookings server

        const data = { "username": username,
                       "arrivalDate":arrivalDate,
                       "depature":depature,
                       "provider":provider,
                       "orderId":uuid,
                       "numberOfRooms":numberOfRooms,
                       "numberOfpeople":numberOfpeople 

        };
        if(data===null){
            alert("Can't submit a blank booking")
        }
        fetch(bookingsUrl, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
         
            alert(`You Have successfully booked ${provider}'s services`)
        
        })
        .catch((error) => {
           alert("Error in making doing your booking, Check your connection and retry")
        });
    //set an empty value
    form.reset();
    })

}
//init function
function getOtherHotels(){

    // do a fetch get request
    fetch(url)
    .then(response=>response.json())
    .then(data =>{
        // get the ID of the container we'll populate data
        //loop through tha data and map it to our UI
        const container = document.getElementById('airbnbs');
        container.innerHTML = data.map(info =>setDataToUI(info))
        .join(" ")
    })

}

//set data to a DOM
function setDataToUI(data){
    let ui = `<div class="mb-10 col-md-6" style="margin-bottom:30px">                             
    <div class="card" >
       <a onClick="handleOnClick(${data.id})"  id="services-card">
          <div class="price">${data.price}<span>Ksh.</span>  / day</div>
          <div><img id="hotels" src="${data.image}"></div>
          <div class="description">
             <div class="row">
                <div class="col-sm-3"><h4 id="name">${data.name}</h4></div>
                <div class="col-sm-9">
                   <ul>
                   <li><span class="glyphicon glyphicon-user" aria-hidden="true"></span><p>3 persons</p></li>
                   <li><span class="glyphicon glyphicon-signal" aria-hidden="true"></span><p>Free WI-FI</p></li>
                   <li><span class="glyphicon glyphicon-cutlery" aria-hidden="true"></span><p>Kitchen</p></li>
                   <li><span class="glyphicon glyphicon-tint" aria-hidden="true"></span><p>Bathroom</p></li>
                </ul>                
                </div>
             </div>
          </div>
       </a>
    </div>
   
                                                   
  </div>`
 
  return ui;
 }

 function handleOnClick(id){
    //perform a fetch 

    fetch(`${url}/${id}`)
    .then(response=>response.json())
    .then(data =>{
        //set data
        document.getElementById('airbnb-img').src=data.image;
        document.getElementById('airbnb-name').textContent=data.name; 
        document.getElementById('price').textContent=`Ksh. ${data.price}`;
        document.getElementById('about-airbnb').textContent=data.description;

        window.location.href="#";

    })
    
    
 }

 // fetch data
 function fetchBookings(){

    fetch(bookingsUrl)
    .then(response => response.json())
    .then(data =>{
        const container = document.getElementById('orders');
        container.innerHTML = data.map(info =>setordersToUi(info)).join(" ")
    })

 }
 function setordersToUi(data){
    let ui = `<div class=" mb-20 col-md-2" >                             
    <div class="card " >
      
         
                <div class="col-sm-10"><h6 id="name">${data.username}</h6></div>
                <div onclick="cancelBooking(${data.id})">X</div>
          </div>
      
    </div>
   
                                                   
  </div>`
 
  return ui;
 }
 
 function cancelBooking(id){

    fetch(`${bookingsUrl}/${id}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
        }})
        .then(response => response.json())
        .then(data =>{
           
            alert("data Deleted Successfully");
            console.log(data);
        })
    
 }

document.addEventListener('DOMContentLoaded', init);