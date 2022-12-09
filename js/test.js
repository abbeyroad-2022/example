
  gsap.registerPlugin(ScrollTrigger);
  
  const images = gsap.utils.toArray('img');
  const loading= document.querySelector('.loading');
  const loadingNum= document.querySelector('.loading-text');

  let anitl = gsap.timeline();

  function intro(){

    let introBg = document.querySelector(".intro-bg")
    let introText =  document.querySelector(".intro-text")
    let span = document.querySelectorAll('.intro span');
    
    span.forEach((i)=>{
      anitl.from(i, {y: 200, duration: 0.8, onComplete: function(){
        anitl.to(introText, {autoAlpha: 0, duration: 1.5},2)
      }})
    })

    anitl.to(introBg, {
      width: "100vw",
      height: "100vh", 
      duration: 1.5,
      onComplete: function() {
        document.body.style.overflowY = 'auto';
        introText.innerHTML = `<p><span>I MISS</span></p><p><span>YOU :)</span></p>`
        anitl.to(introText, {autoAlpha: 1, duration: 1.5})
      }
    },3) 
    
  }

  function main(){

    let frame = document.querySelector('#frame');
    let ctTitle = document.querySelector(".connect-title");
    let ctTitleSpan = document.querySelectorAll(".connect-title span");
    let ctPic = document.querySelector(".connect-pic");
    
    /* connect */ 
    anitl.to(ctTitle, {
      scrollTrigger: {
        trigger: frame,
        pin: ctTitle,
        start: "top top",
        end: "+="+ (ctPic.offsetHeight),
        scrub: 2,
        pinSpacing: true,
        anticipatePin: true
      },
    duration: 1.5})

    ctTitleSpan.forEach((i,idx)=>{
      let x = ["-80%", 0, "80%"];
      anitl.to(i, {
          scrollTrigger: {
            trigger: i,
            start: "top center",
            scrub: 2
          },
        x: x[idx], duration: 1.5}
      )
    })

    /* space */ 
    let spe = document.querySelector(".space");
    let speSlide = gsap.utils.toArray("space-slide");
    let speTitle = document.querySelectorAll(".space h2");
    let maxWidth = 0;

     /* 
    anitl.to(spe, {
      x: () => -(spe.scrollWidth - document.documentElement.clientWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: spe,
        invalidateOnRefresh: true,
        pin: true,
        scrub: 1,
        end: () => "+=" + spe.offsetWidth+ 5,
        onEnter: function onEnter() {
          // changeEl.classList.add('black');
        },
        onEnterBack: function onEnterBack() {
          // changeEl.classList.add('black');
        },
        onLeave: function onLeave() {
          // changeEl.classList.remove('black');
        },
        onLeaveBack: function onLeaveBack() {
          // changeEl.classList.remove('black');
        }
      }
    })

    speTitle.forEach(i => {
      anitl.to(i, {
        defaults: {ease: "none"},
        scrollTrigger: {
          scroller: i.closest(".horizSlider"),
          horizontal: true,
          trigger: v.closest(".slide"),
          start: "left right",
          end: "left left",
          scrub: true
        }
      })
      .fromTo(text, {x: 250}, {x: -250}, 0)
      .from(text.nextElementSibling, {scale: 0.8}, 0)
    });

    
/* 여기서부터 작업 시작하기 */

let sections = gsap.utils.toArray(".space-slide");

console.log(spe.scrollWidth - document.documentElement.clientWidth);
let scrollTween = anitl.to(sections, {
    //xPercent: -100 * (sections.length - 1),
    xPercent: () => -(spe.scrollWidth - document.documentElement.clientWidth) + "px",
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: ".space",
      pin: true,
      scrub: 0.1,
      //snap: directionalSnap(1 / (sections.length - 1)),
      end: "+=3000"
    }
  }); 

gsap.set(".box-1, .box-2", {y: 100});
ScrollTrigger.defaults({markers: {startColor: "white", endColor: "white"}});

// red section
gsap.to(".box-1", {
  y: -130,
  duration: 2,
  ease: "elastic",
  scrollTrigger: {
    trigger: ".box-1",
    containerAnimation: scrollTween,
    start: "left center",
    toggleActions: "play none none reset",
    id: "1",
  }
});

/* //여기서부터 작업 시작 */
  }
  








/* imagesLoaded loading */
  imagesLoaded(images).on("progress", (i)=> {
    loadingNum.innerHTML = `${Math.round(i.progressedCount * 100 / images.length)}%`
  }).on("always",()=>{
    document.scrollingElement.scrollTo(0, 0);
    gsap.to(loading, { autoAlpha: 0 });
    intro();
    main()
  })
