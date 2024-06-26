const base_url = 'http://localhost:5500/';
const login = "login";
  
function signUp() {
	debugger;
	const _email = document.getElementById("email").value;
	const _password = document.getElementById("password").value;

    // Send registration data to the server
    const user = {
        "username": _email,
        "password": _password
    };
	
	$.post(base_url + 'register', user, (res) => {
        if (res.status == 200) {
            alert("Signed Up");
            // Store the userid for future use
            localStorage.setItem('userid', res.userid);
            window.location.href = "../html/login.html";
        } else {
            alert(res.message);
        }
    });
}

function saveentry() {
    debugger;
    const netcal = document.getElementById("calories-total").value;
    const entrydate = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    const userid = localStorage.getItem('userid'); // Retrieve the stored userid

    const entry = {
        "userid": userid,
        "netcal": netcal,
        "entrydate": entrydate
    };

    $.post(base_url + 'entry', entry, (res) => {
        if (res.status == 200) {
            alert("Entry Saved");
            window.location.href = "../html/dashboard.html";
        } else {
            alert(res.message);
        }
    });
}

$(document).ready(function() {

    $('#login_b').click(() => {
        console.log('User Login')
        const email  = $('#txtuser_email').val();
        const  password = $('#txtuser_password').val();

        
        if (email == "") {
            alert("Please Enter Email");
            return;
        }

        if (password == "") {
            alert("Please Enter Password");
            return;
        }
        const user = {
            "username": email,
            "password": password
        };

        $.post(base_url + login, user, (res) => {
            console.log(res);
             if (res.status == 200) {
                window.location.href = "../html/tracker.html";
            } else {
                alert("Invalid Credentials.");
            }

            console.log("User Logged ", res)
        });
    });
});