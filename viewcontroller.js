define(['anchor/class',
        'anchor/events',
        './dib'],

function(clazz, events, Dib) {
  
  function ViewController() {
    events.EventEmitter.call(this);
  }
  clazz.inherits(ViewController, events.EventEmitter);
  
  // TODO: Implement support for "static" elements that want to rerender
  //       by directly manipulating the DOM.
  
  ViewController.prototype.view = function(cb) {
    if (this.el) return cb(null, this.el);
    
    // TODO: Add option for controlling the template engine.
    
    var element = {};
    element.tag = this.tagName || 'div';
    element.attrs = this.attributes || {};
    if (this.id) element.attrs['id'] = this.id;
    if (this.className) element.attrs['class'] = this.className;
    
    var self = this;
    var dib = new Dib(this.template, element, this.events, this);
    dib.create(function(err, el) {
      self.el = el;
      self.onelcreate();
      cb(null, el);
    });
  }
  
  ViewController.prototype.onelcreate = function() {};
  
  return ViewController;
});
