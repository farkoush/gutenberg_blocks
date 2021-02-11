console.log('tabssss')
// document.addEventListener("DOMContentLoaded", function(event) { 
//   var tabLinks = document.getElementsByClassName("kt-title-item");
//   var tabContents = document.getElementsByClassName("wp-block-hoora-tab");
//   if (tabLinks.length > 0){
//       console.log('hoora-tabbbb');
//       Array.prototype.forEach.call(tabLinks, function(tabLink) {
//             tabLink.addEventListener('click', event => {
//               event.preventDefault();
//               console.log('event.target');
//               console.log(event.target);
//               const tab_id= event.target.getAttribute('data-tab');
//               // tabLink.classList.remove("current")
//               Array.prototype.forEach.call(tabLinks, function(tabLink) {
//                 tabLink.classList.remove("current")
//               })
//               Array.prototype.forEach.call(tabContents, function(tabContent) {
//                   tabContent.classList.remove("current")
//               })
//               event.target.classList.add('current');
//               document.getElementById(tab_id).classList.add('current')
//           })
//       });
//     }
//   });

  // jQuery( document ).ready( function( $ ) {
  //   $( '.hoora-tabs-wrap' ).each( function( a ) {
  //       $( this ).find( '> .hoora-tabs-content-wrap > .hoora-tab-inner-content' ).attr( {
  //         role: 'tabpanel',
  //         'aria-hidden': 'true',
  //       } );
  //   } );

  //   $( '.hoora-tabs-title-list li a' ).click( function( e ) {
  //       e.preventDefault();
  //       var tabId = $( this ).attr( 'data-tab' );
    
  //       $( this ).closest( '.hoora-tabs-title-list' ).find( '.hoora-tab-title-active' )
  //       .addClass( 'hoora-tab-title-inactive' )
  //       .removeClass( 'hoora-tab-title-active' )
  //       .find( 'a.hoora-tab-title' ).attr( {
  //         tabindex: '-1',
  //         'aria-selected': 'false',
  //       } );

  //       $( this ).closest( '.hoora-tabs-wrap' ).removeClass( function( index, className ) {
  //           return ( className.match( /\bhoora-active-tab-\S+/g ) || [] ).join( ' ' );
  //       } ).addClass( 'hoora-active-tab-' + tabId );
  //       $( this ).parent( 'li' ).addClass( 'hoora-tab-title-active' ).removeClass( 'hoora-tab-title-inactive' );

  //   } );
  // } );

  document.addEventListener("DOMContentLoaded", function(event) { 
    console.log('tabssss')

    var hooraTabsWraps = document.querySelectorAll('.kt-tabs-wrap');
      [].forEach.call(hooraTabsWraps, function(el, _) {
          var parallaxElement = el.querySelectorAll('.kt-tab-inner-content');
          //                change here  -------^--------
          [].forEach.call(parallaxElement, function(el1, _) {
            el1.setAttribute("role", "tabpanel");
            el1.setAttribute("aria-hidden", "true");
          });
      });

      var divs = document.querySelectorAll('.kt-tabs-title-list li a');
      [].forEach.call(divs, (div) => {
        div.addEventListener('click', (e, h) => {
          var element = (e.target).closest(".kt-tab-title")
          e.preventDefault();
          var tabId = element.getAttribute('data-tab');
          // console.log(element.closest('.kt-tabs-title-list').querySelector('.kt-tab-title-active'));
          var b = element.closest('.kt-tabs-title-list').querySelector('.kt-tab-title-active');
            b.classList.add('kt-tab-title-inactive');
            b.classList.remove('kt-tab-title-active');
            b.querySelector('a.kt-tab-title').setAttribute('tabindex', '-1');
            b.querySelector('a.kt-tab-title').setAttribute('aria-selected', 'false');
            element.closest('.kt-title-item').classList.add('kt-tab-title-active')
            var q = element.closest('.kt-tabs-wrap');            
            q.classList.remove(q.classList.toString().match( /\bkt-active-tab-\S+/g ));

            q.classList.add('kt-active-tab-' + tabId);
        });
        // element.parentElement.classList.add('hoora-tab-title-active');
        // element.parentElement.classList.remove('hoora-tab-title-inactive');
      });

  });
