Tradelog.service("SocketIO", function($rootScope) {
  // this.socket = io();
});


Tradelog.filter('replace', function () {

  return function(text, f, t){

    return text.replace(f,t);
  } 
});


Tradelog.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});