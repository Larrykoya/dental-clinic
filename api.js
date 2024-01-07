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
      console.log(data);
      setCookie("id", data.user_id, 0.0625);
      setCookie("role", data.user_role, 0.0625);
    })
    .catch((err) => console.log(err));
}
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
      console.log(data);
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
  let username = event.target[0].value;
  let content = event.target[1].value;
  fetch("branch.php", {
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
    })
    .catch((err) => console.log(err));
}
function postAnnouncement(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let title = event.target[0].value;
  let announcement = event.target[1].value;
  fetch("announcement.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      announcement,
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
