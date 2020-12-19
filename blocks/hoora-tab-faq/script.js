// function openCity(evt, cityName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " active";
//   }
  
//   // Get the element with id="defaultOpen" and click on it
//   document.getElementById("defaultOpen").click();


document.addEventListener("DOMContentLoaded", function(event) { 
    var tabLinks = document.getElementsByClassName("tab-link");
    var tabContents = document.getElementsByClassName("tab-content");
    if (tabLinks.length > 0){
      console.log('ll'+ tabLinks)
      Array.prototype.forEach.call(tabLinks, function(tabLink) {
          console.log('tabLink' + tabLink)
          // Do stuff here
            tabLink.addEventListener('click', event => {
                  const tab_id= event.target.getAttribute('data-tab');
                  console.log('tab_id' + tab_id)

                  tabLink.classList.remove("current")
                  Array.prototype.forEach.call(tabContents, function(tabContent) {
                      tabContent.classList.remove("current")
                  })

                  event.target.classList.add
          })


      });


    }
  //do work
});


// $(document).ready(function(){
	
// 	$('ul.tabs li').click(function(){
// 		var tab_id = $(this).attr('data-tab');

// 		$('ul.tabs li').removeClass('current');
// 		$('.tab-content').removeClass('current');

// 		$(this).addClass('current');
// 		$("#"+tab_id).addClass('current');
// 	})

// })