function add_note_button() {
    var items = $(".food_bx");
    for(var i=0;i<items.length;i++) {
        var it = items[i];
        $(it).find(">div:nth-child(2)").remove();
        if($(it).data('hasoption')==true || $(it).data('hasoption')=="true")
            $(it).append('<div><span onclick="get_food_options(this,'+$(it).data('id')+')" data-id="">'+note_button_name+'</span></div>');
        else $(it).append('<div><span onclick="add_note(this)">'+note_button_name+'</span></div>');
    }
}
function add_t8_note_button() {
    var items = $(".food_bx");
    for(var i=0;i<items.length;i++) {
        var it = items[i];
        if($(it).data('hasoption')==true || $(it).data('hasoption')=="true")
            $(it).empty().append('<span onclick="get_food_options(this,'+$(it).data('id')+')">+</span>');
        else
            $(it).empty().append('<span onclick="add_note(this)">+</span>');
    }
}
var notes = new Array();
function add_note(ele) {
    var number = 1;
    var deleted_index = -1;
    for(var i=0;i<notes.length;i++) {
        if(notes[i].id==$(ele).parents(".food_bx").data("id")) {
            number = notes[i].number + 1;
            deleted_index = i;
            break;
        }
    }

    if(deleted_index>=0) notes.splice(deleted_index,1);
    var new_note = {
        id: $(ele).parents(".food_bx").data("id"),
        name: $(ele).parents(".food_bx").data("name"),
        subname:"",
        image: $(ele).parents(".food_bx").data("image"),
        price: $(ele).parents(".food_bx").data("price"),
        number: number,
        options:[]
    };
    notes.push(new_note);
    update_notes();
}

