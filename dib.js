define(['anchor/dom'],

function(dom) {
  
  function Dib(options) {
    this._id = options.id;
  }
  
  Dib.prototype.load = function(ctxt) {
    // TODO: Implement async rendering with callback.
    // TODO: Register rendering functions. Don't assume Hogan.
    // TODO: Figure out how to extract variables for binding layer.
    // TODO: Eliminate jQuery dependency.
    var templ = Hogan.compile($(this._id).html());
    var html = templ.render(ctxt);
    return dom.fromHTML(html);
  }
  
  return Dib;
});
