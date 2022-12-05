let usersId = localStorage.getItem("loggedInUserId");
const displayCourses = async ()=>{
    // document.getElementById("displayCourses").innerHTML = ""
    let coursesRes = await fetch(`https://great-learning.onrender.com/users/${usersId}/wishlist`);
    let courses = await coursesRes.json();
    console.log(courses);
    courses.map((element,index)=>{
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
        document.getElementById("displayCourses").append(div);
    });
}
displayCourses();

const removed = async (element,index)=>{
    // console.log(index);
    let id = element.id; // element is
    // console.log(id);
    let removeCourseRes = await fetch(`https://great-learning.onrender.com/wishlist/${id}`,{
        method : "DELETE",
    });
    alert("Course removed")
    location.reload();
}