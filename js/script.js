$(function() {
  /* Sends to API Tarla the device and action */
  $('.action').click(function() {
    var btn = $(this);
    var action = btn.data('action');
    var device = btn.data('device');

    $.get('http://tarla.hackatongi.cat/devices/' + device + "/cmds/" + action, function( data ) {
      console.log( data );
      alert( "Load was performed." );
    });

    console.log(action + " " + device);
  });

  /* Get modules from json and lists them */
  $.get('http://192.168.4.250/devices', function(data) {

    console.log(data);
  });


})

/*
$.getJSON( "devices.json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<div id='" + key + "'>" + val + "</div>" );
  });
  $( "<div>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "#modules-container-test" );
});
*/
