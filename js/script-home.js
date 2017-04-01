$(function() {
  /* Sends to API Tarla the device and action */

  $( "form" ).submit(function( event ) {
  if ( $( "input:first" ).val() === "correct" ) {
    $( "span" ).text( "Validated..." ).show();
    return;
  }

  $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
  event.preventDefault();
});
  /* Get modules from json and lists them */
  $.getJSON( "http://tarla.hackathongi.cat/devices", function( data ) {
    var devices = [];
    var name_devices = [];
    var actions = [];
    var param = [];
    var param_name = [];
    var count = 0;
    $.each( data, function( i, object) {
      devices.push([]);
      actions.push([]);
      param.push([]);
      param_name.push([]);
      name_devices[count] = i;
      var device_name = i;
      devices[count].push("<div class=\"col-md-3\">\n<div class=\"module-button\">\n<div class=\"col-md-12\">\n<h3>"+i+"</h3>\n<a href=\"modules/"+i+".html\"><img class=\"img-responsive module-img\" src=\"img/"+i+".png\"/></a>\n<div class=\"cmds\">\n<div class=\"col-md-12\"><h4>Actions</h4>\n<div class=\"buttons-"+count+"\"></div></div>\n</div>\n<a class=\"btn btn-primary\" href=\"modules/"+i+".html\">More info</a></div>\n</div></div>");
      $.each( object.actions, function( i, object) {
        actions[count].push("<button class=\"btn btn-primary action\" data-action=\""+i+"\" data-device=\""+device_name+"\">"+i+"</button>");;
        $.each(object.parameters, function(i, object){
          param[count].push(object);
          param_name[count].push(i);
        })
      });
      count++;
    });
    $( "<div>", {
      "class": "my-new-list",
      html: devices.join( "" )
    }).appendTo( "#list-modules" );

    for (var i = 0; i < devices.length; i++) {
      $( "<div>", {
        "class": "my-new-list",
        html: actions[i].join( "" )
      }).appendTo( ".buttons-"+i);
    }
    $('.action').click(function() {
      var btn = $(this);
      var action = btn.data('action');
      var device = btn.data('device');
      var parameters = [];
      var parameters_name = [];

      for (var i = 0; i < name_devices.length; i++) {
        if (name_devices[i] === device) {
          console.log(device);
          for (var j = 0; j < param[i].length; j++) {
            parameters.push( prompt (param[i][j]) );
            parameters_name.push( param_name[i][j] );
          }
          break;
        }
      }
      var string_parameters = "";
      if (!(parameters[0] == "" )) {
        string_parameters = "?";
        for (var i = 0; i < parameters.length; i++) {
          if (i===0 && parameters.length==1) {
              string_parameters += parameters_name[i] + "=" + parameters[i];
          }else{
            if (!(parameters[i] === "")) {
              if (i === parameters.length-1){
                string_parameters += parameters_name[i] + "=" + parameters[i];
              }else{
                string_parameters += parameters_name[i] + "=" + parameters[i] + "&";
              }
            }else{
              if (string_parameters.endsWith("&")) {
                string_parameters = string_parameters.substring(0, string_parameters.length - 1);
              }
              break;
            }
          }
        }
      }
      $.get('http://tarla.hackathongi.cat/devices/' + device + "/cmds/" + action + string_parameters, function( data ) {
        alert(data);
      });
    });



  });

})
