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
          <div class="">
            <input
              class="input"
              type="email"
              name="email"
              id=""
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="">
            <input
              class="input"
              type="password"
              name="password"
              id=""
              required
              placeholder="Enter your password"
            />
          </div>
          <input type="submit" class="long-btn" value="Login" />
          <p id="forgot-pass">Forgot Password?</p>
          <h3 class="error">Incorrect credentials</h3>
        </form>
      </div>
  `;
};
const mountSignupComponent = () => {
  pane.innerHTML = `<div id="signup-container">
  <form action="" class="signup-form">
      <h3 class="label">Create an account</h3>
      <input class="input" placeholder="Enter Your Firstname..." type="text" name="fname" id="" required>

      <input class="input" placeholder="Enter Your Lastname..." type="text" name="lname" id="" required>
      
      <input class="input" placeholder="Enter Your Email..." type="email" name="email" id="" required>

      <input class="input" placeholder="Enter Your Phone Number..." type="text" name="phone" id="" >
    
      <input class="input" placeholder="Create a Password" type="password" name="password" id="" required>
      <div id="gender-option">
      <label for="gender">Male</label>
      <input type="radio" name="gender" id="male" value="male" required />
      <label for="gender">Female</label>
      <input type="radio" name="gender" id="female" value="female" required />
      </div>
      <select required name="user-type" id="" class="input selection">
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
  <form action="" method="">
  <input
  type="text"
  class="input"
  placeholder="Enter email of the user..."
  required
/>
<button type="submit" class="long-btn">Search</button>
  </form>
  <div id="search-result">
    <h3>result1</h3>
    <h3>result2</h3>
    <h3>result3</h3>
  </div>
</div>`;
};
let mountServicesComponent = () => {
  pane.innerHTML = `
  <div id="services-container">
        <h2 class="label">Our Services</h2>
        <div class="services-list flex">
          <div id="services">
            <h3>service 1</h3>
            <h3>service 2</h3>
            <h3>service 3</h3>
          </div>
          <button
            onclick="mountAddServiceComponent()"
            class="btn"
          >
            Add Service
          </button>
        </div>
      </div>`;
};
let mountAddServiceComponent = () => {
  pane.innerHTML = `<div id="add-service-container">
  <form action="" class="">
    <h3 class="label">Add Service</h3>
    <div class="">
      <input
        class="input"
        type="text"
        name="service-name"
        id=""
        placeholder="Enter Service Name..."
        required
      />
    </div>
    <textarea
      name="service-description"
      id="service-description"
      cols="30"
      rows="10"
      required
      placeholder="Enter Service Description..."
    ></textarea>
    <div class="">
      <input
        class="input"
        type="number"
        name="service-fee"
        id=""
        required
        placeholder="Enter Service Fee..."
      />
    </div>
    <input type="submit" class="long-btn" value="Add Service" />
  </form>
</div>`;
};
let mountBranchComponent = () => {
  pane.innerHTML = `
  
  <div id="branches-container">
  <h3 class="label">Our Branches</h3>
  <div class="services-list flex">
    <div id="branches">
      <h3>branch 1</h3>
      <h3>branch 2</h3>
      <h3>branch 3</h3>
    </div>
    <button
      onclick="mountAddBranchComponent()"
      class="btn"
    >
      Add Branch
    </button>
  </div>
</div>`;
};
let mountAddBranchComponent = () => {
  pane.innerHTML = `<div id="add-branch-container">
  <form action="" class="">
    <h3 class="label">Add New Branch</h3>
    <div class="">
      <input
        class="input"
        type="text"
        name="branch-name"
        id=""
        placeholder="Enter Branch Name..."
        required
      />
    </div>
    <div class="">
      <input
        class="input"
        type="text"
        name="branch-address"
        id=""
        required
        placeholder="Enter Branch Address..."
      />
    </div>
    <input type="submit" class="long-btn" value="Add Branch" />
  </form>
