define(['anchor/dom'],

function(dom) {
  
  var engines = {};
  
  function Dib(options) {
    this._id = options.id;
  }
  
  Dib.engine = function(name, fn) {
    if (typeof name == 'function') {
      fn = name;
      name = 'default';
    }
    engines[name] = fn;
  }
  
  Dib.prototype.load = function(ctxt, cb) {
    // TODO: Implement async rendering with callback.
    // TODO: Register rendering functions. Don't assume Hogan.
    // TODO: Figure out how to extract variables for binding layer.
    // TODO: Eliminate jQuery dependency.
    
    var engine = 'default';
    
    fn = engines[engine];
    if (!fn) { throw new Error("Can't find template engine: " + engine); }
    
    fn(this._id, ctxt, function(err, str) {
      if (err) { return cb(err) }
      // TODO: May not want to always wrap the string in a DOM node collection.
      var node = dom.fromHTML(str);
      cb(err, node);
    });
  }
  
  Dib.prototype.hook = function(ctrl, el, events) {
    for (var prop in events) {
      // TODO: Parse out event and CSS selector
      //console.log('prop: ' + prop + ' to: ' + events[prop]);
      var fn;
      if (typeof events[prop] == 'function') {
        fn = events[prop];
      } else {
        // TODO: Should the function be bound to preserve this context?
        var action = events[prop];
        fn = ctrl[action];
      }
      el.on(prop, fn);
    }
  }
  
  return Dib;
});
