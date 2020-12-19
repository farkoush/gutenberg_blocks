document.addEventListener("DOMContentLoaded", function(event) { 
    console.log('hoora-tab');
    var tabLinks = document.getElementsByClassName("tab-link");
    var tabContents = document.getElementsByClassName("tab-content");
    if (tabLinks.length > 0){
      Array.prototype.forEach.call(tabLinks, function(tabLink) {
            tabLink.addEventListener('click', event => {
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
