relyjs.autoResolve([<%= supportedExtensions %>]);
<%= mappings %>
<% if(isRelease) { %>
<%= content %>
<% if(entryExtension === '.pug') { %>
require('main');
<% } else { %>
require('<%= entryName %>');
<% } %>
<% } else { %>
relyjs.load([<%= dependencies %>], function(){
  <% if(entryExtension === '.pug') { %>
  require('main');
  <% } else { %>
  require('<%= entryName %>');
  <% } %>
});
<% } %>