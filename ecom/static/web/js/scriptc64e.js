;(function($){
  'use strict';
      // Slider
      var $slider = $('#slider');
      if ($slider.length > 0 ) {
        $slider.carousel({ interval:6000, pause: 'null' });
      }

      // Quote Carousel
      var $carousel = $('#carousel');
      if ($carousel.length > 0 ) {
        $carousel.carousel({ interval:4000, pause: 'hover' });
      }
      
      // Logo Carousel
      var $logo_carousel = $('.logo-carousel');
      if ($logo_carousel.length > 0 ) {
          $logo_carousel.owlCarousel({
            items: 3, loop: true, margin: 6, responsive:{ 600:{ items:4 }, 1000:{ items:6 } }
        });
      }

      // Parallax
      var $parallax = $('.has-parallax');
      if ($parallax.length > 0 ) {
        $parallax.parallaxie({ speed: 0.5, offset: 50 });
      }

      // Icon Rollover -Service
      var $icon_list_over =  $('.icon-list-over');
      if ($icon_list_over.length > 0) {
        $icon_list_over.children('li').on('mouseenter mouseleave', function() {
          $(this).find('.icon').toggleClass('hover');
        });
      }
      // Active page menu when click
      var url = window.location.href;
      var $nav_link = $(".nav li a");
      $nav_link.each(function() {
          if (url === (this.href)) {
              $(this).closest("li").addClass("active");
          }
      });
      // Preloader
      var $preload = $('#preloader');
      if ($preload.length > 0) {
        $(window).on('load', function() {
          $preload.children().fadeOut(300);
          $preload.delay(150).fadeOut(500);
          $('body').delay(100).css({'overflow':'visible'});
        });
      }
      // Google map initialize
      var $mapholder = $('.map-holder');
      if ($mapholder.length > 0) {
        var map = new GMaps({
          div: '#gmap',
          lat: -12.043333,
          lng: -77.028333
        });

        $mapholder.on('click', function () {
          $(this).children().css("pointer-events", "auto");
        });

        $mapholder.on('mouseleave', function() {
          $(this).children().css("pointer-events", "none");
        });
      }
      // ImageBG 
      var $imageBG = $('.imagebg');
      if ($imageBG.length > 0) {
        $imageBG.each(function() {
          var $this = $(this), $this_img = $this.find('img'), img_src = $this_img.attr('src');
          if(img_src!=='' && typeof img_src !=='undefined') {
            $this.addClass('bgloaded').css('background-image', 'url('+ img_src +')');
            $this.parent().addClass('has-imagebg');
          }
        });
      }
      // Gallery Filtering
      var $filtered  = $('.gallery-filter ul'),
          $filterLi = $('.filter-menu li');

      if ($filterLi.length > 0) {
        // Active -item
        $filterLi.on('click', function () {
          $filterLi.removeClass('active');
          $(this).addClass('active');
        });
        // Filter -init()
        $(window).on('load', function() {
          $filtered.filterizr({
             delay: 25
          });
        });
      }
      // Gallery Popup
      var $gallery = $('.gallery-lightbox');
      if ($gallery.length > 0) {
          $gallery.magnificPopup({
            delegate: 'a',
            type:'image',
            gallery: { enabled: true },
            image: { titleSrc: function (item) {
                var caption = '', title = item.el.find('img').attr('title'), subtitle = item.el.find('img').attr('alt');
                if (typeof title!=='undefined' && title !=='') { 
                  caption = caption + title; 
                }
                if (typeof subtitle!=='undefined' && subtitle !=='') { 
                  if (typeof title==='undefined' || title ==='') {
                    caption = caption + subtitle; 
                  } else {
                    caption = caption + '<small>' + subtitle + '</small>'; 
                  }
                }
                if (caption==="") { 
                  caption = item.el.attr('title'); 
                }
                return caption;
              } 
            },
            zoom: { enabled: true }
          });
      }
        
      // Image Single Popup
      var $image = $('.single-lightbox');
      if ($image.length > 0) {
        $image.magnificPopup({
            gallery: { enabled: true },
            type:'image'
          });
      }
      // FORM @v 1.1.1
      var contactForm = $('#contact-us'),
          quoteForm = $('#quote-request'), 
          subscribeForm = $('#subscribe-me');
      if (quoteForm.length > 0 || contactForm.length > 0 || subscribeForm.length > 0) {
          if( !$().validate || !$().ajaxSubmit ) {
              console.log('quoteForm: jQuery Form or Form Validate not Defined.');
              return true;
          }
          // Quote Form - home page
          if (quoteForm.length > 0) {
              var selectRec = quoteForm.find('select.required'), 
              qf_results = quoteForm.find('.form-results');
              quoteForm.validate({
                ignore: [],
                errorPlacement: function(error, elm) {
                  if (elm.is('select.required')) { error.insertAfter(elm.next('.nice-select')); } else { error.insertAfter(elm); }
                },
                invalidHandler: function () { qf_results.slideUp(400); },
                submitHandler: function(form) {
                  qf_results.slideUp(400);
                  $(form).ajaxSubmit({
                    target: qf_results, dataType: 'json',
                    success: function(data) {
                      var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                      qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                      if (data.result !== 'error') { $(form).clearForm(); }
                    }
                  });
                }
              });
              selectRec.on('change', function() { $(this).valid(); });
          }
          // Contact Form - contact page
          if (contactForm.length > 0) {
            var cf_results = contactForm.find('.form-results');
            contactForm.validate({
              invalidHandler: function () { cf_results.slideUp(400); },
              submitHandler: function(form) {
                cf_results.slideUp(400);
                $(form).ajaxSubmit({
                  target: cf_results, dataType: 'json',
                  success: function(data) {
                    var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                    cf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                    if (data.result !== 'error') { $(form).clearForm(); }
                  }
                });
              }
            });
          }
          // Subsribe - footer form
          if (subscribeForm.length > 0) {
            var sf_results = subscribeForm.find('.form-results');
            subscribeForm.validate({
              invalidHandler: function () { sf_results.slideUp(400); },
              submitHandler: function(form) {
                sf_results.slideUp(400);
                $(form).ajaxSubmit({
                  target: sf_results, dataType: 'json',
                  success: function(data) {
                    var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                    sf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                    if (data.result !== 'error') { $(form).clearForm(); }
                  }
                });
              }
            });
          }
      }
})(jQuery);


