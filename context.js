define(['anchor/dom',
        './lib/dom/render'],
function(DOM, Render) {
  var exports = {};
  
  exports.render = function(name, options) {
    if (typeof name == 'function') {
      render = name;
      return;
    }
    return render.apply(undefined, arguments);
  };
  
  exports.$ = function(nodes) {
    if (typeof nodes == 'function') {
      wrap = nodes;
      return;
    }
    return wrap.apply(undefined, arguments);
  }
  
  
  var render = function(name, options) {
    throw new Error('Invalid context: sail.render() must be implemented by application');
  }
  
  var wrap = DOM;
  
  
  DOM.augment(Render);
  
  
  // TODO: May want to implement default renderer, with support for mime types
  //       of script elements on page.  Investigate this
  //var engines = {};
  
  /*
  Dib.engine = function(name, fn) {
    if (typeof name == 'function') {
      fn = name;
      name = 'default';
    }
    engines[name] = fn;
  }
  */
  
  // TODO: Is it viable to have async rendering?
  /*
  Dib.render = function(name, options) {
    options = options || {}
    console.log('Dib.render: ' + name)
    
    // TODO: Engine option should not be handled here.  App's responsibility to check script type and
    //       render accordingly.
    var engine = options.engine || 'default';
    var compile = engines[engine];
    return compile(name, options)
  }
  */
  
  
  
  return exports;
});
