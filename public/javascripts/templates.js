(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['edit-note'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div data-note-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n  <input type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.existingText || (depth0 != null ? depth0.existingText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"existingText","hash":{},"data":data}) : helper)))
    + "\" />\r\n  <button class=\"submit-button\">Submit</button>\r\n  <button class=\"cancel-button\">Cancel</button>\r\n</div>\r\n";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"homepage\">\r\n  <h1>6.170 Notes</h1>\r\n  <p>You must be signed in to continue.</p>\r\n  <button id=\"signin-btn\">Sign in</button>\r\n  <button id=\"register-btn\">Register</button>\r\n</div>\r\n";
},"useData":true});
templates['note'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"note\" data-note-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\r\n  <p>"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\r\n  <p>Created by "
    + alias4(((helper = (helper = helpers.creator || (depth0 != null ? depth0.creator : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"creator","hash":{},"data":data}) : helper)))
    + "</p>\r\n  <a href=\"#\" class=\"delete-note\">Delete</a>\r\n</div>\r\n";
},"useData":true});
templates['notes'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.note,depth0,{"name":"note","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "    <p><em>No notes yet!</em></p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"notes\">\r\n\r\n  <p>Welcome, "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data}) : helper)))
    + " (<a href=\"#\" id=\"logout-link\">logout</a>)</p>\r\n  \r\n  <div>\r\n    <div class=\"error\"></div>\r\n    <label for=\"new-note-input\">Add a new tweet:</label>\r\n    <input type=\"text\" id=\"new-note-input\" />\r\n    <button id=\"submit-new-note\">Add</button>\r\n  </div>\r\n\r\n  <h1>Tweet Feed</h1>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.notes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n</div>\r\n";
},"usePartial":true,"useData":true});
templates['register'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"register\">\r\n  <a href=\"#\" id=\"home-link\">Back to Home</a>\r\n  <h1>Register</h1>\r\n  <div class=\"error\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n  <form id=\"register-form\">\r\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\r\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\r\n    <div>Confirm Password: <input type=\"password\" name=\"confirm\" required /></div>\r\n    <input type=\"submit\" />\r\n  </form>\r\n</div>\r\n";
},"useData":true});
templates['signin'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signin\">\r\n  <a href=\"#\" id=\"home-link\">Back to Home</a>\r\n  <h1>Sign in</h1>\r\n  <div class=\"error\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\r\n  <form id=\"signin-form\">\r\n    <div>Username: <input type=\"text\" name=\"username\" required /></div>\r\n    <div>Password: <input type=\"password\" name=\"password\" required /></div>\r\n    <input type=\"submit\" />\r\n  </form>\r\n</div>\r\n";
},"useData":true});
})();