function useEventListener(eventName, handler, element = document) {
  const savedHandler = React.useRef()

  React.useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  React.useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

/**
 * Animated Cursor
 * Replaces the native cursor with a custom animated cursor.
 *
 * @author Stephen Scaff
 */
function AnimatedCursor({
  color = '220, 90, 90',
  outerAlpha = 0.4,
  innerSize = 8,
  outerSize = 8,
  outerScale = 5,
  innerScale = 0.7
}) {
  const cursorOuterRef = React.useRef()
  const cursorInnerRef = React.useRef()
  const requestRef = React.useRef()
  const previousTimeRef = React.useRef()
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = React.useState(true)
  const [isActive, setIsActive] = React.useState(false)
  const [isActiveClickable, setIsActiveClickable] = React.useState(false)
  let endX = React.useRef(0)
  let endY = React.useRef(0)

  const onMouseMove = React.useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY })
    cursorInnerRef.current.style.top = clientY + 'px'
    cursorInnerRef.current.style.left = clientX + 'px'
    endX.current = clientX
    endY.current = clientY
  }, [])

  const animateOuterCursor = React.useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8
        coords.y += (endY.current - coords.y) / 8
        cursorOuterRef.current.style.top = coords.y + 'px'
        cursorOuterRef.current.style.left = coords.x + 'px'
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateOuterCursor)
    },
    [requestRef] // eslint-disable-line
  )

  React.useEffect(() => requestRef.current = requestAnimationFrame(animateOuterCursor), [animateOuterCursor])

  const onMouseDown  = React.useCallback(() => setIsActive(true), [])
  const onMouseUp    = React.useCallback(() => setIsActive(false), [])
  const onMouseEnter = React.useCallback(() => setIsVisible(true), [])
  const onMouseLeave = React.useCallback(() => setIsVisible(false), [])

  useEventListener('mousemove', onMouseMove, document)
  useEventListener('mousedown', onMouseDown, document)
  useEventListener('mouseup', onMouseUp, document)
  useEventListener('mouseenter', onMouseEnter, document)
  useEventListener('mouseleave', onMouseLeave, document)

  React.useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `scale(${innerScale})`
      cursorOuterRef.current.style.transform = `scale(${outerScale})`
    } else {
      cursorInnerRef.current.style.transform = 'scale(1)'
      cursorOuterRef.current.style.transform = 'scale(1)'
    }
  }, [innerScale, outerScale, isActive])

  React.useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `scale(${innerScale * 1.3})`
      cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`
    }
  }, [innerScale, outerScale, isActiveClickable])

  React.useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1
      cursorOuterRef.current.style.opacity = 1
    } else {
      cursorInnerRef.current.style.opacity = 0
      cursorOuterRef.current.style.opacity = 0
    }
  }, [isVisible])

  React.useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    )
    clickables.forEach((el) => {
      el.style.cursor = 'none'

      el.addEventListener('mouseover', () => {
        setIsActive(true)
      })
      el.addEventListener('click', () => {
        setIsActive(true)
        setIsActiveClickable(false)
      })
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true)
      })
      el.addEventListener('mouseup', () => {
        setIsActive(true)
      })
      el.addEventListener('mouseout', () => {
        setIsActive(false)
        setIsActiveClickable(false)
      })
    })

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive(true)
        })
        el.removeEventListener('click', () => {
          setIsActive(true)
          setIsActiveClickable(false)
        })
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true)
        })
        el.removeEventListener('mouseup', () => {
          setIsActive(true)
        })
        el.removeEventListener('mouseout', () => {
          setIsActive(false)
          setIsActiveClickable(false)
        })
      })
    }
  }, [isActive])

  const styles = {
    cursor: {
      zIndex: 999,
      position: 'fixed',
      opacity: 1,
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
    },
    cursorInner: {
      position: 'fixed',
      borderRadius: '50%',
      width: innerSize,
      height: innerSize,
      pointerEvents: 'none',
      backgroundColor: `rgba(${color}, 1)`,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out'
    },
    cursorOuter: {
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
    }
  }

  return (
    <React.Fragment>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </React.Fragment>
  )
}


// function App() {
//   return (
//     <div className="App">
//       <AnimatedCursor/>
//       <section>
//         <h1>Animated Cursor <br/>React Component</h1>
//         <hr/>
//         <p>An animated cursor component made as a <a>Functional Component</a>, using <a>React hooks</a> like <a>useEffect</a> to handle event listeners, local state, an  <a>RequestAnimationFrame</a> management.</p>
//         <p>Hover over these <a>links</a> and see how that animated cursor does it's thing. Kinda nifty, right? Not right for most things, but a nice move for more interactive-type projects. Here's another <a href="">link to nowhere.</a></p>
//         <p>Play with the <a>css variables</a> to influence the cursor, cursor outline size, and amount of scale on target hover. I suppose those could all be <a>props</a> with some. Click in the margin to check click animation.</p>
//       <p>There's probably a better way to manage these kind of events, but this was the best I could come up with. Recently started mucking more with React cause I'm down with the simplicity of Functional Components and Hooks. And if you read the docs, the future ain't class components. So, best get on them functions.</p>
//       </section>
//     </div>
//   );
// }
// ReactDOM.render(<App />, document.getElementById('app'))



  // /////////////////////////////////////////////////////
  // // 01. Cursor Animations

  // // Home Page Client Cursor
  // var client_cursor = document.getElementById("carousel-inner");

  // // Team Page Team Cursor
  // var team_cursor = document.getElementById("team_cursor");

  // // Portfolio  Cursor
  // var portf_cursor_6 = document.getElementById("portf_cursor_6");

  // // Featured  Cursor
  // var featured_cursor = document.getElementById("featured_cursor");

  // var portfolio4_cursor = document.getElementById("portfolio4_cursor");

  // function mousemoveHandler(e) {
  //   try {
  //     const target = e.target;

  //     let tl = gsap.timeline({
  //       defaults: {
  //         x: e.clientX,
  //         y: e.clientY,
  //       },
  //     });
  //     let t2 = gsap.timeline({
  //       defaults: {
  //         x: e.clientX,
  //         y: e.clientY,
  //       },
  //     });

  //     // Home Page Client Cursor
  //     if (target.closest(".carousel-inner")) {
  //       tl.to(
  //         client_cursor,
  //         {
  //           opacity: 1,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     } else {
  //       t2.to(
  //         client_cursor,
  //         {
  //           opacity: 0,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     }

  //     // Team Page Team Cursor
  //     if (target.closest(".team__slider")) {
  //       tl.to(
  //         team_cursor,
  //         {
  //           opacity: 1,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     } else {
  //       t2.to(
  //         team_cursor,
  //         {
  //           opacity: 0,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     }

  //     // Portfolio Cursor
  //     if (target.closest(".portfolio__item-6")) {
  //       tl.to(
  //         portf_cursor_6,
  //         {
  //           opacity: 1,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     } else {
  //       t2.to(
  //         portf_cursor_6,
  //         {
  //           opacity: 0,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     }
  //     // Portfolio Cursor
  //     if (target.closest(".portfolio__item-6")) {
  //       tl.to(
  //         portf_cursor_6,
  //         {
  //           opacity: 1,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     } else {
  //       t2.to(
  //         portf_cursor_6,
  //         {
  //           opacity: 0,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     }

  //     // featured  Cursor
  //     if (target.closest(".portfolio__slider-3")) {
  //       tl.to(
  //         featured_cursor,
  //         {
  //           opacity: 1,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     } else {
  //       t2.to(
  //         featured_cursor,
  //         {
  //           opacity: 0,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     }

  //     // featured  Cursor
  //     if (target.closest(".portfolio__area-5")) {
  //       tl.to(
  //         portfolio4_cursor,
  //         {
  //           opacity: 1,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     } else {
  //       t2.to(
  //         portfolio4_cursor,
  //         {
  //           opacity: 0,
  //           ease: "power4.out",
  //         },
  //         "-=0.3"
  //       );
  //     }

  //     // Main Cursor Moving
  //     tl.to(".cursor1", {
  //       ease: "power2.out",
  //     }).to(
  //       ".cursor2",
  //       {
  //         ease: "power2.out",
  //       },
  //       "-=0.4"
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // document.addEventListener("mousemove", mousemoveHandler);
  // /////////////////////////////////////////////////////