</div>`;
};
let mountDepartmentsComponent = () => {
  pane.innerHTML = `<div id="departments-container">
  <h3 class="label">Departments</h3>
  <div class="services-list">
    <div id="departments">
      <h3>department 1</h3>
      <h3>department 2</h3>
      <h3>department 3</h3>
    </div>
    <button onclick="mountAddDeptComponent()" class="long-btn">
      Add New Department
    </button>
  </div>
</div>`;
};
let mountAddDeptComponent = () => {
  pane.innerHTML = `<div id="add-department-container">
  <form action="" class="">
    <h3 class="label">Add New Department</h3>
    <div class="">
      <input
        class="input"
        type="text"
        name="department-name"
        id=""
        placeholder="Enter Department Name..."
        required
      />
    </div>
    <input type="submit" class="long-btn" value="Add Department" />
  </form>
</div>`;
};
let addRole = () => {
  pane.innerHTML = `<div id="add-role-container">
  <form action="" class="">
    <h3 class="label">Add New Role</h3>
    <div class="">
      <input
        class="input"
        type="text"
        name="role-title"
        id=""
        placeholder="Enter Role Title..."
        required
      />
    </div>
    <div class="">
      <input
        class="input"
        type="text"
        name="job-desc"
        id=""
        placeholder="Enter Job Description..."
        required
      />
    </div>
    <div class="">
      <input
        class="input"
        type="number"
        name="salary"
        id=""
        placeholder="Enter Role Salary..."
        required
      />
    </div>
    <input type="submit" class="long-btn" value="Add Role" />
  </form>
</div>`;
};
let mountEquipmentsComponent = () => {
  pane.innerHTML = `
  <div id="equipments-container">
    <h3 class="label">Equipments</h3>
    <div class="services-list">
      <div id="equipments">
        <h3>equipment 1</h3>
        <h3>equipment 2</h3>
        <h3>equipment 3</h3>
      </div>
      <button onclick="mountAddEquipmentComponent()" class="long-btn">
        Add New Equipment
      </button>
    </div>
  </div>`;
};
let mountAddEquipmentComponent = () => {
  pane.innerHTML = `<div id="add-equipment-container">
  <form action="" class="">
    <h3 class="label">Add New Equipment</h3>
    <div>
      <input
        class="input"
        type="text"
        name="euipment-name"
        id=""
        placeholder="Enter Equipment Name..."
        required
      />
    </div>
    <div>
      <input
        class="input"
        type="text"
        name="euipment-desc"
        id=""
        placeholder="Enter Equipment Description..."
        required
      />
    </div>
    <input type="submit" class="long-btn" value="Add Equipment" />
  </form>
</div>`;
};
let mountReportsComponent = () => {
  pane.innerHTML = `
  <div id="reports-container">
    <h3 class="label">Medical Reports</h3>
    <div id="equipments">
      <h3>Report 1</h3>
      <h3>Report 2</h3>
      <h3>Report 3</h3>
    </div>
  </div>`;
};
let mountSetAppointment = () => {
  pane.innerHTML = `<div id="appointment-container">
  <form action="">
    <h3 class="label">Make an Appointment</h3>
    <input
      class="input"
      placeholder="Select appointment date..."
      type="date"
      name="appointment-date"
      id=""
      required
    />
    <input
      class="input"
      placeholder="Select appointment time..."
      type="time"
      name="appointment-time"
      id=""
      required
    />
    <select required name="dentist" id="" class="input">
      <option></option>
      <option value="patient">Dentist 1</option>
    </select>
    <input type="submit" class="long-btn" value="Make Appointment" />
  </form>
</div>`;
};
let mountReviewsComponent = () => {
  pane.innerHTML;
};
let mountAddReviewComponent = () => {
  pane.innerHTML = `
  <div id="add-review-container">
    <form action="">
      <h3 class="label">Add a Review</h3>
      <textarea
        name="user-review"
        id="user-review"
        cols="30"
        rows="10"
        required
        placeholder="Enter Your Review..."
      ></textarea>
      <input type="submit" class="long-btn" value="Submit Review" />
    </form>
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
