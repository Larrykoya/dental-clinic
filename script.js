let pane = document.getElementById("content");
let results = [];

let mountLoginComponent = () => {
  pane.innerHTML = `
  <div id="login-container">
        <form action="" class="login-form" onsubmit="login(event)" >
        <h3 class="label">Login</h3>
          <div class="">
            <input
              class="input"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="">
            <input
              class="input"
              type="password"
              name="password"
              required
              placeholder="Enter your password"
            />
          </div>
          
      <select required name="user-type" class="input selection">
      <option>
      </option>
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
          <input type="submit" class="long-btn" value="Login" />
          <p id="forgot-pass">Forgot Password?</p>
          <h3 class="error">Incorrect credentials</h3>
        </form>
      </div>
  `;
};
const mountSignupComponent = () => {
  pane.innerHTML = `<div id="signup-container">
  <form action="" class="signup-form"  onsubmit="signup(event)">
      <h3 class="label">Create an account</h3>
      <input class="input" placeholder="Enter Your Firstname..." type="text" name="fname" id="" >

      <input class="input" placeholder="Enter Your Lastname..." type="text" name="lname" id="" >
      
      <input class="input" placeholder="Enter Your Email..." type="email" name="email" id="" >

      <input class="input" placeholder="Enter Your Phone Number..." type="text" name="phone" id="" >
    
      <input class="input" placeholder="Create a Password" type="password" name="password" id="" >
      <div style="justify-content: space-between" class="flex">
        <h5>Select Gender:</h5>
        <div class="radio-option">
          <input type="radio" name="gender" id="male" value="male"  />
          <label for="gender">Male</label>
          <input type="radio" name="gender" id="female" value="female"  />
          <label for="gender">Female</label>
          </div>
      </div>
      <select required name="user-type" id="" class="input selection">
          <option>
          </option>
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
  <h2 class="label">Find Patient</h2>
  <form action="" method="" onsubmit="postSearch(event)">
  <input
  type="text"
  class="input"
  placeholder="Enter email, firstname or lastname of the patient..."
  required
/>
<button type="submit" class="long-btn">Search</button>
  </form>
</div>`;
};
function postSearch(event) {
  event.preventDefault();
  let searchKey = event.target[0].value.toLowerCase();
  fetch("search.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchKey,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `<span>
        <div class="scroll-item" id="${result.patient_id}">
        <h3>${result.firstname}</h3>
        <h3>${result.lastname}</h3>
        <p>${result.gender}</p>
        <p>${result.email}</p>
        <p>${result.phone}</p>
        <input id="${result.patient_id}" onclick="createMedicalReport(event)" type="button" class="btn" value="create Report"/>
        </div>
        </span>  `;
      });
      if (content.length < 1) {
        content = `<div class="scroll-item">
        <h3>Sorry, No matching results.</h3>
        </div>`;
      }
      pane.innerHTML = `
      <div id="search-container">
  <h2 class="label">Find Patient</h2>
  <form action="" method="" onsubmit="postSearch(event)">
  <input
  type="text"
  class="input"
  placeholder="Enter email, firstname or lastname of the patient..."
  required
/>
<button type="submit" class="long-btn">Search</button>
  </form>
</div>
      <div  style="top:47%; left:32%" class="scroll-container" >
            <h2 class="label">Search result:</h2>
              <div  class="scroll-items" >
                   ${content} 
              </div>
              
      </div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `
      <div id="search-container">
  <h2 class="label">Find Patient</h2>
  <form action="" method="" onsubmit="postSearch(event)">
  <input
  type="text"
  class="input"
  placeholder="Enter email, firstname or lastname of the patient..."
  required
/>
<button type="submit" class="long-btn">Search</button>
  </form>
</div>
  <div style="top:47%; left:32%" class="scroll-container">
        <h2 class="label">Search result:</h2>
          <div  class="scroll-items" >
          <span>
          <div class="scroll-item">
          <h3>Sorry, No matching results.</h3>
          </div>
          </span>         
          </div>
          
  </div>`;
    });
}
let mountServicesComponent = () => {
  fetch("service.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `<span>
        <div class="scroll-item">
        <h3>${result.service_name}</h3>
        <div>$${result.fee}</div>
        <div>${result.description}</div>
        <input id="${result.service_id}" type="button" class="btn" value="Book Now"/>
        </div>
        </span>  `;
      });
      pane.innerHTML = `
      <div  class="scroll-container" >
            <h2 class="label">Our Services:</h2>
              <div  class="scroll-items" >
                   ${content.join("")} 
              </div>
              
      </div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `
  <div  class="scroll-container">
        <h2 class="label">Our Services:</h2>
          <div id="services"  class="scroll-items" >
          <span>
          <div class="scroll-item">
          <h3>Sorry, Unable to display services. Kindly contact support.</h3>
          </div>
          </span>         
          </div>
          
  </div>`;
    });
};
let mountAddServiceComponent = () => {
  pane.innerHTML = `<div id="add-service-container">
  <form action="" class="" onsubmit="createService(event)">
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
      rows="5"
      required
      class="textarea"
      placeholder="Enter Service Description..."
    ></textarea>
      <input
        class="input"
        type="number"
        name="service-fee"
        id=""
        required
        placeholder="Enter Service Fee..."
      />
    <input type="submit" class="long-btn" value="Add Service" />
  </form>
</div>`;
};
let mountBranchComponent = () => {
  fetch("branch.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `<span>
        <div id="${result.branch_id}" class="scroll-item">
        <h3>${result.branch_name}</h3>
        <p>Address: </p>
        <p>${result.address}</p>
        </div>
        </span>  `;
      });
      pane.innerHTML = `
      <div  class="scroll-container" >
            <h2 class="label">Our Branches:</h2>
              <div  class="scroll-items" >
                   ${content.join("")} 
              </div>
      </div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `
      <div  class="scroll-container" >
            <h2 class="label">Our Branches:</h2>
              <div  class="scroll-items" >
              <p>Unable to display, please retry later</p>
              </div>
      </div>`;
    });
};
let mountAddBranchComponent = () => {
  pane.innerHTML = `<div id="add-branch-container">
  <form action="" class="" onsubmit="createBranch(event)">
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
  <form action="" class="" onsubmit="">
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
  <form action="" class="" onsubmit="createRole(event)">
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
  <form action="" class="" onsubmit="">
    <h3 class="label">Add New Equipment</h3>
    <div>
      <input
        class="input"
        type="text"
        name="equipment-name"
        id=""
        placeholder="Enter Equipment Name..."
        required
      />
    </div>
    <div>
      <input
        class="input"
        type="text"
        name="equipment-desc"
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
      <h3>User 1</h3>
      <p>report content</p>
      <h3>User 2</h3>
      <p>report content</p>
    </div>
  </div>`;
};
function createMedicalReport(event) {
  pane.innerHTML = `
  <div id="create-report-container">
    <form action=""  id="${event.target.id}" class="" onsubmit="postReport(event)">
      <h3 class="label">Create Medical Report</h3>
      <textarea
        name="medical-report"
        id="medical-report"
        cols="30"
        rows="10"
        class="textarea"
        required
        placeholder="Enter Medical Report..."
      ></textarea>
      <input type="submit" class="long-btn" value="Submit Report" />
    </form>
  </div>`;
}
let mountAppointmentComponent = () => {
  pane.innerHTML = `<div class="scroll-container">
  <h2 class="label">Appointments</h2>
  <div id="appointments" class="scroll-items">
    <span>
      <div class="scroll-item">
        <h3>Patient Name</h3>
        <h4>Dr name</h4>
        <p>Date</p>
        <p>Time</p>
        <input type="button" class="btn" value="Cancel" />
      </div>
    </span>
    <span>
      <div class="scroll-item">
        <h3>Patient Name</h3>
        <h4>Dr name</h4>
        <p>Date</p>
        <p>Time</p>
        <input type="button" class="btn" value="Cancel" />
      </div>
    </span>
    <span>
      <div class="scroll-item">
        <h3>Patient Name</h3>
        <h4>Dr name</h4>
        <p>Date</p>
        <p>Time</p>
        <input type="button" class="btn" value="Cancel" />
      </div>
    </span>
  </div>
  <input
    type="submit"
    onclick="mountSetAppointment()"
    class="long-btn"
    value="Create New Appointment"
  />
</div>`;
};
let mountSetAppointment = () => {
  pane.innerHTML = `<div id="create-appointment-container">
  <form action="" onsubmit="">
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
      <option value="dentist1">Dentist 1</option>
    </select>
    <select required name="patient" id="" class="input">
      <option></option>
      <option value="patient">patient 1</option>
    </select>
    <input type="submit" class="long-btn" value="Make Appointment" />
  </form>
</div>`;
};
let mountReviewsComponent = () => {
  fetch("review.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `
        <div id="${result.review_id}">
      <h3>${result.username}</h3>
      <p>${result.content}</p>
    </div>`;
      });
      pane.innerHTML = `<div id="reviews-container">
      <div style="justify-content: space-between" class="flex">
        <h3 class="label">User Reviews</h3>
        <button onclick="mountAddReviewComponent()" class="btn review-btn">
          Add Review
        </button>
      </div>
      <div id="reviews">
      ${content.join("")}
      </div>
    </div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `<div id="reviews-container">
      <div style="justify-content: space-between" class="flex">
        <h3 class="label">User Reviews</h3>
        <button onclick="mountAddReviewComponent()" class="btn review-btn">
          Add Review
        </button>
      </div>
      <div id="reviews">
          <h3>No reviews yet...</h3>
      </div>
    </div>`;
    });
};
let mountAddReviewComponent = () => {
  pane.innerHTML = `
  <div id="add-review-container">
    <form action="" onsubmit="createReview(event)">
      <h3 class="label">Add a Review</h3>
      <input
        class="input"
        type="text"
        name="username"
        id=""
        placeholder="Enter Your Name..."
      />
      <textarea
        name="user-review"
        id="user-review"
        cols="30"
        rows="5"
        required
        class="textarea"
        placeholder="Enter Your Review..."
      ></textarea>
      <input type="submit" class="long-btn" value="Submit Review" />
    </form>
  </div>`;
};
let mountPaymentComponent = () => {
  pane.innerHTML = `
  
  <div id="make-payment-container">
  <form action="" class="" onsubmit="">
    <h3 class="label">Payment Information:</h3>

    <input
      class="input"
      type="text"
      name="description"
      id=""
      placeholder="Payment For"
      required
    />
    <input
      class="input"
      type="number"
      name="amount"
      id=""
      placeholder="Payment Amount"
      required
    />
    <div style="justify-content: space-between" class="flex">
      <h5>Select Payment Method:</h5>
      <div class="radio-option">
        <input
          type="radio"
          name="Payment-method"
          id="cash"
          value="cash"
          required
        />
        <label for="Payment-method">Cash</label>
        <input
          type="radio"
          name="Payment-method"
          id="card"
          value="card"
          required
        />
        <label for="Payment-method">Card</label>
      </div>
    </div>

    <input type="submit" class="long-btn" value="Make Payment" />
  </form>
</div>`;
};
let mountAnnouncementComponent = () => {
  pane.innerHTML = `
  <div id="announcements-container">
  <h3 class="label">Announcements</h3>
  <div id="announcements">
    <div class="announcement">
      <h3>Title</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
        luctus nulla.
      </p>
    </div>
  </div>
</div>
  `;
};
let mountCreateAnnouncement = () => {
  pane.innerHTML = `
  <div id="announcements-container">
    <form action="" class="" onsubmit="postAnnouncement(event)">
      <h2 class="label">Create New Announcement</h2>

      <input
        class="input"
        type="text"
        name="title"
        id=""
        placeholder="Add Title..."
        required
      />
      <textarea
        name="announcement"
        id="announcement"
        cols="30"
        rows="5"
        class="textarea"
        required
        placeholder="Enter Announcement..."
      ></textarea>
      <input type="submit" class="long-btn" value="Post Announcement" />
    </form>
  </div>`;
};
let mountScheduleVisitComponent = () => {
  pane.innerHTML = `<div id="schedule-visit-container">
  <form action="">
    <h3 class="label">Schedule a Visit</h3>
    <input
      class="input"
      type="text"
      name="patient-name"
      id=""
      placeholder="Enter Patient Name..."
      required
    />
    <input class="input" type="date" name="visit-date" id="" required />
    <input class="input" type="time" name="visit-time" id="" required />
    <input type="submit" class="long-btn" value="Schedule Visit" />
  </form>
</div>`;
};
let mountBookings = () => {
  pane.innerHTML = `<div class="scroll-container">
  <h2 class="label">Bookings</h2>
  <div id="bookings" class="scroll-items">
    <span>
      <div class="scroll-item">
        <h3>Patient Name</h3>
        <p>Service Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        <p>date</p>
        <button onclick="mountSetAppointment()" class="btn">
          Prepare Appointment
        </button>
      </div>
    </span>
    <span>
      <div class="scroll-item">
        <h3>Patient Name</h3>
        <p>Service Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        <p>date</p>
        <button onclick="mountSetAppointment()" class="btn">
          Prepare Appointment
        </button>
      </div>
    </span>
    <span>
      <div class="scroll-item">
        <h3>Patient Name</h3>
        <p>Service Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        <p>date</p>
        <button onclick="mountSetAppointment()" class="btn">
          Prepare Appointment
        </button>
      </div>
    </span>
  </div>
</div>`;
};
// setCookie("name", "alice", 0.0625);

// let setCookie = (name, value, daysToExpire) => {
//   const date = new Date();
//   date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
//   const expires = "expires=" + date.toUTCString();
//   document.cookie = name + "=" + value + ";" + expires + ";path=/";
// };
// console.log(getCookie("name"));
// let getCookie = (name) => {
//   const cookieName = name + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const cookieArray = decodedCookie.split(";");

//   for (let i = 0; i < cookieArray.length; i++) {
//     let cookie = cookieArray[i];
//     while (cookie.charAt(0) === " ") {
//       cookie = cookie.substring(1);
//     }
//     if (cookie.indexOf(cookieName) === 0) {
//       return cookie.substring(cookieName.length, cookie.length);
//     }
//   }
//   return "";
// };
