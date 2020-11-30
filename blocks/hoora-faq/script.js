  // window._wpLoadBlockEditor.then( function() {
    if (document.getElementById("accordion")){
      console.log('mainnnn.js');
  
  }
  ready(() => {
      // window._wpLoadBlockEditor.then( function() {
          console.log( 'hooray!' );
          // this.onScriptLoad();
          var acc = document.getElementsByClassName("accordion");
          var i;
          console.log("acccccccccccccccTTTTTpp    ", acc);
          // acc.addEventListener('load', e => {
          // var arr = acc.prototype.slice.call( htmlCollection )
          // var arr = [].slice.call(acc);
          var arry = Array.from(acc)
          var arr = Array.from(acc)

          // var arr = [...acc];

          console.log('arrrrrrrrrrrr' + arry + arr);
          // acc.forEach(element => {
          //   console.log(element);
          // });
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
      // });
  // });
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