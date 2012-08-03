define(['anchor/dom',
        './context'],

function(DOM, context) {
  
  // Dib is a DOM interface bundle, with support for declarative markup of
  // elements and events.
  function Dib(name) {
    // TODO: Implement ability to pass elements directly (??)
    
    this._name = name;
  }
  
  Dib.prototype.container = function(container) {
    this._container = container;
    return this;
  }
  
  Dib.prototype.events = function(events, target) {
    this._events = events;
    this._target = target;
    return this;
  }
  
  Dib.prototype.create = function(options) {
    options = options || {};
    
    var render = context.render
      , $ = context.$;
    
    // TODO: Return template, or rendered html ???
    var html = render(this._name, options);
    
    // TODO: Handle object results from render
    // TODO: Handle optino to not wrap the HTML in an element
    
    // TODO: Figure out how to extract variables for binding layer.
    // TODO: Implement option to wrap this in a div or not.  Default true.
    //       Wrapping in a div allows $.html() swaps of content, rather than
    //       replacing the DOM element.  Is this beneficial?
    // TODO: Perhaps better - implement an option to unwrap the top element
    //       in the template, then attach a el.render() function to the DOM
    //       node.
    
    var el;
    
    if (this._container) {
      el = $(DOM.create(this._container['tag'], this._container['attrs']));
      el.html(html)
    } else {
      el = $(html)
    }
    
    // FIXME: Do we want to save the rendering here?
    //el._template = template;
    //if (render) { el._render = render }
    //if (locals) { el.render(locals) }
    //connect(el, self._events, self._target);
    //cb(null, el);
    
    connect(el, this._events, this._target);
    return el;
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
  
  return Dib;
});
