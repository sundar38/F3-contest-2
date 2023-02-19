let burgernames = document.getElementById("displayburgernames")
let displayrandomburgers=document.getElementById("display3burgers")
let finalmsg=document.getElementById("thankyoumsg")
function getMenu() {
    // console.log(data);
    return new Promise((resolve, reject) => {
        fetch("https://free-food-menus-api-production.up.railway.app/burgers")
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                let itemslist = [];
                for (let singleitem of data) {
                    itemslist.push(singleitem.name)
                    burgernames.innerHTML += `<li>${singleitem.name}</li>`
                }
                burgernames.innerHTML+=".........................................................................................................................................."
                resolve(itemslist)
            })      

    })
}
function takeOrder(data){
    return new Promise((resolve, reject)=>{
       
        setTimeout(()=>{
            console.log(data.length);        
            let obj1=data[Math.floor(Math.random()*data.length)]      
            let obj2=data[Math.floor(Math.random()*data.length)]
            let obj3=data[Math.floor(Math.random()*data.length)]
            let finalobj={item1:`${obj1}`, item2: `${obj2}`, item3:`${obj3}`}
            console.log("entered 2nd function", finalobj)    
            displayrandomburgers.innerHTML+="Final list of your burgers"
            displayrandomburgers.innerHTML+=`<li>${obj1}</li>`
            displayrandomburgers.innerHTML+=`<li>${obj2}</li>`
            displayrandomburgers.innerHTML+=`<li>${obj3}</li>`
            displayrandomburgers.innerHTML+="..........................................................................................................................................."
            resolve(finalobj)
        },2500)
    })
}

function orderPrep(data){
    console.log(data);
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let paymentinfo={
                order_status:true, 
                paid:false
            }
            resolve(paymentinfo)
        }, 1500)
    })
}

function payOrder(data){
    console.log(data);
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let finalorderstatus={
                order_status:true, 
                paid:true
            }
            resolve(finalorderstatus)
        }, 1000)
    })
}
function thankyouFnc(data){
    console.log(data);
    alert("Thank you your order has been booked")
    finalmsg.innerHTML+="<h1>Your order has booked</h1>"
    finalmsg.innerHTML+=`<img src=images/congratulations.jpg></img>`
}

getMenu()
.then((data)=>takeOrder(data))
.then((data)=> orderPrep(data))
.then((data)=>payOrder(data))
.then((data)=>thankyouFnc(data))