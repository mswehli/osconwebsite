


(function(){

        window.onbeforeunload = function () {
            window.scrollTo(0,0);
        }

        window.addEventListener("load", function(){

            var sticky_elem = document.querySelectorAll('[data-moodieio-stickyscroll]');
            var elem_top = [];
            var elem_height = [];
            var b_top = window.scrollY; // refrence window top
            var timeout = 1;

            var speed = 20; // speed of scroll animation. the smaller value, the more speed
            var diff;
            var curr;
            

            update_values(); // update scroll breakpoints

            window.addEventListener("resize", update_values); // update scroll breakpoints on resize events

            window.addEventListener('scroll', function() {

                    if (timeout != 1) clearTimeout(timeout);

                    timeout = setTimeout(after_scrolling, 500);
            });

            function after_scrolling(){

                nb_top=window.scrollY;
                var scroll_dir;
                console.log("b_top-->"+b_top);
                console.log("nb_top-->"+nb_top);
                                
                if(nb_top>b_top){ // if scrolling down

                    console.log("scrolling down");
                    scroll_dir=true;

                    if(nb_top > elem_top[0] && nb_top <  elem_top[1]){

                        scrollTo(elem_top[1],0,scroll_dir);

                                               
                     }
                    else if(nb_top >  elem_top[1] && nb_top <  elem_top[2]){

                        scrollTo(elem_top[2],0,scroll_dir);
                    

                    }
                    else if(nb_top >  elem_top[2] && nb_top <  elem_top[3]){

                        scrollTo(elem_top[3],0,scroll_dir);
                    
                    }

                }

                if(nb_top<b_top){ // if scrolling up

                    console.log("scrolling up");
                    scroll_dir=false;

                    if(nb_top <  elem_top[3] && nb_top >  elem_top[2]){

                        scrollTo(elem_top[2],0,scroll_dir);
                        
                    }
                    else if(nb_top <  elem_top[2] && nb_top >  elem_top[1]){

                        scrollTo(elem_top[1],0,scroll_dir);
 
                    }
                    else if(nb_top <  elem_top[1] ){

                        scrollTo(elem_top[0],0,scroll_dir);
                        
                    }

                }

                b_top=nb_top; // update refrence body top
                console.log("updated w_top -->"+b_top);
 

            }


            function scrollTo (to,count,sd){

                if (count ==0){
                    curr=window.scrollY; 
                    diff = Math.abs(to-curr);  
                    tick=diff/speed; 
                    console.log("from : "+curr+"  To : "+to+ " diff : " +diff+ "  tick : " +tick);
                }

               if(count>speed){console.log("Ended...");return;}

                count++;
  
                if(sd){ //if scrolling down
        
                    if (curr>=to){console.log("function is returned"); return;}
                    curr = curr+tick;
                    if(curr>to){curr=to;}

                }else{ // if scrolling up

                    if (curr<=to){console.log("function is returned"); return;}
                    curr =curr-tick;
                    if (curr<to){curr=to;}
                }

                window.scrollTo(0,curr);
                
                setTimeout(function() {
                   scrollTo(to,count,sd);
                }, 10);


            }

            function update_values (){
                 window.scrollTo(0,0);
               for(i=0;i<sticky_elem.length;i++){

                        elem_top[i]=sticky_elem[i].getBoundingClientRect().top;
                        console.log("elem_top "+i+" : "+ elem_top[i] );

                }
            }
                        
        });

})();