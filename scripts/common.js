//header template is set based on the state of isLogin in local storage
if(localStorage.isLogin === "false" || localStorage.isLogin == null) {
    var headerTemplate = `
    <a href="index.html"><img src="assests/images/logo.png" alt="logo" id="logo" /></a>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-light btn-sm"
      data-bs-toggle="modal"
      data-bs-target="#loginModal"
      id="loginButton"
    >
      LOGIN
    </button>`
  }
  else {
    headerTemplate = `
    <a href="index.html"><img src="assests/images/logo.png" alt="logo" id="logo" /></a>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-light btn-sm"
      data-bs-target="#loginModal"
      id="loginButton"
    >
      LOGOUT
    </button>`
  }
  
  //common footer template for all pages
  let footerTemplate = `
  <a
    class="btn btn-info btn-sm"
    href="contact.html"
    role="button"
    id="contactLink"
    data-bs-toggle="modal"
    data-bs-target="#contactUsModal"
    >Contact Us</a
  >
  <div id="copyright"><span>&copy; 2022 ROOM SEARCH PVT.LTD</span></div>
  <div id="social">
    <a href="https://www.facebook.com" target="_blank"
      ><img src="./assests/images/facebook.png" class="socialMedia"
    /></a>
    <a href="https://www.instagram.com" target="_blank"
      ><img src="./assests/images/instagram.png" class="socialMedia"
    /></a>
    <a href="https://www.twitter.com" target="_blank"
      ><img src="./assests/images/twitter.png" class="socialMedia"
    /></a>
  </div>`
  
  //setting header and footer based on template
  document.getElementsByTagName("header")[0].innerHTML = headerTemplate;
  document.getElementsByTagName("footer")[0].innerHTML = footerTemplate;
  
  //adding login modal and contact us code to end of main div
  let refToMain = document.getElementById("Main");
  refToMain.innerHTML = refToMain.innerHTML + `
  <!-- Login Modal -->
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Please Login</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="loginModalClose"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row g-3 align-items-center justify-content-sm-around">
              <div class="col-auto">
                <label for="exampleUsername" class="form-label"
                  >Username:</label
                >
              </div>
              <div class="col-auto mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="loginUsername"
                  placeholder="Enter Username"
                  required
                />
              </div>
            </div>
            <div class="row g-3 align-items-center justify-content-sm-around">
              <div class="col-auto">
                <label for="exampleInputPassword1" class="form-label"
                  >Password:</label
                >
              </div>
              <div class="col-auto">
                <input
                  type="password"
                  class="form-control"
                  id="loginPassword"
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center">
          <button onclick="login()" type="button submit" class="btn btn-primary" id="loginModalBtn">Login</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Contact Us Modal -->
  <div
    class="modal fade"
    id="contactUsModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Get in touch</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Thank you for reaching out!!!</p>
          <p>Please enter your email and we will get back to you.</p>
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label for="inputEmail" class="col-form-label">Email:</label>
            </div>
            <div class="col-auto">
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Enter your email id"
                required
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>`
  
  //adding event listeners for login functionality
  document.querySelector("#loginModalBtn").addEventListener("click", function(){
    login();
  })
  
  document.querySelector("#loginButton").addEventListener("click", function(){
    if(localStorage.isLogin === "true"){
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.isLogin = false;
      document.querySelector("#loginButton").textContent="LOGIN";
      document.getElementById("loginButton").setAttribute("data-bs-toggle","modal");
      pay();
    }
  })
  
  function login(){
    if(localStorage.isLogin === "false" || localStorage.isLogin == null){
      var username = document.querySelector("#loginUsername").value;
      var password = document.querySelector("#loginPassword").value;
      if(username === "admin" && password === "admin"){
        document.querySelector("#loginButton").innerText="LOGOUT";
        localStorage.isLogin = true;
        localStorage.username = username;
        localStorage.password = password;
        alert("successfully LoggedIn");
        document.querySelector("#loginModalClose").click();
        document.querySelector("#loginButton").dataset.toggle = "modal";
        document.getElementById("loginButton").removeAttribute("data-bs-toggle");
        pay();
      }
      else {
        alert('Username/Password is incorrect. Please try again!')
      }
    }
  }