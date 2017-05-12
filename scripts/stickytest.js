

(function(){

       var isStick=[];
       var runSticky = function(stick,sticky_wrapper,isStick,k){

           console.log("k="+k);
           var stick_height = stick[k].clientHeight; 
           var wrapper_height =sticky_wrapper[k].clientHeight;
           var sticky_top = sticky_wrapper[k].getBoundingClientRect().top;

           if (sticky_top>0){

               sticky_wrapper[k].style.height ="auto";
               stick[k].style.height="100%";
               stick[k].style.width="100%";
               if(isStick[k]){  stick[k].className = " "; }
               isStick[k]= false;


           }else{

                stick_height=stick_height*(k+1);
                sticky_wrapper[k].style.height = stick_height+"px";
                if(!isStick[k]){stick[k].className+= "is-sticky";}
                isStick[k] = true;
           }

       }  


       window.addEventListener("load", function(){

           
            var sticky_wrapper = document.querySelectorAll('[data-wrapper]');
            var stick = document.querySelectorAll('[data-moodieio-stickyscroll]');
            stick.className += " ";
            isStick.length=sticky_wrapper.length;
            isStick.fill(false);

            for (j=0;j<isStick.length;j++){
                console.log(isStick[j]);
            }
            
            for (k=0; k<stick.length;k++){

                (function(k){

                    window.addEventListener("scroll", function(){
                        
                         runSticky(stick,sticky_wrapper,isStick,k);
                                   
                    });

                })(k);
            }

        });

})();