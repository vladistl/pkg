
window.onload = function() {

    function anim(duration) {
        var temp;
        return function(sel) {
            cancelAnimationFrame(temp);
            var start = performance.now();
            var from = window.pageYOffset || document.documentElement.scrollTop,
            to = sel.getBoundingClientRect().top;
            requestAnimationFrame(function step(timestamp) {
                var progress = (timestamp - start) / duration;
                1 <= progress && (progress = 1);
                window.scrollTo(0, from + to * progress | 0);
                1 > progress && (temp = requestAnimationFrame(step))
            })
        }
    };
    var scrollMenu = anim(200)

    window.addEventListener("hashchange", (e)=>{
        
        let currentHash = location.hash;
        if(currentHash){
            let activeTab = document.querySelector(currentHash);
            stateTabs(activeTab)
        }
        
        
    });
    if(location.hash){
        stateTabs(document.querySelector(location.hash))
    }
    function stateTabs(hash){
        if(hash){
        
            document.querySelectorAll('[data-tab]').forEach( item => {
                
                if(item.nodeType == 1){
                    item.classList.remove("active")
                    item.addEventListener("click", (e)=> {
                        if(e.target.parentNode.classList.contains("active")){
                            e.target.parentNode.classList.remove("active")
                        }else{
                            e.target.parentNode.classList.add("active")
                        }
                            
                        
                    });
                }
                
            })
            if(!hash.classList.contains("active")){
                scrollMenu(hash);
                hash.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
                 
                hash.classList.add("active")
            }
            
        }
    }
    $btnUp = document.querySelector(".btn-circle-up")
    if($btnUp){
        var scrollHeader = anim(400)
        window.addEventListener('scroll', (e)=> {
            if(pageYOffset > 300){
                $btnUp.classList.add("active");
            }else{
                $btnUp.classList.remove("active");
            }
        });
        $btnUp.addEventListener("click", ()=>{
            scrollHeader(document.querySelector("header"))
        });
        
    }

    $dataAttrModalZz = document.querySelectorAll("[data-zzmodal=\"show\"]");
    if($dataAttrModalZz){
        $dataAttrModalZz.forEach((btn) => {
            btn.addEventListener("click", function(e){
                e.preventDefault()
                modalActive(this.getAttribute("href"))
            });
        });

    }
    
    function modalActive(id){
        document.querySelector(".overlay").classList.add("active")
        document.querySelector(id).classList.add("active")
        document.querySelectorAll(".modal-zz-close").forEach((btnClose) => {
            
            btnClose.addEventListener("click", function(e){
                
                if(this.closest(".modal-zz").classList.contains("active")){
                    this.closest(".modal-zz").classList.remove("active")
                    document.querySelector(".overlay").classList.remove("active")
                }

            });
        });
        document.querySelectorAll(".modal-zz.active").forEach(modal => {
            modal.addEventListener("click", (e) => {
                if(e.target.classList.contains("active") && e.target.classList.contains("active")){
                   e.target.classList.remove("active");
                   document.querySelector(".overlay").classList.remove("active")
                }
                

            });
        })
    }

    $dataAttrMenu = document.querySelectorAll("[data-toggle-menu=\"show\"]");
    if($dataAttrMenu){
        $dataAttrMenu.forEach((menu) => {
            menu.addEventListener("click", function(e){
                e.preventDefault()
                document.querySelector(this.getAttribute("href"))
                if(document.querySelector(this.getAttribute("href")).classList.contains("active")){
                    document.querySelector(this.getAttribute("href")).classList.remove("active")
                    document.querySelector(".overlay").classList.remove("active")
                    document.querySelector("header").style.zIndex = '0'
                }else{
                    document.querySelector(this.getAttribute("href")).classList.add("active")
                    document.querySelector(".overlay").classList.add("active")
                    document.querySelector("header").style.zIndex = '100'
                    document.querySelector("header").style.position = 'relative'
                }
            });
        });
        document.querySelector(".close-menu").addEventListener("click", function(){
            
            if(this.closest(".header-top_menu__items").classList.contains("active")){
                this.closest(".header-top_menu__items").classList.remove("active")
                document.querySelector(".overlay").classList.remove("active")
                document.querySelector("header").style.zIndex = '0'
            }
        })

    }

 };