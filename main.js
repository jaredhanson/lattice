define(['./dib',
        './viewcontroller',
        './context'],
function(Dib, ViewController, context) {
  
  var exports = {};
  exports.Dib = Dib;
  exports.ViewController = ViewController;
  
  exports.$ = context.$;
  exports.render = context.render;
  
  return exports;
});
