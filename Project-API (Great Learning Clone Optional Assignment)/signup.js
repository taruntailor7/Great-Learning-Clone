
const register = async () => {
    // event.preventDefault();
    let user_data = {
        name  : document.getElementById("name").value,
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
        role : document.getElementById("roles").value
    }

    let res = await fetch("https://great-learning-masai.herokuapp.com/users",{
        method : 'POST',
        body : JSON.stringify(user_data),
        headers : {
            'Content-Type': "application/json"
        }
    });
    alert("Registered Successfully!")
    location = "./login.html"
    let data = await res.json(); // this is for just to see the data only.
    console.log(data);
}



