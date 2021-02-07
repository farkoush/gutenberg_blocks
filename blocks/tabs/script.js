document.addEventListener("DOMContentLoaded", function(event) { 
  var tabLinks = document.getElementsByClassName("kt-title-item");
  var tabContents = document.getElementsByClassName("wp-block-kadence-tab");
  // console.log(tabLinks);
  // console.log(tabContents)
  if (tabLinks.length > 0){
      console.log('hoora-tabbbb');
      Array.prototype.forEach.call(tabLinks, function(tabLink) {
            tabLink.addEventListener('click', event => {
              event.preventDefault();
              console.log('event.target');
              console.log(event.target);
              const tab_id= event.target.getAttribute('data-tab');
              // tabLink.classList.remove("current")
              Array.prototype.forEach.call(tabLinks, function(tabLink) {
                tabLink.classList.remove("current")
              })
              Array.prototype.forEach.call(tabContents, function(tabContent) {
                  tabContent.classList.remove("current")
              })
              event.target.classList.add('current');
              document.getElementById(tab_id).classList.add('current')
          })
      });
    }
  });
  