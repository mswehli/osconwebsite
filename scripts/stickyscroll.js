"use strict";
var Moodieio = Moodieio || {};

/*
 * Basic sticky scroll script V0.1. Simply adds/removes a class when it needs to be sticky
 * 
 * 
*/

//throttle script modified from MDN url: https://developer.mozilla.org/en-US/docs/Web/Events/resize on 20/01/2017
(function() {
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

    Moodieio.throttle = throttle;
})();

//script for stick scroll elements
(function(sticky)
{
    function stickyCreate(elem, options)
    {
        console.log("creating new stick scroll");
        //container that will become sticky based on its location
        this.el_container = elem;
        //body that will actually scroll
        this.el_body = window;
        this.isSticky = false;
        this.className = "isSticky";

        //add scroll event
        var that = this;
        Moodieio.throttle("scroll","mainOptimizedScroll",this.el_body);
        this.el_body.addEventListener("mainOptimizedScroll", this.update.bind(that));  

    }
    stickyCreate.prototype.update = function()
    {
        console.log("called scroll update");
        var bRect = this.el_container.getBoundingClientRect();
        
        if(this.isSticky)
        {
            //remove class
            if(bRect.top>0)
            {
                //remove isSticky class
                this.el_container.className = this.el_container.className
                    .replace(this.className,'')
                    .replace(/\s+/g, " ");
                this.isSticky = false;
                console.log("class removed");
            }
        } 
        else 
        {
            //add class
            if(bRect.top <=0)
            {
                //add isSticky class
                this.el_container.className += " " + this.className;
                this.isSticky = true;
                console.log("class added");
            }
        }
    }

    //assign the function
    sticky.create = stickyCreate;

})(window.Moodieio.Stickyscroll = window.Moodieio.Stickyscroll || {});

(function(){

    var onLoad = function(){
        //foreach slider init a slider
        console.log("loaded");
        var els_allStickyscroll = document.querySelectorAll("[data-moodieio-stickyscroll]");

        for (var i=0, len = els_allStickyscroll.length; i<len; i++){
            new Moodieio.Stickyscroll.create(els_allStickyscroll[i]);
        }
    }
    window.addEventListener("load", onLoad);
})();