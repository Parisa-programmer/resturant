var device_w=0,device_h=0;
var connection_error="خطا در برقراری ارتباط با سرور";
var slider_number=0;

$(document).ready(function(){
	win_size();


});

function show_menu() {
	$("#panel_blur").fadeIn(300);
	$("#panel_column > div:nth-child(1)").css({opacity:0,display:'block',minHeight:device_h-40,right:'-300px'});
	$("#panel_column > div:nth-child(1)").animate({right:'0px',opacity:1},300);
}
function hide_menu() {
	$("#panel_blur").fadeOut(300);
	$("#panel_column > div:nth-child(1)").animate({right:'-350px',opacity:0},300,function() {
		$("#panel_column > div:nth-child(1)").css({display:'none'});
	});
}
var old_w = 0;
function win_size(number){
	device_w = $(window).outerWidth();
	device_h = $(window).outerHeight();

	$("#account_table").css({height:device_h});
	$("#panel_table").css({height:device_h});

	if(old_w!=device_w) {
		if($("#panel_menu_flag").css('width')=='10px') {
			$("#panel_blur").css({display:'none'});
			$("#panel_column > div:nth-child(1)").css({opacity:1,display:'table-cell',minHeight:'auto',right:'0px'});
		}
		else { //Responsive
			$("#panel_column > div:nth-child(1)").css({opacity:0,display:'none',minHeight:device_h-40,right:'-300px'});
		}
		old_w = device_w;
	}

    if(number<=2) win_size(++number);
	else $("#slider_frame > div:nth-child(1)").css({marginRight:(-(current_slide-1)*device_w)});
}
function get_top_position(id) { return $("#"+id).offset().top; }
function show_loading() { $("#loading").css({display:'table'}); }
function hide_loading() { $("#loading").css({display:'none'}); }
var current_slide = 0;
var slider_tm = '';
function show_slide(num) {
	clearTimeout(slider_tm);
	if(num>slider_number) num=1;
	if(num<=0) num = slider_number;
	current_slide = num;
	$("#slider_control > div").removeClass("selected");
	$("#slider_control > div:nth-child("+num+")").addClass("selected");
	$("#slider_frame > div:nth-child(1)").animate({marginRight:(-(num-1)*device_w)},500);
	slider_tm = setTimeout(function() { show_slide(num+1); },9000);
}
function slide_change(mode) {
	var num = current_slide
	if(mode=='next') num++;
	else num--;
	show_slide(num);
}
var last_top_position = 0;
function show_window(ID) {
	last_top_position = $('html,body').scrollTop();
	$("#window_over_back").fadeIn(300);
	$(ID).fadeIn(100);
	$('body').css({overflowY:'hidden',position:'fixed',left:0,top:-last_top_position,width:'100%',height:'100%',zIndex:9});
}
function hide_window() {
	$("#window_over_back").fadeOut(100);
	$(".window_over").fadeOut(100);
	$('body').css({top:0});
	$('body').css({overflowY:'auto',position:'relative'});
	$('html,body').scrollTop(last_top_position);
}
function show_loading() { $("#loading").css({display:'table'}); }
function hide_loading() { $("#loading").css({display:'none'}); }
var msg_tm = '';
function show_message(mode,message) {
	if(mode=='LOAD') {
	    location.href = message;
	    return 0;
	}
	if(mode=='RELOAD') {
	    location.reload();
	    return 0;
	}
	clearTimeout(msg_tm);
	$("#message_bar").removeClass("true_message").removeClass("false_message");
	if(mode===true || mode==1) $("#message_bar").addClass("true_message");
	else $("#message_bar").addClass("false_message");
	$("#message_bar span").text(message);
	$("#message_bar").stop().css({bottom:0,opacity:0,display:'block'});
	$("#message_bar").animate({bottom:'100px',opacity:1},300);
	msg_tm = setTimeout(function() { hide_message() },5000);
}
function hide_message() {
	$("#message_bar").stop().animate({bottom:'0px',opacity:0},300,function() {
		$("#message_bar").css({display:'none'});
	});
}
function register() {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/register.php",
		data: {
			name:$("#reg_name").val(),
			mobile:$("#reg_mobile").val(),
			pass1:$("#reg_pass1").val(),
			pass2:$("#reg_pass2").val(),
			market:$("#reg_market").val(),
		},
		success:function(result){
			result = JSON.parse(result);
			if(result.status) location.href = main_path+"panel";
			else {
				hide_loading();
				show_message(result.status,result.message);
			}
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function login() {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/login.php",
		data: {
            mobile:$("#log_mobile").val(),
            password:$("#log_pass").val(),
        },
		success:function(result){
			result = JSON.parse(result);
			if(result.status===true) location.href = main_path+"panel";
			else {
				hide_loading();
				show_message(result.status,result.message);
			}
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function logout() {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/logout.php",
		success:function(result){
			result = JSON.parse(result);
			location.href = result.message;
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
var files = new Array(0,0,0,0,0);
function get_file(ele,index) {
	files[index] = ele.files[0];
}
function delete_script(table,id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("table",table);
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/delete.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function category_status(ele,id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("mode",$(ele).val());
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/category_status.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function food_selected(ele,id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("selected",$(ele).val());
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/food_selected.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_slider (id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("image",files[1]);
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_slider.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_category(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("icon",files[1]);
	formdata.append("image_id",image_id);
	formdata.append("name",$("#g1").val());
	formdata.append("en_name",$("#g2").val());
	formdata.append("parent_id",$("#g3").val());
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_category.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_employee(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("username",$("#g1").val());
	formdata.append("password",$("#g2").val());
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_employee.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_food(id) {
	var options = [];
	var items = $(".data_row");
	for(var i=0;i<items.length;i++) {
		options.push({
			'type' : $(items[i]).data("type"),
			'name' : $(items[i]).find(">td:nth-child(2)").text(),
			'price' : $(items[i]).find(">td:nth-child(3)").text(),
		});
	}
	show_loading();
	var formdata = new FormData();
	formdata.append("image",files[1]);
	formdata.append("icon",files[2]);
	formdata.append("image_id",image_id);
	formdata.append("name",$("#g1").val());
	formdata.append("en_name",$("#h1").val());
	formdata.append("price",$("#g2").val());
	formdata.append("enable",$("#g3").val());
	formdata.append("category",$("#g4").val());
	formdata.append("description",$("#g5").val());
	formdata.append("content",$("#g6").val());
	formdata.append("options",JSON.stringify(options));
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_food.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_plan(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("capacity",$("#f1").val());
	formdata.append("image",files[1]);
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_plan.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function verify_reserve(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/verify_reserve.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_table(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("label",$("#f1").val());
	formdata.append("min_capacity",$("#f2").val());
	formdata.append("max_capacity",$("#f3").val());
	formdata.append("price",$("#f4").val());
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_table.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function charge(ele) {
	if($(ele).val()==0) return false;
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/charge.php",
		data: { id:$(ele).val() },
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function select_theme(id) {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/select_theme.php",
		data: { id:id },
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function show_hide_category_foods(category_id) {
	setCookie("view_category",category_id,10);
	$(".addon_row").remove();
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/get_panel_foods.php",
		data: { id:category_id },
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			var items = $(".food_cat_label");
			for(var i=0;i<items.length;i++) {
				var it = items[i];
				if($(it).data('id')==category_id) {
					for(var j=0;j<result.items.length;j++) {
						var dt = result.items[j];
						if(dt.image!="") dt.image = '<div class="td_icon"><img src="'+dt.image+'" /></div>';
						dt_selected0 = (dt.selected=="0")?"selected":'';
						dt_selected1 = (dt.selected=="1")?"selected":'';
						var html =
							'<tr class="addon_row foods_cat'+dt.id+'">'+
								'<td>'+dt.image+' '+dt.name+'</td>'+
								'<td>'+dt.enable+'</td>'+
								'<td>'+
									'<select onchange="food_selected(this,'+dt.id+')">'+
										'<option '+dt_selected1+' value="1">منتخب</option>'+
										'<option '+dt_selected0+' value="0">-</option>'+
									'</select>'+
								'</td>'+
								'<td>'+
									'<input type="number" value="'+dt.order_id+'" class="order_input" onchange="update_order(\'food\',this,'+dt.id+')" />'+
								'</td>'+
								'<td>'+
									'<a href="'+dt.link+'" class="button green_button">ویرایش</a>'+
									'<span onclick="delete_script(\'food\','+dt.id+')" class="button red_button">حذف</span>'+
								'</td>'+
							'</tr>';
						$(it).after(html);
					}
				}
			}
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function save_setting(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("image",files[1]);
	formdata.append("back_image",files[2]);
	formdata.append("back_graphic_image",files[3]);
	formdata.append("t3_header",files[4]);
	formdata.append("default",files[5]);
	formdata.append("name",$("#g0").val());
	formdata.append("about",$("#about").val());
	formdata.append("whatsapp",$("#whatsapp").val());
	formdata.append("color1",$("#g1").val());
	formdata.append("color2",$("#g2").val());
	formdata.append("tcolor1",$("#h1").val());
	formdata.append("tcolor2",$("#h2").val());
	formdata.append("subdomain",$("#g3").val());
	formdata.append("phone",$("#gx1").val());
	formdata.append("address",$("#gx2").val());
	formdata.append("instagram",$("#gx3").val());
	formdata.append("unit",$("#gg1").val());
	formdata.append("back_mode",$("#hx1").val());
	formdata.append("back_graphic_position",$("#hx2").val());
	formdata.append("css",$("#css").val());
	formdata.append("location",selected_location.lat+','+selected_location.lng);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_setting.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_domain(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("domain",$("#g4").val());
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_domain.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_pager() {
	show_loading();
	var formdata = new FormData();
	formdata.append("status",$("#pg1").val());
	formdata.append("sms",$("#pg2").val());
	formdata.append("modes",$("#pg3").val());
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_pager.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_rate() {
	show_loading();
	var formdata = new FormData();
	formdata.append("status",$("#rt1").val());
	formdata.append("questions",$("#rt2").val());
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_rate.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_order_setting(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("pay",$("#j1").val());
	formdata.append("zarin_code",$("#j2").val());
	formdata.append("delivery",$("#j3").val());
	formdata.append("sms",$("#j4").val());
	formdata.append("comment",$("#j5").val());
	formdata.append("tax",$("#j8").val());
	formdata.append("e_start",$("#j10").val());
	formdata.append("e_end",$("#j11").val());
	formdata.append("delivery_cash",$("#j9").val());
	formdata.append("e_get",$("#m1").val());
	formdata.append("e_get_cash",$("#m2").val());
	formdata.append("e_whatsapp",$("#o1").val());
	formdata.append("e_whatsapp_number",$("#o2").val());
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_order_setting.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_reserve_setting() {
	show_loading();
	var formdata = new FormData();
	formdata.append("start",$("#rs1").val());
	formdata.append("end",$("#rs2").val());
	formdata.append("duration",$("#rs3").val());
	formdata.append("main_price",$("#rs4").val());
	formdata.append("per_price",$("#rs5").val());
	formdata.append("deposit_percent",$("#rs6").val());
	formdata.append("zarin_code",$("#rs7").val());
	formdata.append("comment",$("#rs8").val());
	formdata.append("mobile",$("#rs9").val());
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_reserve_setting.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_reserve(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("date",$("#f1").val());
	formdata.append("start_time",$("#f2").val());
	formdata.append("end_time",$("#f3").val());
	formdata.append("capacity",$("#f4").val());
	formdata.append("table_id",$("#f5").val());
	formdata.append("name",$("#f6").val());
	formdata.append("mobile",$("#f7").val());
	formdata.append("price",$("#f8").val());
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_reserve.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_order_status(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("code",$("#f1").val());
	formdata.append("status",$("#f2").val());
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_order_status.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function save_order_pay(id) {
	show_loading();
	var formdata = new FormData();
	formdata.append("id",id);
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_order_pay.php",
		data:formdata,
		processData:false,
		contentType:false,
		success:function(result){
			hide_loading();
			var res = JSON.parse(result);
			show_message(res.status,res.message);
		},
		error:function(){
			hide_loading();
			show_message(0,connection_error);
		}
	});
}
function select_tab(ele,num) {
	$(ele).parents(".tab").find(".selected").removeClass('selected');
	$(ele).parents(".tab").find(">div:nth-child(1) > div:nth-child("+num+")").addClass('selected');
	$(ele).parents(".tab").find(">div:nth-child(2) > div:nth-child("+num+")").addClass('selected');
}
function save_info() {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_info.php",
		data: {
            name:$("#g1").val(),
            sex:$("#g2").val(),
            birthdate:$("#g31").val()+"/"+$("#g32").val()+"/"+$("#g33").val(),
            mobile:$("#g4").val(),
            email:$("#g5").val(),
        },
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function add_delivery_price(ele) {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/add_delivery_price.php",
		data: {
            distance:$(ele).parents("tr").find("td:nth-child(1) input").val(),
            price:$(ele).parents("tr").find("td:nth-child(2) input").val()
        },
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function update_order(mode,ele,id) {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/update_order.php",
		data: {
			mode:mode,
			id:id,
			number:$(ele).val()
        },
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function change_e_enable(ele,id) {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/change_e_enable.php",
		data: {
			id:id,
			status:$(ele).val()
        },
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
var image_id = 0;
function select_image(id,ele) {
    $(".selected_image_item").removeClass("selected_image_item");
    image_id = id;
    hide_window();
    show_message(1,'با موفقیت انتخاب شد');
    $(".select_image").text('انتخاب شده');
    $(ele).addClass("selected_image_item");
}
function delete_image(mode,id) {
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/delete_image.php",
		data: {
		    mode:mode,
		    id:id
        },
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}

function check_orders() {
	$.ajax({
		type:"POST",
		url:main_path+"Script/check_orders.php",
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			if(result.status) {
				var alarm = document.getElementById("alarm");
				alarm.play();
			}
			setTimeout(function() { check_orders(); },30000);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function add_program(ele) {
	if($(ele).parents(".program_add").find(">div:nth-child(1) input").val()=='') {
		show_message(false,'ساعت شروع به درستی انتخاب نشده');
		return false;
	}
	if($(ele).parents(".program_add").find(">div:nth-child(2) input").val()=='') {
		show_message(false,'ساعت پایان به درستی انتخاب نشده');
		return false;
	}
	var txt = $(ele).parents(".program_add").find(">div:nth-child(1) input").val() + "-" +
		$(ele).parents(".program_add").find(">div:nth-child(2) input").val();
	$(ele).parents(".program_add").find(">div:nth-child(1) input").val('');
	$(ele).parents(".program_add").find(">div:nth-child(2) input").val('');
	$(ele).parents("td").prepend('<span class="program_item"><span>'+txt+'</span><i onclick="delete_program(this)"></i></span>')
}
function delete_program(ele) {
	$(ele).parents(".program_item").remove();
}
function save_program() {
	var days = [];
	var day_items = $(".program_days");
	for(var i=0;i<day_items.length;i++) {
		var items = [];
		var temps = $(day_items[i]).find(".program_item > span");
		for(j=0;j<temps.length;j++) {
			items.push($(temps[j]).text());
		}
		days.push(items);
	}
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/save_program.php",
		data: {
			programs:JSON.stringify(days)
		},
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}
function change_user_telegram_access(ele,id) {
	var access = [];
	var items = $(ele).parents(".telegram_access_row").find("input:checked");
	for(var i=0;i<items.length;i++) {
		access.push($(items[i]).val());
	}
	show_loading();
	$.ajax({
		type:"POST",
		url:main_path+"Script/change_user_telegram_access.php",
		data: {
			id:id,
			access:access.join(",")
		},
		success:function(result){
			result = JSON.parse(result);
			hide_loading();
			show_message(result.status,result.message);
		},
		error:function(){
			hide_loading();
			show_message(false,connection_error);
		}
	});
}