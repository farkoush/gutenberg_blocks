  console.log("ffsadfasfsdfsdfsd");
  ready(() => {
          console.log( 'hooray!' );
          var acc = document.getElementsByClassName("accordion");
          var i;
          console.log("acccccccccccccccTTTTTpp    ", acc);
          for (i = 0; i < acc.length; i++) {
            console.log(acc[1]);
            acc[i].addEventListener("click", function() {
              console.log('active');
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
              } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            });
          }

});


function ready(fn) {
  if (
      document.attachEvent
          ? document.readyState === "complete"
          : document.readyState !== "loading"
  ) {
      fn();
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}