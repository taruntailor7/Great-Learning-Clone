const logout = async()=>{
    let res = await fetch("https://great-learning.onrender.com/loggedInUser");
    let data = await res.json();
    // data.filter((element)=>{

    // })
    // Remember ==> i have to map and find the user by using email then get id and then delete that particular user
    let id = localStorage.getItem("loggedInUserId");

    let deleteRes = await fetch(`https://great-learning.onrender.com/loggedInUser/${id}`,{
        method: "DELETE",
    });
    window.location.href = "./index.html";
    // console.log(deleteRes);
    localStorage.removeItem("loggedInUserId");
    // localStorage.removeItem("courseId");
}

// Functionalities Section

var userId = localStorage.getItem("loggedInUserId") || 0;

const displayUser = async ()=>{

    if(userId>0){
        document.getElementById("buttons").innerHTML = "";
        let user = await fetch(`https://great-learning.onrender.com/users/${userId}`);
        let userData = await user.json();
        let name = "Hello, " +userData.name;
        
        let anchor = document.createElement("a");
        anchor.append(name);
        anchor.setAttribute("href", "./profile.html");
        document.getElementById("buttons").append(anchor);
    }

}
displayUser();

const displayCourse = async ()=>{
    // document.getElementById("displayCourses").innerHTML = ""
    let coursesRes = await fetch("https://great-learning.onrender.com/courses");
    let courses = await coursesRes.json();
    // console.log(courses);
    courses.map(async (element,index)=>{
        let div = document.createElement('div');

        let image = document.createElement('img');
        image.setAttribute('src', element.imageUrl);
        image.addEventListener('click', ()=>{
            if(userId ===0){
                window.location.href = "./login.html";
            }
            else{
                window.location.href = "./courses.html";
            }
        });
        let title = document.createElement('h2');
        title.innerText = element.name;

        let price = document.createElement('h4');
        price.innerText = "Price : "+element.price;

        let description = document.createElement('p');
        description.innerText = "Desc : "+element.desc;

        div.append(image,title,price,description);
        document.getElementById("displayCourse").append(div);
    });
}
displayCourse();

// console.log(userId);
const displayNavbar = ()=>{
    var indCourse = document.createElement("a");
    indCourse.innerText = "Course";

    var indSuccessStories = document.createElement("a");
    indSuccessStories.innerText = "Success Stories";

    var indBlog = document.createElement("a");
    indBlog.innerText = "Blog";

    var indCartpage = document.createElement("a");
    indCartpage.innerText = "Cart";

    var indWishlist = document.createElement("a");
    indWishlist.innerText = "Wishlist";

    if(userId === 0){
        indCourse.setAttribute("href","./login.html");
        indSuccessStories.setAttribute("href","./login.html");
        indBlog.setAttribute("href","./login.html");
        indCartpage.setAttribute("href","./login.html");
        indWishlist.setAttribute("href","./login.html");
    }
    else{
        indCourse.setAttribute("href","./courses.html");
        indSuccessStories.setAttribute("href","https://www.mygreatlearning.com/alumni");
        indBlog.setAttribute("href","https://www.mygreatlearning.com/blog");
        indCartpage.setAttribute("href","./cartpage.html");
        indWishlist.setAttribute("href","./wishlist.html");
    }

    document.getElementById("indexNavbar").append(indCourse,indSuccessStories,indBlog,indCartpage,indWishlist);
}
displayNavbar();





