

(function(){

        var title_span = document.getElementById("ol-title-span");

        var t = ["WORK","LIVE","PLAY","ENJOY"];
        var counter = 0;
                 

        function ainmate_title(){

            i=0;
            next_title();

            var tl= new TimelineMax({repeat:-1,repeatDelay:3.5,onRepeat:next_title});
                          
            tl.call(tween_it);


            function tween_it(){
                
                console.log("Tweening "+counter);
                var tl2= new TimelineLite();      
                       
                tl2.staggerFromTo(".spany",0.05, {opacity:0, y:-100},{opacity:1, y:100}, 0.1)
                   .staggerFromTo(".spany", 0.05, {opacity:1, y:100},{opacity:0, y:-100}, -0.1,'+=2');
                
                counter++;   
            
            }

            function next_title(){

                if(i==4){ i=0; }
                title_span.innerHTML=t[i];
                split_title(title_span);
                i++;

            }
    
            function split_title (s){

                var msg = s.textContent;
                msg=msg.split('');
                s.innerHTML = "<span class=\"spany\">" + msg.join("</span><span class=\"spany\">") + "</span>";


            }
          
        }

        window.addEventListener("load", function(){

              ainmate_title();

         });

})();