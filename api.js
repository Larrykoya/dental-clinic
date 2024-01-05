function signup(event) {
  event.preventDefault();
  let id = crypto.randomUUID();
  let firstname = event.target[0].value;
  let lastname = event.target[1].value;
  let email = event.target[2].value;
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
function addService(event) {
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
