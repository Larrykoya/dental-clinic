let authBtn = document.getElementById("auth");
let cpane = document.getElementById("content");
let profileBtn = document.getElementById("counter-auth");

function signup(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let firstname = event.target[0].value;
  let lastname = event.target[1].value;
  let email = event.target[2].value.toLowerCase();
  let phone = event.target[3].value;
  let password = event.target[4].value;
  let gender = event.target[5].checked
    ? event.target[5].value
    : event.target[6].value;
  let role = event.target[7].value;
  fetch("signup.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      firstname,
      lastname,
      email,
      phone,
      password,
      gender,
      role,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        setCookie("id", data.user_id, 0.0625);
        setCookie("role", data.user_role, 0.0625);
        authBtn.style.visibility = "hidden";
        profileBtn.style.visibility = "visible";
        alert(`Welcome, Signup successful.`);
        location.reload();
      } else {
        alert(`Error: ${data.message}`);
      }
    })
    .catch((err) => console.log(err));
}

function login(event) {
  event.preventDefault();
  let email = event.target[0].value;
  let password = event.target[1].value;
  let role = event.target[2].value;
  fetch("login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      role,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        setCookie("id", data.user_id, 0.0625);
        setCookie("role", data.user_role, 0.0625);
        authBtn.style.visibility = "hidden";
        profileBtn.style.visibility = "visible";
        alert(`Welcome, Login successful.`);
        location.reload();
      } else {
        alert(`Error: ${data.message}`);
        // document.getElementById("error").innerHTML = `${data.message}`;
        // document.getElementById("error").style.visibility = "visible";
      }
    })
    .catch((err) => console.log(err));
}
const logout = () => {
  deleteCookie("id");
  deleteCookie("role");
  authBtn.style.visibility = "visible";
  profileBtn.style.visibility = "hidden";
};
function createRole(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let title = event.target[0].value;
  let jobDescription = event.target[1].value;
  fetch("role.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      jobDescription,
    }),
  })
    .then((response) => {
      //   if (response) {
      //   } else {
      //     return response.json();
      //   }
      return response.text();
      //   JSON.parse(response);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}
function createService(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let name = event.target[0].value;
  let serviceDescription = event.target[1].value;
  let serviceFee = event.target[2].value;
  fetch("service.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      serviceDescription,
      serviceFee,
    }),
  })
    .then((response) => {
      //   if (response) {
      //   } else {
      //     return response.json();
      //   }
      return response.text();
      //   JSON.parse(response);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}
function createBranch(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let name = event.target[0].value;
  let address = event.target[1].value;
  fetch("branch.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      address,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}
function createReview(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let username = event.target[0].value;
  let content = event.target[1].value;
  fetch("review.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      username,
      content,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      mountReviewsComponent();
    })
    .catch((err) => console.log(err));
}
function postReport(event) {
  event.preventDefault();
  let report_id = crypto.randomUUID();
  let patient_id = event.target.id;
  //   let employee_id = ;
  let message = event.target[0].value;
  fetch("review.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      username,
      content,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      mountReviewsComponent();
    })
    .catch((err) => console.log(err));
}
function createPayment(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let patient_id = getCookie("id");
  let details = event.target[0].value;
  let amount = event.target[1].value;
  let method = event.target[2].value;
  fetch("payment.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      patient_id,
      details,
      amount,
      method,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}
function postAnnouncement(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let employee_id = getCookie("id");
  let title = event.target[0].value;
  let message = event.target[1].value;
  console.log(employee_id);
  fetch("announcement.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      employee_id,
      title,
      message,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
      mountAnnouncementComponent();
    })
    .catch((err) => console.log(err));
}
function updateUserProfile(event) {
  event.preventDefault();
  let id = getCookie("id");
  let role = getCookie("role");
  let firstname = event.target[0].value;
  let lastname = event.target[1].value;
  let address = event.target[3].value;
  let phone = event.target[4].value;
  let dob = event.target[5].value;
  fetch("update.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      role,
      firstname,
      lastname,
      address,
      phone,
      dob,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}
function mountUserProfile() {
  let id = getCookie("id");
  let role = getCookie("role");
  fetch("update.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      role,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let content = `<form action="" class="signup-form" onsubmit="updateUserProfile(event)">
        <h3 class="label">Update Your Profile</h3>
        <label class="update-label" for="">Firstname</label>
        <input
          class="input"
          style="margin: 0"
          value="${data[0].firstname}"
          type="text"
          name="fname"
        />
        <label class="update-label" for="">Lastname</label>
        <input
          class="input"
          style="margin: 0"
          value="${data[0].lastname}"
          type="text"
          name="lname"
        />
        <label class="update-label" for="">Email</label>
        <input
          class="input"
          style="margin: 0"
          readonly
          value="${data[0].email}"
          type="email"
          name="email"
        />
        <label class="update-label" for="">Address</label>
        <input
          class="input"
          style="margin: 0"
          value="${data[0].address}"
          type="text"
          name="address"
        />
        <label class="update-label" for="">Phone</label>
        <input
          class="input"
          style="margin: 0"
          value="${data[0].phone}"
          type="text"
          name="phone"
        />
        <label class="update-label" for="">Date of Birth</label>
        <input
          class="input"
          style="margin: 0"
          value="${data[0].dob}"
          type="date"
          name="dob"
        />
  
        <input type="submit" class="long-btn" value="Update Profile" />
      </form>`;
      cpane.innerHTML = `
        <div id="signup-container">
          ${content}
        </div>
        `;
    })
    .catch((err) => {
      console.log(err);
    });
}
function createEquipment(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let name = event.target[0].value;
  let desc = event.target[1].value;
  fetch("equipment.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      desc,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
      mountEquipmentsComponent();
    })
    .catch((err) => console.log(err));
}
function createDepartment(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let name = event.target[0].value;
  fetch("department.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
      mountDepartmentsComponent();
    })
    .catch((err) => console.log(err));
}
function makeBooking(event) {
  let id = crypto.randomUUID();
  let service_id = event.target.id;
  let patient_id = getCookie("id");
  fetch("booking.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      service_id,
      patient_id,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}
function setAppointment(event) {
  let id = crypto.randomUUID();
  let service_id = event.target.id;
  let date = event.target[0].value;
  let time = event.target[1].value;
  let employee_id = event.target[2].value;
  let patient_id = event.target[3].value;
  fetch("appointment.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      service_id,
      date,
      time,
      employee_id,
      patient_id,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("Appointment set");
    })
    .catch((err) => console.log(err));
}

let setCookie = (name, value, daysToExpire) => {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
let getCookie = (name) => {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
};
let deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
onload = (e) => {
  if (getCookie("role")) {
    authBtn.style.visibility = "hidden";
    profileBtn.style.visibility = "visible";
  } else {
    authBtn.style.visibility = "visible";
    profileBtn.style.visibility = "hidden";
  }
};
