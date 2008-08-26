// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

 // 
 // handle: '.slider_handle', 
 // minValue: 0, 
 // 
 // maxValue: 25, 
 // start: function(e, ui) { 
 //     $('#slider_callout').fadeIn('fast', function() { calloutVisible = true;}); 
 // }, 
 // stop: function(e, ui) { 
 //     if (calloutVisible == false) { 
 //         $('#slider_callout').fadeIn('fast', function() { calloutVisible = true;}); 
 //         $('#slider_callout').css('left', ui.handle.css('left')).text(Math.round(ui.value)); 
 //     } 
 //     $('#slider_callout').fadeOut('fast', function() { calloutVisible = false; }); 
 // }, 
 // slide: function(e, ui) { 
 //     $('#slider_callout').css('left', ui.handle.css('left')).text(Math.round(ui.value)); 
 // }
 // 		
// $("a").click(function() {
// 	alert("Hello world!");
// });

var RESPONSE = '';

$(document).ready(function() {
	var max_value = $('#slider_max_value').val();
	var start_value = $('#slider_hidden_value').val();
	$("#slider_widget").slider({ 
		min:0, 
		max: max_value,
		startValue: start_value,
		slide:function(e,ui){ 
			switch(ui.value)
			{
				case 0:
					$('#slider_status').html("Off");
					$('#slider_value').html("");
					break;
				default:
					$('#slider_status').html("On");
					$('#slider_value').html(Math.round(ui.value) + " records");
			}
		}, 
		stop:function (e,ui){ 
			$('#slider_hidden_value').val(Math.round(ui.value)); 
		} 
	});
	
	$('#slider_widget').slider("moveTo", start_value);
	
	$('#mytable').tablesorter(); 
	
	
   var options = { 
       target:        '#the_div',   // target element(s) to be updated with server response 
       beforeSubmit:  showRequest,  // pre-submit callback 
       success:       showResponse,  // post-submit callback 
       dataType:  		'json'        // 'xml', 'script', or 'json' (expected server response type) 

       // other available options: 
       //url:       url         // override for form's 'action' attribute 
       //type:      type        // 'get' or 'post', override for form's 'method' attribute 
       //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
       //clearForm: true        // clear all form fields after successful submit 
       //resetForm: true        // reset the form after successful submit 

       // $.ajax options can be used here too, for example: 
       //timeout:   3000 
   }; 

   // bind form using 'ajaxForm' 
   $('#the_form').ajaxForm(options); 

	// pre-submit callback 
	function showRequest(formData, jqForm, options) { 
	    // formData is an array; here we use $.param to convert it to a string to display it 
	    // but the form plugin does this for you automatically when it submits the data 
	    var queryString = $.param(formData); 

	    // jqForm is a jQuery object encapsulating the form element.  To access the 
	    // DOM element for the form do this: 
	    // var formElement = jqForm[0]; 

	    alert('About to submit: \n\n' + queryString); 

	    // here we could return false to prevent the form from being submitted; 
	    // returning anything other than false will allow the form submit to continue 
	    return true; 
	} 

	// post-submit callback 
	function showResponse( responseJson, statusText )  { 
	    // for normal html responses, the first argument to the success callback 
	    // is the XMLHttpRequest object's responseText property 

	    // if the ajaxForm method was passed an Options Object with the dataType 
	    // property set to 'xml' then the first argument to the success callback 
	    // is the XMLHttpRequest object's responseXML property 

	    // if the ajaxForm method was passed an Options Object with the dataType 
	    // property set to 'json' then the first argument to the success callback 
	    // is the json data object returned by the server 

	    //alert('status: ' + statusText + '\n\nresponseText: \n' + responseText + 
	    //    '\n\nThe output div should have already been updated with the responseText.'); 
	    for (var i = 0; i < responseJson.length; i++) {
	      var tr = ViewGenerator.makeTableRow( responseJson[i].post );
  	    $( 'table#mytable > tbody' ).append( tr );
	    }
	}
	
	$.ajaxSetup({ 'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")} })
});

var ViewGenerator = {

  makeTableRow: function( data ) {
    html =  "<tr>\n";
    html += "  <td>" + data.title + "</td>\n";
    html += "  <td>" + data.body + "</td>\n";
    html += "  <td>" + data.comments_count + "</td>\n";
    html += "  <td><a href='/posts/" + data.id + "'>Show</a></td>\n";
    html += "  <td><a href='/posts/" + data.id + "/edit'>Edit</a></td>\n";
    html += "  <td><a href='/posts/" + data.id + "' onclick=\"if (confirm('Are you sure?')) { var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var m = document.createElement('input'); m.setAttribute('type', 'hidden'); m.setAttribute('name', '_method'); m.setAttribute('value', 'delete'); f.appendChild(m);var s = document.createElement('input'); s.setAttribute('type', 'hidden'); s.setAttribute('name', 'authenticity_token'); s.setAttribute('value', '8b009c42619d401adf82aa0ecca904a393f88fec'); f.appendChild(s);f.submit(); };return false;\">Destroy</a></td>\n";
    html += "</tr>";
    return $( html );
  }
  
}
