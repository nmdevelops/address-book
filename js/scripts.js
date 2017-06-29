function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $("select.new-address-type").val("");
    $(".removeOnSubmit").empty();

}

function Contact(first,last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName
}

function Address(addressType, street, city, state) {
  this.addressType = addressType;
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return this.addressType + " Address: " + this.street + ", " + this.city + " " + this.state;
}



$(document).ready(function(){

  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address removeOnSubmit">' +
                                '<div class="form-group">' +
                                  '<label for="new-address-type">Address type</label>' +
                                  '<select type="text" class="form-control new-address-type" value="Home">' +
                                    '<option value="Home">Home</option>' +
                                    '<option value="Work">Work</option>' +
                                  '</select>' +
                                '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $('input#new-first-name').val();
    var inputtedLastName = $('input#new-last-name').val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedAddressType = $(this).find("select.new-address-type").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedAddressType, inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);
    });

    $('ul#contacts').append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    resetFields();
    // $("#add-address").not();
  });
});
