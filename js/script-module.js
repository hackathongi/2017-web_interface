$(function() {
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
})
