
// This module is for validating the form on the client-side using a
// jQuery plugin called "jQuery Validate"

$(function() {
  console.log('Form validation');
  let form = $('#formValidate');
  form.validate({
    rules: {
      comment: {
        required: true,
        minlength: 5
      }
    }
  });

  // The resetForm() is suppose to be a function from the jquery plugin but
  // I think the version must be off because I get the error that this is
  // not a function.
  form.resetForm();
});
