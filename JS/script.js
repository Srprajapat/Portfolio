/* typing animation */
var typed = new Typed(".typing",{
    strings :['','Web Developer','Web Designer','UI/UX Design','Problem Solver','Software Engineer','Data Engineer','Data Scientist','Machine Learning Engineer','Software Developer'],
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

