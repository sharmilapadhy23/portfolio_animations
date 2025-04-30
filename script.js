// --- Video Play on First Body Click (for mobile) ---
function playVideo() {
  document.body.addEventListener("click", () => {
    document.querySelector("video").play();
  }, { once: true });
}
playVideo();

// --- Swiper Slider Animation ---
function sliderAnimation() {
  new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });
}
sliderAnimation();

// --- Locomotive Scroll + GSAP ScrollTrigger Setup ---
function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0, left: 0, width: window.innerWidth, height: window.innerHeight
      };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locoScroll();

// --- Animated Scrollbar Progress Bar ---
function animateScrollIndicator() {
  const indicator = document.getElementById('scroll-indicator');
  const main = document.getElementById('main');
  if (!indicator || !main) return;

  if (window.LocomotiveScroll && main.__locomotive) {
    main.__locomotive.on('scroll', (args) => {
      const scrollY = args.scroll.y;
      const maxScroll = args.limit.y;
      const progress = Math.min(scrollY / maxScroll, 1);
      gsap.to(indicator, {
        width: `${progress * 100}%`,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  } else {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      gsap.to(indicator, {
        width: `${progress * 100}%`,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  }
}
setTimeout(animateScrollIndicator, 1000);

// --- Parallax Effect for Elements with .parallax and data-speed ---
function parallaxEffect() {
  gsap.utils.toArray(".parallax").forEach(el => {
    gsap.to(el, {
      y: () => -(window.innerHeight * (parseFloat(el.dataset.speed) || 0.5)),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        scroller: "#main",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}
parallaxEffect();

// --- Colorful Animated Cursor with Proximity Letter Highlight ---
function cursorEffect() {
  const cursor = document.querySelector("#cursor");
  const page1Content = document.querySelector("#page1-content");
  const spans = page1Content.querySelectorAll("h1 span");
  let hue = 0;
  let animationFrame;

  // Animate cursor color on mousemove
  function animateCursorColor() {
    hue = (hue + 1) % 360;
    cursor.style.background = `linear-gradient(135deg, hsl(${hue},100%,60%), hsl(${(hue+45)%360},100%,60%))`;
    cursor.style.boxShadow = `0 0 25px hsl(${hue},100%,60%,0.7)`;
    animationFrame = requestAnimationFrame(animateCursorColor);
  }

  page1Content.addEventListener("mouseenter", () => {
    gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
    animateCursorColor();
  });

  page1Content.addEventListener("mouseleave", () => {
    gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
    cancelAnimationFrame(animationFrame);
  });

  page1Content.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      x: e.x,
      y: e.y,
      duration: 0.2,
      ease: "power2.out"
    });

    // Proximity color change for logo letters
    spans.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const spanX = rect.left + rect.width / 2;
      const spanY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - spanX, e.clientY - spanY);
      if (dist < 50) {
        span.style.transition = "color 0.3s";
        span.style.color = `hsl(${hue},100%,60%)`;
        span.style.textShadow = `0 2px 12px hsl(${hue},100%,60%,0.6)`;
      } else {
        span.style.transition = "color 0.3s";
        span.style.color = "";
        span.style.textShadow = "";
      }
    });
  });
}
cursorEffect();

// --- Page 2 Text Animation ---
function page2Animation() {
  gsap.from(".elem h1", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 47%",
      end: "top 45%",
      scrub: 1,
    },
  });
}
page2Animation();

// --- Loader and Hero Text Animation ---
var tl = gsap.timeline();
tl.from("#loader h3", {
  x: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
});
tl.to("#loader h3", {
  x: -40,
  opacity: 0,
  duration: 1,
  stagger: -0.2,
});
tl.to("#loader", {
  opacity: 0,
  display: "none",
  duration: 0.5
});
tl.from("#page1-content span", {
  y: 100,
  opacity: 0,
  stagger: 0.1,
  duration: 1,
  ease: "power3.out"
});
