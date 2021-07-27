
$(document).ready(function() {

    diary('head', '5');
    diary('necklace', '97');
    diary('cape', '95');
    diary('banner', '99');
    diary('sword', '170');
    diary('body', '172');
    diary('shield', '174');
    diary('legs', '237');
    diary('boots', '249');
    diary('gloves', '248');
    diary('ring', '250');

    function diary(placeholder, number){
        $("#diary-"+placeholder+"-1").on("click", function() {

            //$("#diary-"+placeholder+"-1 img").attr("src",$("#diary-"+placeholder+"-2").find("img").attr("src"));
            localStorage.setItem("diary-"+placeholder+"-2", "diary-"+placeholder+"-2");
            localStorage.removeItem("diary-"+placeholder+"-1");
            $("#diary-"+placeholder+"-1").addClass("none-important");    
            $("#diary-"+placeholder+"-2").addClass("active");  
            $("#diary-"+placeholder+"-1").removeClass("active");  
            $("#diary-"+placeholder+"-1").removeClass("none-important");  

        });

        $("#diary-"+placeholder+"-2").on("click", function() {

            //$("#diary-"+placeholder+"-2 img").attr("src",$("#diary-"+placeholder+"-3").find("img").attr("src"));
            localStorage.setItem("diary-"+placeholder+"-3", "diary-"+placeholder+"-3");
            localStorage.removeItem("diary-"+placeholder+"-2");
            $("#diary-"+placeholder+"-2").addClass("none-important");    
            $("#diary-"+placeholder+"-3").addClass("active");  
            $("#diary-"+placeholder+"-2").removeClass("active");  
            $("#diary-"+placeholder+"-2").removeClass("none-important"); 
        });

        $("#diary-"+placeholder+"-3").on("click", function() {

            //$("#diary-"+placeholder+"-3 img").attr("src",$("#diary-"+placeholder+"-4").find("img").attr("src"));
            localStorage.setItem("diary-"+placeholder+"-4", "diary-"+placeholder+"-4");
            localStorage.removeItem("diary-"+placeholder+"-3");
            $("#diary-"+placeholder+"-3").addClass("none-important");    
            $("#diary-"+placeholder+"-4").addClass("active");  
            $("#diary-"+placeholder+"-3").removeClass("active");  
            $("#diary-"+placeholder+"-3").removeClass("none-important"); 

        });

        $("#diary-"+placeholder+"-4").on("click", function() {
            
            $("#diary-"+placeholder+"-4").addClass("none-important");
            $("#diary-"+placeholder+"-4").removeClass("active");  
            $("#diary-"+placeholder+"-4").removeClass("none-important"); 

            localStorage.removeItem("diary-"+placeholder+"-4");
        });

        $("#image"+number).on("click", function() {   
            console.log('test');
            $("#diary-"+placeholder+"-1").addClass("active");    
            localStorage.setItem("diary-"+placeholder+"-1", "diary-"+placeholder+"-1");
           
        });

    }


//check of duplicatees in clue page
/*var a = [];
$('#clues_page .item').each(function(index, element){
    var id = $(this).prop('id');
    

    a.push(id);

}); 

var recipientsArray = a.sort(); 
var reportRecipientsDuplicate = [];
for (var i = 0; i < recipientsArray.length - 1; i++) {
    if (recipientsArray[i + 1] == recipientsArray[i]) {
        
        
        parent_id = $('#'+recipientsArray[i]).parent().parent().attr('id');

        reportRecipientsDuplicate.push(recipientsArray[i]);
    }
}
console.log(reportRecipientsDuplicate);
*/

    // fix a bug that we had a while ago which is causing problems now with new jQuery version
    delete localStorage[""];

    for (var i = 0; i < localStorage.length; i++){
        $("#" + localStorage.getItem(localStorage.key(i))).addClass("active");
    }
    $('.item').on("click", function() {
        if($(this).hasClass('active')) {
            $("#" + $(this).prop('id')).removeClass("active");   
            localStorage.removeItem($(this).prop('id'));
        }
         else {
            $("#" + $(this).prop('id')).addClass("active");    
            localStorage.setItem($(this).prop('id'), $(this).prop('id'));
        }


      
    });




    //osrsName = localStorage.getItem('osrsName') || '';
    if (!localStorage.getItem('osrsName')) {
        localStorage.setItem('osrsName', '');
        $('.smallBox input').addClass('input-background');
    }
    else
    {
        $('.osrsName input').val(localStorage.getItem('osrsName'));
        $('.smallBox input').removeClass('input-background');
    }
    clues('image266', '#resultEasyClue', 'easy-clues');
    clues('image238', '#resultMediumClue', 'medium-clues');
    clues('image195', '#resultHardClue', 'hard-clues');
    clues('image126', '#resultEliteClue', 'elite-clues');
    clues('image25', '#resultMasterClue', 'master-clues');


    function clues(imageID, restultID, clueValue)
    {

        if (localStorage.getItem(clueValue) == null) {
            localStorage.setItem(clueValue, 0);
            var i = 0;
        }
        else
        {
            
            getCounterCookie = parseInt(localStorage.getItem(clueValue));
            var i = getCounterCookie;
            localStorage.setItem(clueValue, i);

            if (localStorage.getItem(clueValue) == 0) {
                $("#"+imageID).addClass("item-clue-important");

            }
            else
            {
                $(restultID).html(getCounterCookie);
            }

            //$("#"+imageID).addClass("active");
        }

        
        


        $("#"+imageID+" img").on('click', function(e) {

            $("#"+imageID).addClass("active");
            

            if (e.shiftKey) {
                i+=10;
            } 
            else
            {
                i++;
            }
            

            if (localStorage.getItem(clueValue) !== null) {
                $("#"+imageID).removeClass("item-clue-important");
                $(restultID).html(i);
                localStorage.setItem(clueValue, i);
                localStorage.setItem(imageID, imageID);
            }
            
        
            

            if (localStorage.getItem('easy-clues') >= 500) {
                $('#easy-clue-reward').addClass('active');
            }
            if (localStorage.getItem('medium-clues') >= 400) {
                $('#medium-clue-reward').addClass('active');
            }
            if (localStorage.getItem('hard-clues') >= 300) {
                $('#hard-clue-reward').addClass('active');
            }
            if (localStorage.getItem('elite-clues') >= 200) {
                $('#elite-clue-reward').addClass('active');
            }
            
            
        });
            
        $(restultID).on('click', function(e) {
            
            if(i > 0)
            {
                
                if (e.shiftKey) {
                    if (i > 9) {
                        i-=10;
                        console.log(i);
                    }
                    
                }
                else
                {
                    i--;
                }
            }
            if (i == 0) {
                $("#"+imageID).removeClass("active");
                $(restultID).html('');
                localStorage.setItem(clueValue, i);
                console.log('test');
            }
            else
            {
                $(restultID).html(i);
                localStorage.setItem(clueValue, i);
            }
            console.log(i);
            if (localStorage.getItem('easy-clues') < 500) {
                $('#easy-clue-reward').removeClass('active');
            }
            if (localStorage.getItem('medium-clues') < 400) {
                $('#medium-clue-reward').removeClass('active');
            }
            if (localStorage.getItem('hard-clues') < 300) {
                $('#hard-clue-reward').removeClass('active');
            }
            if (localStorage.getItem('elite-clues') < 200) {
                $('#elite-clue-reward').removeClass('active');
            }
            
            

            
        });
    }

    if (localStorage.getItem('easy-clues') >= 500) {
        $('#easy-clue-reward').addClass('active');
    }
    if (localStorage.getItem('medium-clues') >= 400) {
        $('#medium-clue-reward').addClass('active');
    }
    if (localStorage.getItem('hard-clues') >= 300) {
        $('#hard-clue-reward').addClass('active');
    }
    if (localStorage.getItem('elite-clues') >= 200) {
        $('#elite-clue-reward').addClass('active');
    }

    // INPUT NAME //
    $('.osrsName input').change(function() {
        osrsName = this.value.trim();
        this.value = osrsName;
        localStorage.setItem('osrsName',osrsName);
      });


    // ------------ SAVE IMAGE -------------- \\
    $("#screenshot").on( "click", function() {
        console.log('rest');
        // html2canvas(document.querySelector("#Table_01"), {width: 1150, height: 690, x: 15, y: 15}).then(canvas => {

          html2canvas(document.querySelector("#Table_01"), {windowWidth: 1182, windowHeight:755, width: 1330, height: 767}).then(canvas => {


            //console.log(canvas);
            //document.body.appendChild(canvas);
            
            var can = canvas;
            var ctx = can.getContext('2d');

            var img = new Image();
            img.src = can.toDataURL();

            $('#capture-parent').append('<img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=" class="css-1htfbdm">');
            //$('#capture-parent').append('<div id="capture"></div>');

            $('html, body').animate({scrollTop:0});

            $('html, body').css({
                overflow: 'hidden',
                height: '100%'
            });

            $('#capture-parent').addClass('active-capture');
            $('#capture-parent').append(canvas).fadeIn(1000);

            
            //$('meta[property="og:image"]').attr('content', 'http://cleanmountains.nl/images/background.jpg' );
            //$('#capture').append(img);


        });
    });



    $(document).on('click', '#capture-parent img', function(){

        $( "#capture-parent" ).removeClass('active-capture');
        $( "#capture-parent img" ).remove();
        $( "#capture-parent canvas" ).remove();
        $('html, body').css({
            overflow: 'auto',
            height: 'auto'
        });
    });
});
