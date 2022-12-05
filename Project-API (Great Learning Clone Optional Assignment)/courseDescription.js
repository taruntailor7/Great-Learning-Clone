let courseId = localStorage.getItem("courseId");
let userId = localStorage.getItem("loggedInUserId");
// console.log(courseId);

const displayCoursesDescription = async () => {
  let res = await fetch(`https://great-learning.onrender.com/courses/${courseId}`);
  let data = await res.json();
  // console.log(data);

  let div = document.createElement("div");

  let image = document.createElement("img");
  image.setAttribute("src", data.imageUrl);

  let title = document.createElement("h2");
  title.innerText = data.name;

  let price = document.createElement("h4");
  price.innerText = "Price: "+data.price;

  let description = document.createElement("p");
  description.innerText = "Desc: "+data.desc;

  let addToCart = document.createElement("button");
  addToCart.innerText = "Add to Cart";
  addToCart.addEventListener("click", () => {
    addIntoCart(data);
  });

  // let enroll = document.createElement("button");
  // enroll.innerText = "Enroll";
  // enroll.addEventListener('click',()=>{
  //         // enroll();
  // });

    var userRes = await fetch(`https://great-learning.onrender.com/users/${userId}`);
    var userData = await userRes.json();
    var userRole = userData.role;

    let fetchingRes = await fetch(`https://great-learning.onrender.com/users/${userId}/purchasedCourses`);
    let fetched = await fetchingRes.json();

    var flag = false;
      for(var i=0;i<fetched.length;i++){
        if(data.name == fetched[i].name){
          console.log(data.name,"name 56");
          flag = true;
        }
      }
      if(flag){
        var enrolled = document.createElement("button");
        enrolled.innerText = "Enrolled";
        div.append(image, title, price, description,enrolled);
        document.getElementById("crtLec").style.display = "none";
        document.getElementById("createLecture").style.display = "none";
      }
      else{
        if(userRole == "student"){
          // div.append(image, title, price, description, addToCart, enroll);
          document.getElementById("crtLec").style.display = "none";
          document.getElementById("createLecture").style.display = "none";
        }
        // else{
        //     // div.append(image, title, price, description, addToCart, enroll);
        // }
        div.append(image, title, price, description, addToCart);
      }


  document.getElementById("courseDescription").append(div);
};
displayCoursesDescription();

const addIntoCart = async (element) => {
  let addtoCartObj = {
    imageUrl: element.imageUrl,
    name: element.name,
    price: element.price,
    desc: element.desc,
  };
  let addToCart = await fetch(`https://great-learning.onrender.com/users/${userId}/cart`, {
    method: "POST",
    body: JSON.stringify(addtoCartObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("Course added in you cart");
  location.reload();
};

const createLecture = async () => {
  let lectureObj = {
    thumbnail: document.getElementById("lectureThumbnail").value,
    topic: document.getElementById("lectureTopic").value,
    lectureDesc: document.getElementById("lectureDesc").value,
    lectureLink: document.getElementById("lectureLink").value,
  };
  let lectureRes = await fetch(
    `https://great-learning.onrender.com/courses/${courseId}/lectures`,
    {
      method: "POST",
      body: JSON.stringify(lectureObj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  alert("Lecture created successfully");
  location.reload();
};

document.getElementById("createLectureBtn").addEventListener("click", createLecture);

var userRes = await fetch(`https://great-learning.onrender.com/users/${userId}`);
var userData = await userRes.json();
var userRole = userData.role;


const displayAllLectures = async () => {
  let allLecturesRes = await fetch(
    `https://great-learning.onrender.com/courses/${courseId}/lectures`
  );
  let lectureData = await allLecturesRes.json();
  // console.log(lectureData);
  // this is for not showing remove button for student part -1
  

  lectureData.map((element,index) => {
    let div = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", element.thumbnail);
    image.addEventListener("click", () => {
      playVideo(element.lectureLink, element, index);
    });

    let title = document.createElement("h3");
    title.innerText = element.topic;

    // let description = document.createElement("p");
    // description.innerText = element.lectureDesc;

    let removeLecture = document.createElement("button");
    removeLecture.innerText = "Remove";
    removeLecture.addEventListener('click', () =>{
      removed(element);
    })
      // this is for not showing remove button for student part-2
      if(userRole == "student"){
        div.append(image, title,); 
      }
      else{
        div.append(image, title, removeLecture);
      }

    // div.append(image, title, description, removeLecture);
    document.getElementById("allLectures").append(div);
  });
};
displayAllLectures();

const playVideo = async (link, element, index) => {
  console.log(element.courseId, "courseId");
  let res = await fetch(`https://great-learning.onrender.com/courses/${element.courseId}`);
  let accessible = await res.json();
  console.log(accessible.name,"accessible");
  console.log(courseId,"couid");

  let fetchingRes = await fetch(`https://great-learning.onrender.com/users/${userId}/purchasedCourses`);
  let fetched = await fetchingRes.json();
  // console.log(fetched[0].name);

  if(userRole == "student"){
    var flag = false;
    if(fetched.length==0 && index == 0){
      flag = true;
    }
    for(var i=0;i<fetched.length;i++){
      if(index==0 || accessible.name == fetched[i].name){
        flag = true;
      }
    }
    if(flag){
      localStorage.setItem("link", link);
      document.getElementById("lecturesToPlay").innerHTML = 
      `<iframe width="560" height="315" src=${link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
    else{
      alert("Please Purchase The Course To see the Lectures!");
    }
  }
  else{
    localStorage.setItem("link", link);
    document.getElementById("lecturesToPlay").innerHTML = 
    `<iframe width="560" height="315" src=${link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  }

};

const removed = async (element)=>{
  // console.log(index);
  let id = element.id; // element is
  // console.log(id);
  let removeCourseRes = await fetch(`https://great-learning.onrender.com/lectures/${id}`,{
      method : "DELETE",
  });
  alert("Lecture removed");
  location.reload();
}