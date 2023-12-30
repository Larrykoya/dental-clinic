let pane = document.getElementById("content");
// const dataToSend = { key: "value" };
// fetch("index.php", {
//   method: "POST",
//   body: JSON.stringify(dataToSend),
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

let mountLoginComponent = () => {
  pane.innerHTML = `
  <div id="login-container">
        <form action="" class="login-form">
        <h3 class="label">Login</h3>
          <div><label for="email">Email</label></div>
          <div class="form-elements">
            <input
              class="login-input"
              type="email"
              name="email"
              id=""
              required
            />
          </div>
          <div><label for="password">Password</label></div>
          <div class="form-elements">
            <input
              class="login-input"
              type="password"
              name="password"
              id=""
              required
            />
          </div>
          <input type="submit" class="login-input long-btn" value="Login" />
          <p id="forgot-pass">Forgot Password?</p>
        </form>
      </div>
  `;
};
const mountSignupComponent = () => {
  pane.innerHTML = `<div id="signup-container">
  <form action="" class="signup-form">
      <h3 class="label">Create an account</h3>
      <label for="fname">Firstname</label>
      <div class="signup-form-elements"><input class="signup-input" type="text" name="fname" id="" required></div>
<div >
      <label for="lname">Lastname</label>
      <div class="signup-form-elements"><input class="signup-input" type="text" name="lname" id="" required></div>
<div >
      <label for="email">Email</label></div>
      <div class="signup-form-elements"><input class="signup-input" type="text" name="phone" id="" required></div>
      <label for="phone">Phone Number</label>
      <div class="signup-form-elements"><input class="signup-input" type="text" name="lname" id="" required></div>
<div >
      <div ><label for="password">Password</label></div>

      <div class="signup-form-elements"><input class="signup-input" type="password" name="password" id="" required></div>
      <div id="gender-option">
      <label for="gender">Male</label>
      <input type="radio" name="gender" id="male" value"male" required />
      <label for="gender">Female</label>
      <input type="radio" name="gender" id="female" value"female" required />
      </div>
      <select required name="user-type" id="" class="signup-input selection">
          <option value="patient">
              Patient
          </option>
          <option value="employee">
              Employee
          </option>
          <option value="visitor">
              Visitor
          </option>
      </select>
      <input type="submit" class="signup-input long-btn" value="Create Account">
      
  </form>

</div>`;
};
let mountSearchComponent = () => {
  pane.innerHTML = `<div id="search-container">
  <h2 class="label">Search User</h2>
  <input
    type="text"
    class="input-field"
    placeholder="Enter email of the user..."
  />
  <button class="btn">Search</button>
  <div id="search-result">
    <h3>result1</h3>
    <h3>result2</h3>
    <h3>result3</h3>
  </div>
</div>`;
};
// setCookie("name", "alice", 0.25);

let setCookie = (name, value, daysToExpire) => {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
console.log(getCookie("name"));
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
