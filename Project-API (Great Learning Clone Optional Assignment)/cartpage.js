let userId = localStorage.getItem("loggedInUserId");
let cartTotal = 0;
const displayCart = async ()=>{
    // document.getElementById("displayCourses").innerHTML = ""
    let cartRes = await fetch(`https://great-learning.onrender.com/users/${userId}/cart`);
    let cart = await cartRes.json();
    // console.log(cart);
    cart.map((element,index)=>{
        let div = document.createElement('div');
        
        let image = document.createElement('img');
        image.setAttribute('src', element.imageUrl);
        image.addEventListener("click", ()=>{
            location = "./courses.html"
        });

        let title = document.createElement('h2');
        title.innerText = element.name;

        let price = document.createElement('h4');
        price.innerText = element.price;

        let description = document.createElement('p');
        description.innerText = element.desc;

        let remove = document.createElement('button');
        remove.innerText = "Remove";
        remove.addEventListener('click', () =>{
            removed(element,index);
        })

        div.append(image,title,price,description,remove);
        document.getElementById("displayCart").append(div);

        // console.log(element.price);
        cartTotal+=Number(element.price);
        document.getElementById("total").innerHTML = "Cart Value : "+"₹"+cartTotal;
        // console.log(cartTotal);

        
    });
}
displayCart();

const removed = async (element)=>{
    // console.log(index);
    let id = element.id; // element is
    let removeCourseRes = await fetch(`https://great-learning.onrender.com/cart/${id}`,{
        method : "DELETE",
    });
    alert("Course removed")
    location.reload();
}

// let courseId = localStorage.getItem("courseId");

const total = async ()=>{
    let res = await fetch(`https://great-learning.onrender.com/users/${userId}/cart`);
    let purchasedCourses = await res.json();
    console.log(purchasedCourses,"len pur");

    //var send = await fetch(`http://localhost:3000/users/${userId}/purchasedCourses`)

    purchasedCourses.map(async (element)=>{
        console.log(element);
        let purchasedCourseName ={
            name: element.name,
            image: element.imageUrl,
        }
        let abc = await fetch(`https://great-learning.onrender.com/users/${userId}/purchasedCourses`,{
            method: "POST",
            body: JSON.stringify(purchasedCourseName),
            headers: {
                'content-type': 'application/json'
            }
        });
        // var a =  abc.json();
        // console.log(a);
        // console.log(element.id);
        let emptyCart = await fetch(`https://great-learning.onrender.com/users/${userId}/cart`,{
            method: 'PUT',
        });
    });
    alert("Course purchased")
    location = "./courses.html";
    // for(var i=0; i<purchasedCourses.length; i++) {
        // purchasedCourses.splice(userId,1);
        
    // }


   // localStorage.setItem("purchasedCourses",JSON.stringify(purchasedCourses));
}
document.getElementById("totalBtn").addEventListener("click", total);
