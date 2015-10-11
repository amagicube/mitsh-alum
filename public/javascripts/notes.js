// Wrapped in an immediately invoked function expression.
(function() {
  $(document).on('click', '#submit-new-note', function(evt) {
      var content = $('#new-note-input').val();
      if (content.trim().length === 0) {
          alert('Input must not be empty');
          return;
      }
      $.post(
          '/notes',
          { content: content }
      ).done(function(response) {
          loadHomePage();
          $('.error').text('');
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '.delete-note', function(evt) {
      var item = $(this).parent();
      var id = item.data('note-id');
      $.ajax({
          url: '/notes/' + id,
          type: 'DELETE'
      }).done(function(response) {
          item.remove();
          $('.error').text('');
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();
