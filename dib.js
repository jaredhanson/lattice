define(['anchor/dom',
        './lib/dom/render'],

function($, Render) {
  
  $.augment(Render);
  
  // TODO: Implement support for passing existing element (maybe without name for template?)
  function Dib(name, element, events, target) {
    // TODO: Figure out a better way to make this polymorphic.
    /*
    if (arguments.length == 3) {
      target = events;
      events = element;
      element = null;
    }
    */
    
    // handle a DOM wrapper instead of a template name
    // Checking in this way allows use of jQuery wrapped elements
    if (name.length && name[0].nodeType) {
      target = events;
      events = element;
      element = name;
    }
    
    if (!element) {
      element = { 'tag': 'div' };
    }
    
    this._name = name;
    this._element = element;
    this._events = events;
    this._target = target;
  }
  
  // TODO: Implement support for creating elements synchronously, returned
  //       immediately rather than via callback.
  Dib.prototype.create = function(locals, options, cb) {
    if (typeof locals == 'function') {
      cb = locals;
      options = {};
      locals = null;
    } else if (typeof options == 'function') {
      cb = options;
      options = {};
    }
    options = options || {};
    
    // TODO: Figure out how to extract variables for binding layer.
    // TODO: Implement option to wrap this in a div or not.  Default true.
    //       Wrapping in a div allows $.html() swaps of content, rather than
    //       replacing the DOM element.  Is this beneficial?
    // TODO: Perhaps better - implement an option to unwrap the top element
    //       in the template, then attach a el.render() function to the DOM
    //       node.
    
    if (this._element.length && this._element[0].nodeType) {
      var el = this._name;
      connect(el, this._events, this._target);
      return cb(null, el);
    }
    
    var engine = options.engine || 'default';
    var compile = engines[engine];
    if (!compile) throw new Error("Can't find template engine: " + engine)
    
    var self = this;
    compile(this._name, options, function(err, template, render) {
      if (err) return cb(err)
      var dom = options.$ || $;
      var el = dom($.create(self._element['tag'], self._element['attrs']));
      el._template = template;
      if (render) { el._render = render }
      if (locals) { el.render(locals) }
      connect(el, self._events, self._target);
      cb(null, el);
    });
  }
  
  function connect(el, e, t) {
    var events = e;
    for (var key in events) {
      var parts = key.split(' ')
        , ev = parts[0]
        , selector = parts[1]
        , action = events[key]
        , target = t
        , handler;
        
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
      
      if (selector) {
        // TODO: Make sure these events are delegated, in case selected elements get replaced.
        el.find(selector).on(ev, handler);
        // TODO: This is the jQuery-delegated signature. Implement support for this in Anchor's
        //       DOM events.
        //el.on(ev, selector, handler);
      } else {
        el.on(ev, handler);
      }
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
