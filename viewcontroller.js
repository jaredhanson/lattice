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
  
  // TODO: Rename this to ._init
  ViewController.prototype.view = function(cb) {
    //if (this.el) return cb(null, this.el);
    if (this.el) return
    
    var element = {};
    element.tag = this.tagName || 'div';
    element.attrs = this.attributes || {};
    if (this.id) element.attrs['id'] = this.id;
    if (this.className) element.attrs['class'] = this.className;
    
    var dib = new Dib(this.template, null, null, this)
      , locals = this.willLoadDib();
    
    dib.container(element).events(this.events, this);
    
    this.el = dib.create(locals);
    this.didLoadDib();
  }
  
  ViewController.prototype.willLoadDib = function() {};
  ViewController.prototype.didLoadDib = function() {};
  
  return ViewController;
});
