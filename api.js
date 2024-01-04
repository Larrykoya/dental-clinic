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