var food_option = [];
function get_food_options(ele,id) {
    food_option = {
        id: $(ele).parents(".food_bx").data("id")+"_"+Date.now(),
        name: $(ele).parents(".food_bx").data("name"),
        subname:"",
        image: $(ele).parents(".food_bx").data("image"),
        price: $(ele).parents(".food_bx").data("price"),
        number:1,
        options:[]
    };
    show_loading();
    $.ajax({
        type:"POST",
        url:main_path+"Script/get_food_options.php",
        data: { id:id },
        success:function(result){
            hide_loading();
            result = JSON.parse(result);
            if(result.status) {
                $("#option_window > div:nth-child(2)").empty();
                for(var i=0;i<result.items.length;i++) {
                    var it = result.items[i];
                    if(it.type=="change") {
                        food_option.price = 0;
                        var input = '<input type="radio" data-price="'+it.price+'" checked name="param" value="'+it.id+'" />';
                    }
                    if(it.type=="increase") var input = '<input type="checkbox" data-price="'+it.price+'" value="'+it.id+'" />';
                    $("#option_window > div:nth-child(2)").append('<label class="option_item">'+input+'<span class="option_itam_label">'+it.name+'</span><span>'+it.price+' '+price_unit+'</span></label>');
                }
                $("#option_window > div:nth-child(2)").append('<div id="option_add_note" onclick="change_note_options()"><span>افزودن به یادداشت</span></div>');
                $("#t1_options").css({display:'table'});
            }
            else show_message(result.status,result.message);
        },
        error:function(){
            hide_loading();
            show_message(false,connection_error);
        }
    });
}
function change_note_options() {
    var sum_price = 0;
    var selected = [];
    var items = $(".option_item input:checked");
    var selected_options = [];
    for(var i=0;i<items.length;i++) {
        selected_options.push($(items[i]).parents(".option_item").find(".option_itam_label").text());
        selected.push($(items[i]).val());
        sum_price = sum_price + parseInt($(items[i]).data('price'));
    }
    food_option.options = selected;
    food_option.price = sum_price;
    food_option.subname = selected_options.join("+");
    $("#t1_options").css({display:'none'});
    notes.push(food_option);
    update_notes();
}
function update_notes() {
    $("#note_window > div:nth-child(1) > div:nth-child(2)").empty();
    if(notes.length>0) {
        $("#note_button").fadeIn(100);
        var number = 0;
        var sum = 0;
        for(var i=0;i<notes.length;i++) {
            number = number + notes[i].number;
            sum = sum + (notes[i].number*notes[i].price);
            var sbname = (notes[i].subname=="")?"":" ("+notes[i].subname+")";
            $("#note_window > div:nth-child(1) > div:nth-child(2)").append(
                '<div class="note_item tbl">'+
                    '<div><img src="'+notes[i].image+'" /></div>'+
                    '<div>'+
                        '<div>'+notes[i].name+''+sbname+'</div>'+
                        '<div>'+notes[i].price+' '+price_unit+'</div>'+
                        '<div>'+
                            '<i onclick="order_change_number(\''+notes[i].id+'\',1)"></i>'+
                            '<span>'+notes[i].number+'</span>'+
                            '<i onclick="order_change_number(\''+notes[i].id+'\',0)"></i>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );
        }
        $("#note_window > div:nth-child(1) > div:nth-child(2)").append(
            '<div id="note_sum">مجموع : '+sum+' '+price_unit+'</div>'
        );
        price.order = sum;
        $("#order_factor1 > div:nth-child(1) > span:nth-child(2)").text(sum+' '+price_unit);
        var tax = Math.floor(tax_percent * sum / 100);
        $("#order_factor1 > div:nth-child(2) > span:nth-child(2)").text(tax+' '+price_unit);
        $("#order_factor1 > div:nth-child(3) > span:nth-child(2)").text((sum+tax)+' '+price_unit);
        $("#order_factor2 > div:nth-child(1) > span:nth-child(2)").text(sum+' '+price_unit);
        $(".notes_number").text(number);
    }
    else {
        $("#note_button").fadeOut(100);
    }
}
var price = { order:0 , post:0 };
function order_change_number(id,mode) {
    var new_notes = new Array();
    for(var i=0;i<notes.length;i++) {
        if(notes[i].id==id) {
            if(mode==1) notes[i].number = notes[i].number+1;
            else notes[i].number = notes[i].number - 1;
        }
        if(notes[i].number>0) {
            new_notes.push(notes[i]);
        }
    }
    notes = new_notes;
    update_notes();
}
function hide_notes() {
    $("#note_window").animate({top:'150%'},300);
}
function show_notes() {
    $("#note_window").animate({top:0},300);
    $("#note_window > div").css({display:'none'});
    $("#note_window > div:nth-child(1)").css({display:'block'});
}
function get_menu_screen() {
    $('#note_window').animate({scrollTop:0},0);
    html2canvas(document.querySelector("#note_items")).then(canvas => {
        var link = document.createElement('a');
        link.className = "hide_links";
        link.download = 'Menu_Screenshot.png';
        link.href = canvas.toDataURL()
        link.click();
    });
}
function order1() {
    $("#note_window > div").css({display:'none'});
    $("#note_window > div:nth-child(1)").css({display:'block'});
}
function order2() {
    $("#note_window > div").css({display:'none'});
    $("#note_window > div:nth-child(2)").css({display:'block'});
}
function order3() {
    $("#note_window > div").css({display:'none'});
    $("#note_window > div:nth-child(3)").css({display:'block'});
}
var rest_location = {lat:0,lng:0};
function order4(id,distance) {
    rest_location = selected_location;
    $("#note_window > div").css({display:'none'});
    $("#note_window > div:nth-child(4)").css({display:'block'});
    var mymap = L.map('mapid').setView([selected_location.lat,selected_location.lng], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    var circle = L.circle([rest_location.lat, rest_location.lng], {
        color: '#2cb816',
        fillColor: '#2cb816',
        fillOpacity: 0.2,
        radius: distance*1000
    }).addTo(mymap);
    setTimeout(function() { mymap.invalidateSize(); } , 2000);
    mymap.on("moveend",function(e){
        mymap.invalidateSize();
        var chagedPos = mymap.getCenter();
        selected_location.lat = chagedPos.lat;
        selected_location.lng = chagedPos.lng;
        get_delivery_price(id,chagedPos.lat,chagedPos.lng);
    });
}
function save_order1(id) {
    show_loading();
    $.ajax({
        type:"POST",
        url:main_path+"Script/save_order.php",
        data: {
            id:id,
            mode:'get',
            name:$("#or1-name").val(),
            mobile:$("#or1-mobile").val(),
            desk:$("#or1-desk").val(),
            type:$("#or1-type").val(),
            comment:$("#or1-comment").val(),
            notes:JSON.stringify(notes),
            pay_mode:$("#or1-payment input:checked").val()
        },
        success:function(result){
            hide_loading();
            result = JSON.parse(result);
            show_message(result.status,result.message);
            if(result.status===1) {
                notes = new Array();
                hide_notes();
            }
        },
        error:function(){
            hide_loading();
            show_message(false,connection_error);
        }
    });
}
function save_order2(id) {
    show_loading();
    $.ajax({
        type:"POST",
        url:main_path+"Script/save_order.php",
        data: {
            id:id,
            mode:'delivery',
            name:$("#or2-name").val(),
            mobile:$("#or2-mobile").val(),
            comment:$("#or2-comment").val(),
            address:$("#or2-address").val(),
            location:selected_location.lat+","+selected_location.lng,
            notes:JSON.stringify(notes),
            pay_mode:$("#or2-payment input:checked").val()
        },
        success:function(result){
            hide_loading();
            result = JSON.parse(result);
            show_message(result.status,result.message);
            if(result.status===1) {
                notes = new Array();
                hide_notes();
            }
        },
        error:function(){
            hide_loading();
            show_message(false,connection_error);
        }
    });
}
function get_delivery_price(id,lat,lng) {
    show_loading();
    $.ajax({
        type:"POST",
        url:main_path+"Script/get_delivery_price.php",
        data: {
            id:id,
            lat:lat,
            lng:lng
        },
        success:function(result){
            hide_loading();
            result = JSON.parse(result);
            if(result.status) {
                $("#delivery_button").css({display:'block'});
                price.post = result.price;
                $("#order_factor2 > div:nth-child(1) > span:nth-child(2)").text(price.order + ' ' + price_unit);
                $("#order_factor2 > div:nth-child(2) > span:nth-child(2)").text(price.post + ' ' + price_unit);
                var tax = Math.floor(tax_percent/100*(parseInt(price.order) + parseInt(price.post)));
                $("#order_factor2 > div:nth-child(3) > span:nth-child(2)").text(tax + ' ' + price_unit);
                end_price = parseInt(price.order) + parseInt(price.post) + tax;
                $("#order_factor2 > div:nth-child(4) > span:nth-child(2)").text(end_price + ' ' + price_unit);
            }
            else {
                $("#delivery_button").css({display:'none'});
                $("#order_factor2 > div:nth-child(2) > span:nth-child(2)").text('');
                $("#order_factor2 > div:nth-child(3) > span:nth-child(2)").text('');
                $("#order_factor2 > div:nth-child(4) > span:nth-child(2)").text('');

                show_message(result.status,result.message);
            }
        },
        error:function(){
            hide_loading();
            show_message(false,connection_error);
        }
    });
}