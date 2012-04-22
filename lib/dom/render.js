define({
  
  render: function(locals) {
    var html = this._render(this._template, locals);
    return this.html(html);
  },
  
  _render: function(template, locals) {
    return template(locals);
  }
  
});
