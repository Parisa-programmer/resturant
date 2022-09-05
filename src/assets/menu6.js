var states = new Array();

function update_graphic() {
    if($("#graphic").hasClass("graphic_pos5") || $("#graphic").hasClass("graphic_pos6")) {
        $("#graphic").css({width:'100%',height:'auto'});
    }
    else {
        device_w = parseInt($(window).outerWidth()) / 2;
        device_h = parseInt($(window).outerHeight()) / 2;
        var gsize = device_h;
        if (device_w <= device_h) gsize = device_w;
        $("#graphic").css({width: gsize, height: gsize});
    }
}

var section_positions = new Array();
$(document).ready(function() {

    window.addEventListener('popstate', function(event) {
        var last_state = states.pop();
        last_state = states.pop();
        var arr = window.location.href.split("#Sec");
        if(arr.length==2) show_t6_category(arr[1]);
        else show_t6_category(0);
    });

    $("#m6_food_holder").scroll(function() {
        var scroll_pos = $('#m6_food_holder').scrollTop();
        var items = $(".m6_title");
        section_positions = new Array();
        for(var i=0;i<items.length;i++) {
            section_positions.push(scroll_pos+get_top_position('section_'+(i+1))-10);
        }

        $(".m6_cat").removeClass("m6_cat_checked");
        for(var i=section_positions.length-1;i>=0;i--) {
            if(scroll_pos>=section_positions[i]) {
                $("#menu_"+(i+1)).addClass("m6_cat_checked");
                break;
            }
        }
    });
});
var price_unit = '';
function show_t6_category(id) {
    if(id==0) {
        $("#m6_food_holder > div").empty();
        $("#m6_main_menu").fadeIn(500);
        $("#m6_menu").animate({left:'-110px'},300);
        var state = { id:0 , mode:"category" };
        var url = '#Main';
        states.push(state);
        history.pushState(null,'',url);
        return false;
    }
    $.ajax({
        type:"POST",
        url:main_path+"Script/get_categories_items.php",
        data: { id:id },
        success:function(result){
            result = JSON.parse(result);
            if(result.status) {
                $("#m6_main_menu").fadeOut(300);
                $("#m6_menu").animate({left:'0px'},300);
                $('html,body').animate({scrollTop:0},0);
                var state = { id:id , mode:"category" };
                var url = '#Sec'+id;
                states.push(state);
                history.pushState(null,'',url);
                $("#m6_menu").empty();
                $("#m6_menu").append(
                    '<div class="m6_cat" onclick="show_t6_category(0)">'+back_name+'</div>'
                );
                for(var i=0;i<result.items.length;i++) {
                    $("#m6_menu").append(
                        '<div class="m6_cat" id="menu_'+(i+1)+'" onclick="scroll_to_foods('+(i+1)+')">'+
                            '<img src="'+result.items[i].icon+'" />'+
                            '<span>'+result.items[i].name+'</span>'+
                        '</div>'
                    );

                    var foods = '<div class="m6_title" id="section_'+(i+1)+'" data-index="'+(i+1)+'">';
                    foods = foods + '<div class="food_label">'+result.items[i].name+'</div>';
                    for(var j=0;j<result.items[i].items.length;j++) {
                        var it = result.items[i].items[j];
                        en_name = '';
                        if(it.en_name!='') en_name = ' | '+it.en_name;
                        var it_image = ((it.image=='')?(main_path+'Temp/null_food.jpeg'):it.image);
                        price_unit = it.price_unit;

                        var add_class = "";
                        if(it.e_enable==1) add_class = "food_bx";
                        foods = foods +
                            '<div class="m6_food '+add_class+'" data-hasoption="'+it.has_option+'" data-id="'+it.id+'" data-image="'+it_image+'" data-price="'+it.price_number+'" data-name="'+it.name+'">'+
                                '<div onclick="get_food_detail('+it.id+')">'+
                                    '<div><img src="'+it_image+'" /></div>'+
                                    '<div>'+
                                        '<div>'+it.name+''+en_name+'</div>'+
                                        '<div>'+it.description+'</div>'+
                                        '<div>'+it.price+'</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                    }
                    foods = foods + '</div>';
                    $("#m6_food_holder > div").append(foods);
                    add_note_button();
                }
            }
            else show_message(result.status,result.message);
        },
        error:function(){
            show_message(false,connection_error);
        }
    });
}
function scroll_to_foods(num) {
    $('#m6_food_holder').css({scrollTop: pos});
    var pos = get_top_position('section_'+num);
    pos = $('#m6_food_holder').scrollTop()+pos-10;
    $('#m6_food_holder').animate({scrollTop: pos}, 300);
}
function get_top_position(id) { return $("#"+id).offset().top; }
function get_food_detail(id) {
    show_loading();
    $.ajax({
        type:"POST",
        url:main_path+"Script/get_food.php",
        data: { id:id },
        success:function(result){
            hide_loading();
            result = JSON.parse(result);
            if(result.status) {
                $("#detail_window > div:nth-child(1) > div:nth-child(1)").text(result.info.name);
                $("#detail_window > div:nth-child(2)").empty();
                if(result.info.image!='') $("#detail_window > div:nth-child(2)").append('<img src="' + result.info.image + '" />');
                $("#detail_window > div:nth-child(2)").append(result.info.content);
                $("#t1_detail").css({display:'table'});
            }
        },
        error:function(){
            hide_loading();
            show_message(false,connection_error);
        }
    });
}
function close_t1_detail() {
    $("#t1_detail").css({display:'none'});
}

function close_t1_option() {
    $("#t1_options").css({display:'none'});
}
