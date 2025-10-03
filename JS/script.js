/* typing animation */
var typed = new Typed(".typing",{
    strings :['','Web Developer','Web Designer','UI/UX Design','Problem Solver','Software Engineer','Data Engineer'],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})
/* aside */
const nav = document.querySelector('.nav'),
    navlist = nav.querySelectorAll('li'),
    totalnavlist = navlist.length,
    allsection = document.querySelectorAll('.section'),
    totalsection = allsection.length;
    for(let i = 0; i<totalnavlist;i++){
        const a = navlist[i].querySelector('a');
        a.addEventListener('click', function() {
            removebacksection()
            for(let j = 0 ; j < totalnavlist ; j++){
                if(navlist[j].querySelector('a').classList.contains('active')){
                    addbacksection(j);
                }
                navlist[j].querySelector('a').classList.remove('active');
            }
            this.classList.add('active');
            showsection(this);
            if(window.innerWidth<1050){
                asidesectiontogglerbtn();
            }
        })
    }
    function showsection(element){
        for(let i =0 ; i<totalsection; i++){
            allsection[i].classList.remove('active');
        }
        const target = element.getAttribute('href').split('#')[1];
        document.querySelector('#' + target).classList.add('active');
    }
    function updatenav(element){
        for(let i =0;i<totalnavlist;i++){
            navlist[i].querySelector('a').classList.remove('active');
            const target = element.getAttribute('href').split('#')[1];
            if (target=== navlist[i].querySelector('a').getAttribute('href').split('#')[1]){
                navlist[i].querySelector('a').classList.add('active');
            }
        }
    }
    function removebacksection(){
        for(let i =0 ; i<totalsection; i++){
            allsection[i].classList.remove('back-section');
        }
    }
    function addbacksection(j){
        allsection[j].classList.add('back-section');
    }
    document.querySelector('.hire-me').addEventListener('click', function(){
        showsection(this);
        updatenav(this);
        removebacksection();
        addbacksection(1);
    })

    const navtogglerbtn = document.querySelector('.nav-toggler'),
        aside = document.querySelector('.aside');
        navtogglerbtn.addEventListener('click',() => {
            asidesectiontogglerbtn();
        })
        function asidesectiontogglerbtn(){
            aside.classList.toggle('open');
            navtogglerbtn.classList.toggle('open');
            for(let i =0 ; i<totalsection ; i++){
                allsection[i].classList.toggle('open');
            }
        }

/* swipe navigation for sidebar toggle */
let touchStartX = 0;
let touchStartY = 0;
let isSwipeGesture = false;
const minSwipeDistance = 60; // Minimum distance for a valid swipe (reduced)
const maxVerticalMovement = 80; // Maximum vertical movement allowed (increased)

// Get main content element for swipe hints
const mainContent = document.querySelector('.main-content');

// Add touch event listeners for sidebar toggle on main content
mainContent.addEventListener('touchstart', handleTouchStart, { passive: false });
mainContent.addEventListener('touchmove', handleTouchMove, { passive: false });
mainContent.addEventListener('touchend', handleTouchEnd, { passive: false });

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwipeGesture = false;

    const aside = document.querySelector('.aside');
    const isNavOpen = aside.classList.contains('open');

    // Show swipe hint based on navigation state
    if (!isNavOpen && touchStartX < 80) {
        // Navigation closed: show hint for left edge swipe to open
        mainContent.classList.add('swipe-hint');
    } else if (isNavOpen && touchStartX > window.innerWidth - 80) {
        // Navigation open: show hint for right edge swipe to close
        mainContent.classList.add('swipe-hint');
    }
}

function handleTouchMove(e) {
    if (!touchStartX || !touchStartY) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX;
    const deltaY = Math.abs(currentY - touchStartY);

    const aside = document.querySelector('.aside');
    const isNavOpen = aside.classList.contains('open');

    // Check if this is a horizontal swipe and not too vertical
    if (deltaY < maxVerticalMovement) {
        if (!isNavOpen && deltaX > 20 && touchStartX < 80) {
            // Navigation closed: left-to-right swipe from left edge
            e.preventDefault();
            isSwipeGesture = true;
        } else if (isNavOpen && deltaX < -20 && touchStartX > window.innerWidth - 80) {
            // Navigation open: right-to-left swipe from right edge
            e.preventDefault();
            isSwipeGesture = true;
        }
    }
}

function handleTouchEnd(e) {
    // Hide swipe hint
    mainContent.classList.remove('swipe-hint');

    if (!touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = Math.abs(touchEndY - touchStartY);

    const aside = document.querySelector('.aside');
    const isNavOpen = aside.classList.contains('open');

    // Check swipe direction based on navigation state
    let isValidSwipe = false;

    if (!isNavOpen) {
        // Navigation closed: left-to-right swipe from left edge to open
        isValidSwipe = (deltaX > minSwipeDistance && deltaY < maxVerticalMovement && touchStartX < 80);
    } else {
        // Navigation open: right-to-left swipe from right edge to close
        isValidSwipe = (deltaX < -minSwipeDistance && deltaY < maxVerticalMovement && touchStartX > window.innerWidth - 80);
    }

    if (isValidSwipe) {
        // Toggle the navigation sidebar
        toggleNavigation();
    }

    // Reset
    touchStartX = 0;
    touchStartY = 0;
    isSwipeGesture = false;
}

function toggleNavigation() {
    const aside = document.querySelector('.aside');
    const navToggler = document.querySelector('.nav-toggler');

    // Check if navigation is currently open
    const isOpen = aside.classList.contains('open');

    if (!isOpen) {
        // Open navigation
        aside.classList.add('open');
        navToggler.classList.add('open');

        // Close navigation sections
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.classList.add('open');
        });
    } else {
        // Close navigation
        aside.classList.remove('open');
        navToggler.classList.remove('open');

        // Open navigation sections
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.classList.remove('open');
        });
    }
}