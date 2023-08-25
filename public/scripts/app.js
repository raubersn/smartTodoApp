// Client-facing scripts here
$(document).ready(function () {

  // Submit form using AJAX
  /*
  $('#todoForm').submit(function (event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/items',
      data: $(this).serialize()
    })
    .done(function (response) {
      // Reset form and add new item
      $('#todoForm')[0].reset();
      const categoryUL = $('#' + response.category_id);
      const newItemHTML = `
        <li class="list-group-item draggable-item ${response.checked}" data-item-id="${response.id}">
          <input class="form-check-input me-2" type="checkbox" value="${response.id}" />
          ${response.description}
        </li>`;
      categoryUL.append(newItemHTML);
    })
    .fail(function () {
      console.error('failed');
    });
  });
  */

  // Handle checkbox click using event delegation
  $(document).on('click', 'input.form-check-input.me-2', function (event) {
    const listItem = $(event.currentTarget).closest('.list-group-item'); // Get the closest list item
    const checked = event.currentTarget.checked;
    const itemId = listItem.data('item-id'); // Get the item ID from data attribute

    $.ajax({
      type: 'POST',
      url: `/items/${itemId}/checked`,
      data: { checked: checked, itemId: itemId }
    })
    .done(function (response) {
      console.log(response);
      listItem.toggleClass('text-decoration-line-through', checked); // Toggle the class
    })
    .fail(function () {
      console.error('failed');
    });
  });


});
