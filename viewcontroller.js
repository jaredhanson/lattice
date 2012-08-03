define(['./dib',
        'anchor/class',
        'anchor/events'],
function(Dib, clazz, events) {
  
  function ViewController() {
    events.EventEmitter.call(this);
    this._init();
  }
  clazz.inherits(ViewController, events.EventEmitter);
  
  // TODO: Implement support for "static" elements that want to rerender
  //       by directly manipulating the DOM.
  
  ViewController.prototype._init = function() {
    var dib = new Dib(this.template)
      , locals = this.willLoadDib()
      , element;
    
    if (this.tagName || this.className || this.attributes || this.id) {
      element = {}
      element.tag = this.tagName || 'div';
      element.attrs = this.attributes || {};
      if (this.id) element.attrs['id'] = this.id;
      if (this.className) element.attrs['class'] = this.className;
    }
    
    dib.container(element)
       .events(this.events, this);
    
    this.el = dib.create(locals);
    this.didLoadDib();
  }
  
  ViewController.prototype.willLoadDib = function() {};
  ViewController.prototype.didLoadDib = function() {};
  
  return ViewController;
});
