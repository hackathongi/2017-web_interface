$(function() {
  /* Sends to API Tarla the device and action */


  /* Get modules from json and lists them */
  $.getJSON( "devices.json", function( data ) {
    var devices = [];
    var actions = [];
    var count = 0;
    $.each( data, function( i, object) {
      devices.push([]);
      actions.push([]);
      var device_name = i;
      devices[count].push("<div class=\"col-md-3\">\n<div class=\"module-button\">\n<div class=\"col-md-12\">\n<h3>"+i+"</h3>\n<a href=\"modules/"+i+".html\"><img class=\"img-responsive module-img\" src=\"img/"+i+".png\"/></a>\n<div class=\"cmds\">\n<div class=\"col-md-12\"><h4>Actions</h4>\n<div class=\"buttons-"+count+"\"></div></div>\n</div>\n<a class=\"btn btn-primary\" href=\"modules/"+i+".html\">More info</a></div>\n</div></div>");
      $.each( object.actions, function( i, object) {
        actions[count].push("<button class=\"btn btn-primary action\" data-action=\""+i+"\" data-device=\""+device_name+"\" style=\"margin-right:2px;\">"+i+"</button>");;
      });
      count++;
    });
    console.log(devices);
    console.log(actions);
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

      $.get('http://192.168.4.250/devices/' + device + "/cmds/" + action, function( data ) {
        console.log( data );
        alert( "Load was performed." );
      });

      console.log(action + " " + device);
    });



  });

})
