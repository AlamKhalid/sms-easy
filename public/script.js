$(document).ready(function () {
  // some necessary varraibles
  var flag;
  var flagMessage = "File not uploaded";
  var file, data;
  // as file input is hidden, so opening file input type as the user clicks the btn
  $("#uploadBtn").click(function () {
    $("#fileToUpload").click();
  });
  // function to run when a user uploads a fule
  $("#fileToUpload").change(function (event) {
    const input = event.target;

    if ("files" in input && input.files.length > 0) {
      file = document.getElementById("fileToUpload").files[0];
      $("#uploadBtn").html(file.name);
      if (
        file.size > 0 &&
        file.name.slice(file.name.indexOf(".") + 1) == "txt"
      ) {
        readFileContent(file)
          .then((content) => {
            data = content.replace(/\n/g, ";");
            $("#sendBtn").attr("href", `sms:${data}?body=`);
            $("#sendBtn").attr("href", `mailto:${data}?subject=`);
            flag = 1;
          })
          .catch((error) => {
            flag = 0;
            flagMessage = "An unknown error occured";
            showError(flagMessage);
          });
      } else if (file.size <= 0) {
        flag = 0;
        flagMessage = "File is empty";
        showError(flagMessage);
      } else {
        flag = 0;
        flagMessage =
          "Only text files are supported. Please use <em>.txt</em> extension";
        showError(flagMessage);
      }
    } else {
      flag = 0;
      flagMessage = "File is corrupted";
      showError(flagMessage);
    }
  });
  // real function for populating 'to' field
  $("#sendBtn").click(function () {
    var body = $("textarea").val();
    var format = $("input[type='radio'][name='format']:checked").val();
    var subject = $("#subject").val();

    if (flag) {
      if (format == "sms") {
        if (body.length > 0) {
          $(this).attr("href", `sms:${data}?body=${body}`);
          location.href = $(this).attr("href");
        } else showError("Message body is empty");
      } else if (format == "email") {
        if (body.length > 0 && subject.length > 0) {
          $(this).attr(
            "href",
            `mailto:${data}?subject=${subject}&body=${body}`
          );
          location.href = $(this).attr("href");
        } else if (subject.length <= 0) showError("Subject is empty");
        else showError("Message body is empty");
      }
    } else {
      showError(flagMessage);
    }
    return false;
  });

  // show email related options
  $("#emailBox").click(function () {
    $("#subject").removeClass("d-none");
    $("#noteForSMS").addClass("d-none");
  });
  //show sms related options
  $("#smsBox").click(function () {
    $("#subject").addClass("d-none");
    $("#noteForSMS").removeClass("d-none");
  });
  // show any potential errors
  function showError(message) {
    $(".alert").html(`${message}<i class="fa fa-close pull-right"></i>`);
    $(".alert").removeClass("d-none");
    $(".fa-close").click(() => {
      $(".alert").addClass("d-none");
    });
  }
  // reading the txt file
  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  // redirect to msg location
  $("#continue").click(function () {
    window.location = "/msg";
  });

  // validation function
  function validate(id, doFocus) {
    $(`#${id}`).css("borderColor", "#DC3545");
    $(`#${id}:focus`).css("borderColor", "#DC3545");
    $(`#${id}-icon`).css("background", "#DC3545");
    $(`#${id}-label`).removeClass("d-none");
    $(`#${id}-container`).addClass("mb-0");
    if (doFocus) $(`#${id}`).focus();
  }

  // function for normalization
  function noramlize(id) {
    $(`#${id}`).css("borderColor", "#343A40");
    $(`#${id}:focus`).css("borderColor", "#343A40");
    $(`#${id}-icon`).css("background", "#343A40");
    $(`#${id}-label`).addClass("d-none");
    $(`#${id}-container`).removeClass("mb-0");
  }

  // normalize css for input fields
  $(".input-field").on("keydown", function () {
    const id = $(this).attr("id");
    noramlize(id);
  });

  // special for confirm pass
  $("#r-cpass").on("keydown", function () {
    $("#r-cpass-label").text("* must provide a confirm password");
  });

  // special for username field - register
  $("#r-user").on("keydown", function () {
    $("#r-user-label").text("* must provide a username");
  });

  // special for username field - login
  $("#user").on("keydown", function () {
    $("#user-label").text("* must provide a username");
  });

  // functions to run on modal close
  $("#login").on("hidden.bs.modal", function () {
    noramlize("user");
    noramlize("pass");
    $("#user-label").text("* must provide a username");
    $("#pass-label").text("* must provide a password");
  });
  $("#register").on("hidden.bs.modal", function () {
    noramlize("r-user");
    noramlize("r-pass");
    noramlize("r-email");
    noramlize("r-cpass");
    $("#r-user-label").text("* must provide a username");
    $("#r-cpass-label").text("* must provide a confirm password");
    $("#r-email-label").text("* must provide an email");
  });

  // registering user
  $("#register-form").on("submit", function (event) {
    event.preventDefault();
    let doFocus = true;
    // check input fields
    if ($("#r-user").val().length === 0) {
      validate("r-user", doFocus);
      doFocus = false;
    } else if ($("#r-user").val().length > 20) {
      validate("r-user", doFocus);
      doFocus = false;
      $("#r-user-label").text("* username can be of max 20 characters");
    } else {
      $.get(
        `http://localhost:3500/get-user/${$("#r-user").val()}/`,
        (status) => {
          if (!status) {
            validate("r-user", true);
            $("#r-user-label").text("* username already taken");
            doFocus = false;
          }
        }
      );
    }
    if ($("#r-email").val().length === 0) {
      validate("r-email", doFocus);
      doFocus = false;
    }
    if ($("#r-pass").val().length === 0) {
      validate("r-pass", doFocus);
      doFocus = false;
    }
    if ($("#r-cpass").val().length === 0) {
      validate("r-cpass", doFocus);
      doFocus = false;
    } else if ($("#r-cpass").val() !== $("#r-pass").val()) {
      validate("r-cpass", doFocus);
      $(`#r-cpass-label`).text("* confirm password did not match");
      doFocus = false;
    }
    if (doFocus) $(this).submit();
  });

  // signing in user
  $("#login-form").on("submit", function (event) {
    event.preventDefault();
    let doFocus = true;
    // check input fields
    if ($("#user").val().length === 0) {
      validate("user", doFocus);
      doFocus = false;
    } else if ($("#user").val().length > 20) {
      validate("user", doFocus);
      doFocus = false;
      $("#user-label").text("* username can be of max 20 characters");
    } else {
      $.get(`http://localhost:3500/get-user/${$("#user").val()}/`, (status) => {
        if (status) {
          validate("user", true);
          $("#user-label").text("* username does not exist");
          doFocus = false;
        }
      });
    }
    if ($("#pass").val().length === 0) {
      validate("pass", doFocus);
      doFocus = false;
    } else if (doFocus) {
      $.get(
        `http://localhost:3500/get-user/${$("#user").val()}/${$(
          "#pass"
        ).val()}/`,
        (status) => {
          if (!status) {
            validate("pass", true);
            $("#pass-label").text("* password is incorrect");
            doFocus = false;
          } else $(this).submit();
        }
      );
    }
  });
});
