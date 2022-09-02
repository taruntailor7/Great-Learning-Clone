const login = async()=>{
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    let res = await fetch("https://great-learning-masai.herokuapp.com/users");
    let data = await res.json();


    let flag = false;
    for(let i=0; i<data.length; i++){
        if(data[i].email === email && data[i].password === password){
            let res = await fetch("https://great-learning-masai.herokuapp.com/loggedInUser",{
                method : 'POST',
                body : JSON.stringify(data[i]),
                headers : {
                    'Content-Type': "application/json"
                }
            });
            // console.log(data[i].id);
            localStorage.setItem("loggedInUserId",data[i].id);
            flag = true;
        }
    }

    if(flag){
        location = "./index.html";
        alert("Successfully Logged In !");
    }
    else{
        alert("Wrong Credentials!");
    }

}
