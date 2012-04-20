define(['anchor/dom'],

function(dom) {
  
  function Dib(name, events, target) {
    this._name = name;
    this._events = events;
    this._target = target;
  }
  
  Dib.prototype.create = function(options, cb) {
    // TODO: Figure out how to extract variables for binding layer.
    // TODO: Eliminate jQuery dependency.
    
    var engine = 'default';
    
    fn = engines[engine];
    if (!fn) { throw new Error("Can't find template engine: " + engine); }
    
    var self = this;
    fn(this._name, options, function(err, str) {
      if (err) { return cb(err) }
      // TODO: May not want to always wrap the string in a DOM node collection.
      var el = dom.fromHTML(str);
      self._triggers(el);
      
      cb(err, el);
    });
  }
  
  Dib.prototype._triggers = function(el) {
    var events = this._events;
    for (var key in events) {
      // TODO: Break key out into event and selector
      console.log('trigger key: ' + key);
      var action = events[key];
      var ev = key;
      var handler;
      
      if (typeof action == 'function') {
        console.log('target function');
        handler = action;
      } else if (typeof action == 'string') {
        console.log('target string');
        handler = this._target[action];
      } else if (typeof action == 'object') {
        console.log('target object');
      }
      
      el.on(ev, handler);
    }
  }
  
  Dib.prototype.hook = function(ctrl, el, events) {
    for (var prop in events) {
      // TODO: Parse out event and CSS selector
      //console.log('prop: ' + prop + ' to: ' + events[prop]);
      /*
      var fn;
      if (typeof events[prop] == 'function') {
        fn = events[prop];
      } else {
        // TODO: Should the function be bound to preserve this context?
        var action = events[prop];
        fn = ctrl[action];
      }
      el.on(prop, fn);
      */
    }
  }
  
  
  var engines = {};
  
  Dib.engine = function(name, fn) {
    if (typeof name == 'function') {
      fn = name;
      name = 'default';
    }
    engines[name] = fn;
  }
  
  return Dib;
});
