


$("#go").click(function () {
    go(50);
  });
  $("#ok").click(function () {
    go(500);
  });
  
  setTimeout(function () {
    go(50);
  }, 700);
  setTimeout(function () {
    go(500);
  }, 2000);
  
  function go(nr) {
    $(".bb").fadeToggle(200);
    $(".message").toggleClass("comein");
    $(".check").toggleClass("scaledown");
    $("#go").fadeToggle(nr);
  }