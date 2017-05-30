
"use strict";

(function (){

            var throttle = function(type, name, obj) {
            obj = obj || window;
            var running = false;
            var func = function() {
                if (running) { return; }
                running = true;
                requestAnimationFrame(function() {
                    obj.dispatchEvent(new CustomEvent(name));
                    running = false;
                });
            };
            obj.addEventListener(type, func);
        };

        throttle("scroll","optimizedScrolling");
        throttle("resize","optimizedResizing");

})();


(function(){

        function autoscroll (){

            var sticky_elem = document.querySelectorAll('[data-moodieio-stickyscroll]'),
                elem_top = [],
                elem_height = [], // stores the height of each element
                viewport_height,
                height_difference,
                s_breakpoint = [],
                scroll_dir= true, // scroll direction 
                w_top = window.scrollY, // refrence window top
                cw_top, // current winodow top
                timeout = 1,
                w_top_ref = 0, // window top last known location for scrolling up only. default value 0
                w_top_curr =0,
                speed = 20, // speed of scroll animation. the smaller value, the more speed
                tick,
                diff,
                curr;
            
            update_values(); // update scroll breakpoints

            window.addEventListener("optimizedResizing", update_values); // update scroll breakpoints on resize events

            window.addEventListener('optimizedScrolling', function() {

                    if (timeout != 1) clearTimeout(timeout);

                    timeout = setTimeout(after_scrolling, 500);
            });

            function after_scrolling(){

                cw_top=window.scrollY; // new scroll position after scrolling
                console.log("b_top-->"+w_top);
                console.log("cw_top-->"+cw_top);

                for(var i=0;i<elem_top.length;i++){

                    if (cw_top==elem_top[i]){
                        w_top=cw_top; // update refrence body top
                        return;
                    }

                }
                                
                if(cw_top>w_top){ // if scrolling down

                    console.log("scrolling down");
                    scroll_dir=true;

                    for(i=0;i<s_breakpoint.length;i++){

                        if(cw_top > s_breakpoint[i] && cw_top <  elem_top[i+1]){

                            scrollTo(elem_top[i+1],0,scroll_dir);
                            w_top_ref=i+1; //update refrence winodw top for scrolling up 
                                              
                        }

                    }


                }

                if(cw_top<w_top){ // if scrolling up

                    console.log("scrolling up");
                    scroll_dir=false;
  
                    for(i=s_breakpoint.length-1;i>=0;i--){

                        if(cw_top < elem_top[i] && cw_top >  elem_top[i-1]){

                            w_top_curr = i-1;
                            console.log("w_top_ref  --> "+w_top_ref);
                            console.log("w_top_curr --> "+w_top_curr);

                            if(w_top_curr!=w_top_ref){

                                scrollTo(elem_top[i-1],0,scroll_dir);

                            }

                            w_top_ref=w_top_curr; // update refrence window top
                
                                              
                        }

                    }


                }

                w_top=cw_top; // update refrence window top
                console.log("updated w_top -->"+w_top);
             }


            function scrollTo (to,count,sd){

                if (count ==0){
                    curr=window.scrollY; 
                    diff = Math.abs(to-curr); 
                    tick=diff/speed; 
                    console.log("from : "+curr+"  To : "+to+ " diff : " +diff+ "  tick : " +tick);
                }

                if(count>speed){console.log("scrollTo Ended on -->"+curr);w_top=curr;return;}

                count++;
  
                if(sd){ //if scrolling down

                    curr = curr+tick;
                    if(curr>to){curr=to;}

                }else{ // if scrolling up

                    curr =curr-tick;
                    if (curr<to){curr=to;}
                }

                window.scrollTo(0,curr);
                
                setTimeout(function() {scrollTo(to,count,sd);}, 10);

            }

            function update_values (){

               console.log("Values Updated !!"); 
               for(var i=0;i<sticky_elem.length;i++){

                        elem_top[i]=sticky_elem[i].offsetTop;
                        elem_height=sticky_elem[i].clientHeight;
                        viewport_height = window.innerHeight;
                        height_difference = Math.abs(elem_height-viewport_height);
                        s_breakpoint[i]=elem_top[i]+ height_difference;

                        console.log("top of elem "+i+" : "+ elem_top[i] );
                        console.log("scroll breakpoint : "+ s_breakpoint[i]);
                     

                }

            }
        }

        window.addEventListener("load", autoscroll );

})();