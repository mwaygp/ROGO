$(document).ready(function() {
 
	var Arrays=new Array();
 
	$('.add-to-cart-button').click(function(){
 
		var thisID 	  = $(this).parent().parent().attr('id').replace('detail-','');
 
		var itemname  = $(this).parent().find('.item_name').html();
		var itemprice = $(this).parent().find('.price').html();
 
		if(include(Arrays,thisID))
		{
			var price 	 = $('#each-'+thisID).children(".shopp-price").find('em').html();
			var quantity = $('#each-'+thisID).children(".shopp-quantity").html();
			quantity = parseInt(quantity)+parseInt(1);
 
			var total = parseInt(itemprice)*parseInt(quantity);
 
			$('#each-'+thisID).children(".shopp-price").find('em').html(total);
			$('#each-'+thisID).children(".shopp-quantity").html(quantity);
 
			var prev_charges = $('.cart-total span').html();
			prev_charges = parseInt(prev_charges)-parseInt(price);
 
			prev_charges = parseInt(prev_charges)+parseInt(total);
			$('.cart-total span').html(prev_charges);
 
			$('#total-hidden-charges').val(prev_charges);
		}
		else
		{
			Arrays.push(thisID);
 
			var prev_charges = $('.cart-total span').html();
			prev_charges = parseInt(prev_charges)+parseInt(itemprice);
 
			$('.cart-total span').html(prev_charges);
			$('#total-hidden-charges').val(prev_charges);
 
			var Height = $('#cart_wrapper').height();
			$('#cart_wrapper').css({height:Height+parseInt(45)});
 
			$('#cart_wrapper .cart-info').append('
                <div id="each-'+thisID+'" class="shopp">
                <div class="label">'+itemname+'</div>
                <div class="shopp-price"> $<em>'+itemprice+'</em></div>
                <span class="shopp-quantity">1</span><img class="remove" src="remove.png" alt="" /><br class="all" /></div>
                ');
		}
 
	});	
 
	$('.remove').livequery('click', function() {
 
		var deduct = $(this).parent().children(".shopp-price").find('em').html();
		var prev_charges = $('.cart-total span').html();
 
		var thisID = $(this).parent().attr('id').replace('each-','');
 
		var pos = getpos(Arrays,thisID);
		Arrays.splice(pos,1,"0")
 
		prev_charges = parseInt(prev_charges)-parseInt(deduct);
		$('.cart-total span').html(prev_charges);
		$('#total-hidden-charges').val(prev_charges);
		$(this).parent().remove();
 
	});	
 
	$('#Submit').livequery('click', function() {
 
		var totalCharge = $('#total-hidden-charges').val();
 
		$('#cart_wrapper').html('Total Charges: $'+totalCharge);
 
		return false;
 
	});	
 
function include(arr, obj) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] == obj) return true;
  }
}
 
function getpos(arr, obj) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] == obj) return i;
  }
}
 
</script>