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
        <h3>${result.firstname} ${result.lastname}</h3>
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
        <input id="${result.service_id}" type="button" onclick="makeBooking(event)" class="btn" value="Book Now"/>
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
  fetch("department.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `
        <div>
        <h3>${result.department_name}</h3>
      </div>
        `;
      });
      pane.innerHTML = `<div id="departments-container">
  <h3 class="label">Departments</h3>
  <div>
    ${content}
    <button onclick="mountAddDeptComponent()" class="long-btn">
      Add New Department
    </button>
  </div>
</div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `<div id="departments-container">
      <h3 class="label">Departments</h3>
      <div>
      <h3>Sorry, Unable to display departments.</h3>
        <button onclick="mountAddDeptComponent()" class="long-btn">
          Add New Department
        </button>
      </div>
    </div>`;
    });
};
let mountAddDeptComponent = () => {
  pane.innerHTML = `<div id="add-department-container">
  <form action="" class="" onsubmit="createDepartment(event)">
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
  fetch("equipment.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `
        <div>
        <h3>${result.name}</h3>
        <b>Description:</b>
        <p>${result.description}</p>
      </div>
        `;
      });
      pane.innerHTML = `
  <div id="equipments-container">
    <h3 class="label">Equipments: </h3>
    <div >
      ${content}
      <button onclick="mountAddEquipmentComponent()" class="long-btn">
        Add New Equipment
      </button>
    </div>
  </div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `
  <div id="equipments-container">
    <h3 class="label">Equipments: </h3>
    <div >
    <h3>Sorry, Unable to display equipments.</h3>
      <button onclick="mountAddEquipmentComponent()" class="long-btn">
        Add New Equipment
      </button>
    </div>
  </div>`;
    });
};
let mountAddEquipmentComponent = () => {
  pane.innerHTML = `<div id="add-equipment-container">
  <form action="" class="" onsubmit="createEquipment(event)">
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
  fetch("report.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `
        <div>
        <h3>${result.pfname} ${result.plname}</h3>
        <p>${result.message}</p>
        <hr>
        <small>Report by</small>
        <h4>Dr ${result.efname} ${result.elname}</h4>
        <small>${result.date}</small>
      </div>
        `;
      });
      pane.innerHTML = `
  <div id="reports-container">
    <h3 class="label">Medical Reports</h3>
    <div id="equipments">
      ${content.join("")}
    </div>
  </div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `
      <div id="reports-container">
        <h3 class="label">Medical Reports</h3>
        <div id="equipments">
        <h3>Sorry, Unable to load medical reports at the moment.</h3>
        </div>
      </div>`;
    });
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
  fetch("appointment.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `
        <span>
      <div class="scroll-item">
        <h3>${result.pfname} ${result.plname}</h3>
        <h4>Dr ${result.efname} ${result.elname}</h4>
        <p>${result.date}</p>
        <p>${result.time}</p>
        <div class="flex">
        <button onclick="cancelAppointment(event)" id="${result.id}" class="btn">Cancel</button>
        <button onclick="recordTreatment(event)" id="${result.id}" class="btn">Treatment complete</button>
        </div>
      </div>
    </span>
        `;
      });
      pane.innerHTML = `<div class="scroll-container">
  <h2 class="label">Appointments</h2>
  <div id="appointments" class="scroll-items">
    ${content}
  </div>
</div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `<div class="scroll-container">
  <h2 class="label">Appointments</h2>
  <div id="appointments" class="scroll-items">
  <h3>Sorry, Unable to display appointments.</h3>
  </div>
</div>`;
    });
};
function mountSetAppointment(event) {
  let booking_data = [];
  let dentist_data = [];
  let booking_id = event.target.id;
  let service_id = null;
  fetch("booking.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      booking_id,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      booking_data = data[0];
      service_id = booking_data.service_id;
      fetch("search.php", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          results = data;
          dentist_data = results.map((result) => {
            return `
            <option value="${result.employee_id}">Dr. ${result.firstname} ${result.lastname}</option>
            `;
          });
          pane.innerHTML = `<div id="create-appointment-container">
        <form action="" id="${service_id}" onsubmit="setAppointment(event)">
          <h3 class="label">Make an Appointment</h3>
          <label class="update-label" for="">Set Date</label>
          <input
            class="input"
            type="date"
            style="margin: 0"
            name="appointment-date"
            id=""
            required
          />
          <label class="update-label" for="">Set Time</label>
          <input
            class="input"
            type="time"
            style="margin: 0"
            name="appointment-time"
            id=""
            required
          />
          <label class="update-label" for="">Select Dentist</label>
          <select required name="dentist" style="margin: 0" class="input">
            <option></option>
            ${dentist_data}
          </select>
          <label class="update-label" for="">Patient</label>
          <select required name="patient" style="margin: 0" class="input">
            <option value="${booking_data.patient_id}">${booking_data.firstname} ${booking_data.lastname}</option>
          </select>
          <input type="submit" class="long-btn" value="Make Appointment" />
        </form>
      </div>`;
        });
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });
}
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
  <form action="" class="" onsubmit="createPayment(event)">
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
  fetch("announcement.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `<div class="announcement">
        <h2>${result.title}</h2>
        <p>
        ${result.message}
        </p>
        <small>${result.date}</small>
      </div>`;
      });
      pane.innerHTML = `
      <div id="announcements-container">
      <h3 class="label">Announcements</h3>
      <div id="announcements">
        ${content.join("")}
      </div>
    </div>
      `;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `
  <div id="announcements-container">
  <h3 class="label">Announcements</h3>
  <div id="announcements">
  <h3>Sorry, Unable to display announcements.</h3>
  </div>
</div>`;
    });
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
  fetch("search.php", {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      patient_list = results.map((result) => {
        return `
        <option value="${result.patient_id}"> ${result.firstname} ${result.lastname}</option>
        `;
      });
      pane.innerHTML = `<div id="schedule-visit-container">
  <form action="" onsubmit="scheduleVisit(event)">
    <h3 class="label">Schedule a Visit</h3>
    <label class="update-label" for="">Select Patient</label>
      <select required name="dentist" style="margin: 0" class="input">
        <option></option>
        ${patient_list}
      </select>
      <label class="update-label" for="">Set Date</label>
      <input
        class="input"
        type="date"
        style="margin: 0"
        name="visit-date"
        id=""
        required
      />
      <label class="update-label" for="">Set Time</label>
      <input
        class="input"
        type="time"
        style="margin: 0"
        name="visit-time"
        id=""
        required
      />
    <input type="submit" class="long-btn" value="Schedule Visit" />
  </form>
</div>`;
    })
    .catch((err) => {
      console.log(err);
    });
};
let mountBookings = () => {
  fetch("booking.php", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
      let content = results.map((result) => {
        return `
        <span>
      <div class="scroll-item">
        <h3>${result.email}</h3>
        <p>${result.service_name}</p>
        <small>${result.date}</small>
        <button id="${result.booking_id}" onclick="mountSetAppointment(event)" class="btn">
          Prepare Appointment
        </button>
      </div>
    </span>
        `;
      });
      pane.innerHTML = `<div class="scroll-container">
  <h2 class="label">Bookings</h2>
  <div id="bookings" class="scroll-items">
    ${content.join("")}
  </div>
</div>`;
    })
    .catch((err) => {
      console.log(err);

      pane.innerHTML = `<div class="scroll-container">
      <h2 class="label">Bookings</h2>
      <div id="bookings" class="scroll-items">
      <h3>Sorry, Unable to display bookings.</h3>
      </div>
    </div>`;
    });
};
