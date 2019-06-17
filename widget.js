(function() {

  document.addEventListener("DOMContentLoaded",function() {
    main() ;
  }) ;

function load(src, callback) {
  var script = document.createElement("script") ;
  script.setAttribute("type","text/javascript")
  script.onload = function() {
    callback();
  } ;
  script.setAttribute("src",src);
  document.getElementsByTagName("head")[0].appendChild(script);
}




function main() {

  var head = document.getElementsByTagName("head")[0] ;

  var widget = document.createElement("link") ;
  var fa = document.createElement("link") ;
  var font = document.createElement("link") ;

  widget.setAttribute("rel","stylesheet") ;
  widget.setAttribute("href","styles/widget.css") ;

  font.setAttribute("rel","stylesheet") ;
  font.setAttribute("href","https://fonts.googleapis.com/css?family=Montserrat:300,400,600&display=swap") ;

  fa.setAttribute("rel","stylesheet") ;
  fa.setAttribute("href","https://use.fontawesome.com/releases/v5.5.0/css/all.css") ;
  fa.setAttribute("integrity","sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU") ;
  fa.setAttribute("crossorigin","anonymous") ;

  head.appendChild(fa) ;
  head.appendChild(widget) ;
  head.appendChild(font) ;

  var widgetMarkup =
                "<div class='widgetContainer'>" +
                  "<div class='widget'><i class='far fa-envelope'></i></div>" +
                  "<div class='desc'>Click here to subscribe to our mailaing list!</div>"+
                "</div>" +
                "<div class='formContainer invisible'>" +
                  "<h3>Subscribe to our emails today!</h3>" +
                  "<div class='close emailingListTogglers'><i class='fas fa-times'></i></div>" +
                  "<form id='addEmailForm'>" +
                    "<input class='email' type='email' name='email' required placeholder='Enter Email Address'>" +
                    "<input class='name' type='text' name='name' required placeholder='Name'>" +
                    "<input class='number' type='text' name='number' required placeholder='Number'>" +
                    "<button>Submit</button>" +
                  "</form>" +
                "</div>" ;

  document.getElementsByTagName("body")[0].innerHTML = widgetMarkup ;

  load("https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js", function() {
    load("https://www.gstatic.com/firebasejs/6.2.0/firebase-firestore.js", function() {
        var firebaseConfig = {
          apiKey: "API_KEY",
          authDomain: "AUTH_DOMAIN",
          databaseURL: "DATABASE_URL",
          projectId: "PROJECT_ID",
          storageBucket: "STORAGEBUCKET",
          messagingSenderId: "MESSAGINGSENDERID",
          appId: "APPID"
        };

        firebase.initializeApp(firebaseConfig);

        var db = firebase.firestore() ;


        var form = document.querySelector("body > .formContainer > #addEmailForm") ;

        var widget = document.querySelector("body > .widgetContainer > .widget") ;
        var desc = document.querySelector("body > .widgetContainer > .desc") ;
        var closeButton = document.querySelector("body > .formContainer > .close") ;
        var formContainer = document.querySelector("body > .formContainer") ;
        var submitButton = document.querySelector("body > .formContainer > form > button") ;




        widget.addEventListener("mouseenter",function() {
          desc.style.transform = "translateX(0px)" ;
          desc.style.opacity = "1" ;
        }) ;

        widget.addEventListener("mouseleave",function() {
          desc.style.transform = "translateX(-15px)" ;
          desc.style.opacity = "0" ;
        }) ;

        closeButton.addEventListener("click",function() {
          formContainer.classList.toggle("visible") ;
        }) ;

        widget.addEventListener("click",function() {
          formContainer.classList.remove("success") ;
          submitButton.classList.remove("success") ;
          formContainer.classList.remove("failure") ;
          submitButton.classList.remove("failure") ;
          submitButton.innerHTML = "Submit" ;
          submitButton.disabled = false ;


          formContainer.classList.toggle("visible") ;
        });

        form.addEventListener("submit",function(event) {
          event.preventDefault() ;
          db.collection("emailing list").add({
            name:form.name.value,
            number:form.number.value,
            email:form.email.value,
          })
          .then(function() {
            formContainer.classList.toggle("success") ;
            submitButton.classList.toggle("success") ;
            submitButton.innerHTML = "Successfully added" ;
            submitButton.disabled = true ;
            form.name.value = '' ;
            form.number.value = '' ;
            form.email.value = '' ;
            window.setTimeout(function() {
              formContainer.classList.toggle("visible") ;
            },2000) ;
          })
          .catch(function(error) {
            console.log(error) ;
            formContainer.classList.toggle("failure") ;
            submitButton.classList.toggle("failure") ;
            submitButton.innerHTML = "There was an error. Try again later" ;
            form.name.value = '' ;
            form.number.value = '' ;
            form.email.value = '' ;
            submitButton.disabled = true ;
            window.setTimeout(function() {
              formContainer.classList.toggle("visible") ;
            },2000) ;
          })
        }) ;
    })
  }) ;
}

})();
