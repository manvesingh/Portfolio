// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
    })
  })

  // Sticky Header
  const header = document.getElementById("header")
  const scrollThreshold = 50

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("py-2")
      header.classList.add("shadow-md")
    } else {
      header.classList.remove("py-2")
      header.classList.remove("shadow-md")
    }
  })

  // Active Navigation Link
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("text-indigo-600")
      link.classList.remove("font-semibold")

      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("text-indigo-600")
        link.classList.add("font-semibold")
      }
    })

    mobileNavLinks.forEach((link) => {
      link.classList.remove("text-indigo-600")
      link.classList.remove("font-semibold")

      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("text-indigo-600")
        link.classList.add("font-semibold")
      }
    })
  })

  // Skill Progress Animation
  const skillSection = document.getElementById("skills")
  const progressBars = document.querySelectorAll(".skill-progress")

  function showProgress() {
    progressBars.forEach((progress) => {
      progress.style.width = progress.parentElement.getAttribute("data-width")
    })
  }

  // Initialize progress bars with zero width
  progressBars.forEach((progress) => {
    progress.style.width = "0"
  })

  // Show progress when skills section is in view
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showProgress()
          skillObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  if (skillSection) {
    skillObserver.observe(skillSection)
  }

  // Testimonial Slider
  const testimonialTrack = document.querySelector(".testimonial-track")
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const prevButton = document.querySelector(".testimonial-prev")
  const nextButton = document.querySelector(".testimonial-next")
  const dotsContainer = document.querySelector(".testimonial-dots")
  const dots = document.querySelectorAll(".testimonial-dots button")

  let currentIndex = 0
  let slideWidth = 0
  let slidesToShow = 1

  function updateSliderLayout() {
    // Determine how many slides to show based on screen width
    if (window.innerWidth >= 1024) {
      slidesToShow = 3
    } else if (window.innerWidth >= 768) {
      slidesToShow = 2
    } else {
      slidesToShow = 1
    }

    // Calculate slide width
    slideWidth = testimonialTrack.clientWidth / slidesToShow

    // Set width for each slide
    testimonialSlides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`
    })

    // Update track position
    updateSliderPosition()
  }

  function updateSliderPosition() {
    testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove("bg-gray-300")
        dot.classList.add("bg-indigo-600")
      } else {
        dot.classList.remove("bg-indigo-600")
        dot.classList.add("bg-gray-300")
      }
    })
  }

  function nextSlide() {
    if (currentIndex < testimonialSlides.length - slidesToShow) {
      currentIndex++
    } else {
      currentIndex = 0
    }
    updateSliderPosition()
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--
    } else {
      currentIndex = testimonialSlides.length - slidesToShow
    }
    updateSliderPosition()
  }

  // Initialize slider
  updateSliderLayout()

  // Event listeners for slider controls
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", prevSlide)
    nextButton.addEventListener("click", nextSlide)
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index
      updateSliderPosition()
    })
  })

  // Update slider on window resize
  window.addEventListener("resize", updateSliderLayout)

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000)

  // Contact Form Validation
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      if (name && email && message) {
        // In a real application, you would send the form data to a server
        alert("Thank you for your message! I will get back to you soon.")
        contactForm.reset()
      } else {
        alert("Please fill in all required fields.")
      }
    })
  }

  // Parallax Effect for Hero Section
  const heroSection = document.getElementById("home")

  window.addEventListener("scroll", () => {
    if (heroSection) {
      const scrollPosition = window.scrollY
      const parallaxElements = heroSection.querySelectorAll(".hero-image-container")

      parallaxElements.forEach((element) => {
        element.style.transform = `translateY(${scrollPosition * 0.1}px)`
      })
    }
  })
})
