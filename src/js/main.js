/* Your JS here. */
console.log('Hello World!')

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const menuItems = document.querySelectorAll('.menu a');
    const indicator = document.querySelector('.position-indicator');
    function updateActiveMenuItem() {
        const scrollPosition = window.scrollY;
        let activeSection = null;
        menuItems.forEach((item) => {
            const targetId = item.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement.offsetTop - navbar.offsetHeight <= scrollPosition &&
                targetElement.offsetTop + targetElement.offsetHeight > scrollPosition) {
                activeSection = targetId;
            }
        });
        if (scrollPosition + window.innerHeight >= document.body.offsetHeight) {
            activeSection = menuItems[menuItems.length - 1].getAttribute('href').substring(1);
        }
        if (activeSection) {
            const activeMenuItem = document.querySelector(`.menu a[href="#${activeSection}"]`);
            const menuItemWidth = activeMenuItem.offsetWidth;
            const menuItemLeft = activeMenuItem.getBoundingClientRect().left - navbar.getBoundingClientRect().left;

            indicator.style.width = `${menuItemWidth}px`;
            indicator.style.transform = `translateX(${menuItemLeft}px)`;
        } else {
            indicator.style.width = '0';
        }
    }

    const backToTopLink = document.querySelector('.back-to-top');
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    menuItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offsetTop = targetElement.offsetTop - navbar.offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        });
    });
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('small', window.scrollY > 50);
        updateActiveMenuItem();
    });
    backToTopLink.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
    });

    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentIndex = 0;
    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();
    }
    function updateCarousel() {
        const translateX = -currentIndex * 100 + '%';
        container.style.transform = `translateX(${translateX})`;
    }
    nextArrow.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    prevArrow.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    const modalButtons = document.querySelectorAll(".modal-button");
    function showModal(button) {
        const modal = button.nextElementSibling;
        modal.style.display = "block";
        const closeButton = modal.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
    modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showModal(button);
        });
    });

    updateActiveMenuItem();
});
