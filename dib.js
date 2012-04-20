define(['anchor/dom'],

function(dom) {
  
  function Dib(name, events, target) {
    this._name = name;
    this._events = events;
    this._target = target;
  }
  
  Dib.prototype.create = function(options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = {};
    }
    options = options || {};
    
    // TODO: Figure out how to extract variables for binding layer.
    // TODO: Eliminate jQuery dependency.
    
    var engine = options.engine || 'default';
    var render = engines[engine];
    if (!render) { throw new Error("Can't find template engine: " + engine) }
    
    var self = this;
    render(this._name, options, function(err, str) {
      if (err) { return cb(err) }
      // TODO: May not want to always wrap the string in a DOM node collection.
      var el = dom.fromHTML(str);
      self._triggers(el);
      
      cb(null, el);
    });
  }
  
  Dib.prototype._triggers = function(el) {
    var events = this._events;
    for (var key in events) {
      var parts = key.split(' ')
        , ev = parts[0]
        , selector = parts[1]
        , action = events[key]
        , target = this._target
        , handler;
        
      // TODO: Scope the element to the selector, if one is specified.
      
      if (typeof action == 'function') {
        handler = action;
      } else if (typeof action == 'string') {
        if (!target) { throw new Error("Unspecified target for action: " + action) }
        handler = target[action].bind(target);
      } else if (typeof action == 'object') {
        target = action.target || target;
        if (!target) { throw new Error("Unspecified target for action: " + action.action) }
        handler = target[action.action].bind(target);
      }
      
      el.on(ev, handler);
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
