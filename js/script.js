// declare variables for script to talk to server.js
const base_url = 'http://localhost:5500/';
const login = "login";

let currentMonth, currentYear;

// signup code
function signUp() {
	debugger;
	const _email = document.getElementById("email").value;
	const _password = document.getElementById("password").value;

    const user = {
        "username": _email,
        "password": _password
    };
	
	$.post(base_url + 'register', user, (res) => {
        if (res.status == 200) {
            alert("Signed Up");
            localStorage.setItem('userid', res.userid);
            window.location.href = "../html/login.html";
        } else {
            alert(res.message);
        }
    });
}

// sign in code
$(document).ready(function() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();

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
                localStorage.setItem('userid', res.userid);
                window.location.href = "../html/tracker.html";
            } else {
                alert("Invalid Credentials.");
            }

            console.log("User Logged ", res)
        });
    });
});

// save new user entry into db
function saveentry() {
    debugger;
    const netcal = localStorage.getItem('totalCalories');
    const userid = localStorage.getItem('userid');
    const calconsumed = localStorage.getItem('caloriesConsumed');
    const calburned = localStorage.getItem('caloriesBurned');

    if (!userid) {
        alert("User is not logged in or userID is missing.");
        return;
    }

    const entry = {
        "userid": userid,
        "netcal": netcal,
        "calconsumed": calconsumed,
        "calburned": calburned,
    };

    $.post(base_url + 'entry', entry, (res) => {
        if (res.status == 200) {
            alert("Entry Saved");
            window.location.href = "../html/dashboard.html";
        } else {
            alert(res.message);
            console.log(res.message);
        }
    });
}

// get entries of user from db
function fetchentries() {
    const userid = localStorage.getItem('userid');
    $.get(base_url + 'entries', { userid: userid }, (res) => {
        if (res.status === 200) {
            const entries = res.data;
            populateCalendar(entries, currentMonth, currentYear);
        } else {
            console.log(res.message);
        }
    });
}

// reset all entries of a user from db
function resetentries() {
    const userid = localStorage.getItem('userid');
    $.get(base_url + 'reset', { userid: userid }, (res) => {
        if (res.status === 200) {
            const entries = res.data;
            populateCalendar(entries, currentMonth, currentYear);
        } else {
            console.log(res.message);
        }
    });
}

// create calendar and add content to days if entry was made
function populateCalendar(entries, month, year) {
    const calendarBody = document.getElementById('calendar-body');
    const calendarTitle = document.getElementById('calendar-title');
    const date = new Date(year, month);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek = date.getDay();

    calendarBody.innerHTML = '';

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    calendarTitle.textContent = `${monthNames[month]} ${year} Calorie Tracker`;

    const weeks = Math.ceil((daysInMonth + startDayOfWeek) / 7);
    let dayCounter = 1;

    for (let week = 0; week < weeks; week++) {
        const row = document.createElement('tr');

        for (let day = 0; day < 7; day++) {
            const cell = document.createElement('td');

            if (week === 0 && day < startDayOfWeek) {
                cell.className = 'calendar-cell empty-cell';
            } else if (dayCounter <= daysInMonth) {
                const entry = entries.find(e => new Date(e.entrydate).getDate() === dayCounter && new Date(e.entrydate).getMonth() === month && new Date(e.entrydate).getFullYear() === year);
                if (entry) {
                    cell.innerHTML = `
                        <strong>${dayCounter}</strong><br>
                        Consumed: ${entry.calconsumed}<br>
                        Burned: ${entry.calburned}<br>
                        Net: ${entry.netcal}
                    `;
                } else {
                    cell.innerHTML = `<strong>${dayCounter}</strong>`;
                }
                cell.className = 'calendar-cell';
                cell.dataset.day = dayCounter;
                dayCounter++;
            } else {
                cell.className = 'calendar-cell empty-cell';
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

// change the months of calendar
function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    fetchentries();
}

// month changes click
$('#prev-month').click(() => changeMonth(-1));
$('#next-month').click(() => changeMonth(1));

// dashboard initialization
if (window.location.pathname.includes('dashboard.html')) {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    fetchentries();
};