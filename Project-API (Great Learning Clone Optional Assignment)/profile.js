userId = localStorage.getItem("loggedInUserId");

const userDetails = async ()=>{
    let res = await fetch(`https://great-learning.onrender.com/users/${userId}`);
    let user = await res.json();
    // console.log(user);

    var div = document.createElement('div');

    var name = document.createElement("p");
    name.innerText = "Name : "+user.name;
    
    var email = document.createElement("p");
    email.innerText = "Email : " +user.email;

    var role = document.createElement("p");
    role.innerText = "Your Role : " +user.role;

    div.append(name, email, role);
    document.getElementById("userDetails").append(div);
}
userDetails();

const displayPurchasedCourse = async ()=>{
    let res = await fetch(`https://great-learning.onrender.com/users/${userId}/purchasedCourses`);
    let course = await res.json();
    // console.log(course);
    course.map((element)=>{
        var div = document.createElement('div');

        var image = document.createElement("img");
        image.setAttribute("src", element.image);
        image.addEventListener("click", ()=>{
            location = "./courses.html"
        })

        var name = document.createElement("h2");
        name.innerText = element.name;

        div.append(image,name);
        document.getElementById("displayPurchased").append(div);
    })
}
displayPurchasedCourse();