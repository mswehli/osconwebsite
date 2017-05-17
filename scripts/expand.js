var Moodieio = Moodieio || {};

Moodieio.Expand = function(eId,eNum)
{
    console.log("expanding: " + eId);
    //google analytics event if available
   if(typeof(ga)!== 'undefined' && ga!==null){
       ga('send','event','Site','menu-expand');
   }
    var el = document.getElementsByClassName(eId);

    if(eNum == undefined){

        for(i=0;i<el.length;i++){ Expand_apply(i); }
        
    }else{ Expand_apply(eNum); }

    function Expand_apply (x){

         if(el[x]!==null){
                if(el[x].className.indexOf('expanded')!==-1)
                {
                    el[x].className = el[x].className.replace(' expanded','');
                } else {
                    el[x].className = el[x].className + " expanded"
                }
                console.dir(el[x]);
            }
    }


}