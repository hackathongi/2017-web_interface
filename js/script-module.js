$(function() {
  $('.action').click(function() {
    var btn = $(this);
    var action = btn.data('action');
    var device = btn.data('device');

    $.get('http://tarla.hackathongi.cat/devices' + device + "/cmds/" + action, function( data ) {
      console.log( data );
      alert( "Load was performed." );
    });
  });
})
