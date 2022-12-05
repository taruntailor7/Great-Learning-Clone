const addCourses = async ()=>{
    let courseObj = {
        imageUrl : document.getElementById("courseImage").value,
        name : document.getElementById("courseName").value,
        price : document.getElementById("coursePrice").value,
        desc : document.getElementById("courseDesc").value, 
    }

    let res = await fetch("https://great-learning.onrender.com/courses",{
        method : "POST",
        body : JSON.stringify(courseObj),
        headers : {
            'Content-Type': 'application/json'
        }
    });
    alert("Course added successfully");
    location.reload();
}
document.getElementById("addCourseBtn").addEventListener('click', addCourses);

let userId = localStorage.getItem("loggedInUserId");

const displayCourses = async ()=>{
    // document.getElementById("displayCourses").innerHTML = ""
    let coursesRes = await fetch("https://great-learning.onrender.com/courses");
    let courses = await coursesRes.json();
    // console.log(courses);
    courses.map(async (element,index)=>{

        let div = document.createElement('div');

        let image = document.createElement('img');
        image.setAttribute('src', element.imageUrl);
        image.addEventListener('click', ()=>{
            goToDescription(element.id);
            
        });
        let title = document.createElement('h2');
        title.innerText = element.name;

        let price = document.createElement('h4');
        price.innerText = "Price : "+element.price;

        let description = document.createElement('p');
        description.innerText = "Desc : "+element.desc;

        let wishlist = document.createElement('button');
        wishlist.innerText = "Add to Wishlist";
        wishlist.setAttribute("id","addToWishlist")
        wishlist.addEventListener('click', () =>{
            addToWishlist(element);
        })

        let userRes = await fetch(`https://great-learning.onrender.com/users/${userId}`);
        let userData = await userRes.json();
        let userRole = userData.role;

        if(userRole == "student" || userRole == "admin"){
            div.append(image,title,price,description,wishlist);
            document.getElementById("addCourse").style.display = "none";
            document.getElementById("addCour").style.display = "none";
        }
        else{
            let remove = document.createElement('button');
            remove.innerText = "Remove";
            remove.setAttribute("id","remCourse")
            remove.addEventListener('click', () =>{
                removed(element,index);
            })

            div.append(image,title,price,description,wishlist,remove);
        }

        document.getElementById("displayCourses").append(div);
    });
}
displayCourses();

const removed = async (element,index)=>{
    // console.log(index);
    let id = element.id; // element is
    // console.log(id);
    let removeCourseRes = await fetch(`https://great-learning.onrender.com/courses/${id}`,{
        method : "DELETE",
    });
    alert("Course removed")
    location.reload(); 
}

// let userId = localStorage.getItem("loggedInUserId");
const addToWishlist = async (element)=>{
    let wishlistObj = {
            imageUrl: element.imageUrl,
            name: element.name,
            price: element.price,
            desc: element.desc,
    };
    let addToWishlist = await fetch(`https://great-learning.onrender.com/users/${userId}/wishlist`,{
        method : "POST",
        body : JSON.stringify(wishlistObj),
        headers : {
            'Content-Type': 'application/json'
        }
    });    
    alert("Course added to the wishlist")
    location.reload();                 
}

const goToDescription =(courseId) => {
    localStorage.setItem("courseId",courseId);
    console.log(courseId);
    window.location.href = "./courseDescription.html";
}


