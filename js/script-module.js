$(function() {
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
})
