$(document).ready(function () {
  // Define an object to store selected amenities
  const amenities = {};

  // Attach a change event handler to checkbox inputs inside <li> elements
  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    // Update the text inside the <h4> element with the selected amenities
    $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
  });

  // Make an AJAX request to check the API status
  $.ajax({
    type: 'GET',
    url: 'http://100.26.238.151/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        // If the status is "OK," add the 'available' class to the #api_status element
        $('#api_status').addClass('available');
      } else {
        // If the status is not "OK," remove the 'available' class from the #api_status element
        $('#api_status').removeClass('available');
      }
    },
    error: function () {
      // Handle the case where the AJAX request fails (e.g., network issue)
      console.error('API request failed');
    }
  });
});
