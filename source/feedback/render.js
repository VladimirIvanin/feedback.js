var getDataAttrName = require('./helpers').getDataAttrName;

function errorRender(errors) {
  var self = this;
  var useJqueryToggle = self.options.useJqueryToggle;
  var fieldSelector = getDataAttrName(self.options.selectors.field) + ':first';
  var inputErrorSelector = getDataAttrName(self.options.selectors.inputError);
  var errorSelector = getDataAttrName(self.options.selectors.error);

  $.each(errors, function(index, el) {
    var errorClass = self.options.classes.errorInput;
    var errorClassField = self.options.classes.errorField;
    var $input = $('[name="'+el.name+'"]');
    var $field = $input.parents( fieldSelector );
    var $inputErrorSelector = $field.find( inputErrorSelector );
    $input.addClass(errorClass);
    $field.addClass(errorClassField);

    // показать ошибку инпута
    renderWithOptions($inputErrorSelector, el.errorMessage, '', true, useJqueryToggle);

    if (self.options.hideErrorOnFocus) {
      $input.on('click', function(event) {
        $input.removeClass(errorClass);
        $field.removeClass(errorClassField);

        renderWithOptions($inputErrorSelector, '', '', false, useJqueryToggle);
        renderWithOptions(self.$element.find(errorSelector), '', '', false, useJqueryToggle);
      });
    }
  });

  if (errors && errors.length) {
    self.$element.addClass(self.options.classes.errorForm);

    renderWithOptions(self.$element.find(errorSelector), self.options.messages.error, '', true, useJqueryToggle);
  }
}

function successRender() {
  var self = this;
  var $form = self.$element;
  var useJqueryToggle = self.options.useJqueryToggle;
  var hideSuccessMessageTimer = self.options.hideSuccessMessageTimer;
  var errorClass = self.options.classes.errorInput;
  var errorClassField = self.options.classes.errorField;

  var fieldSelector = getDataAttrName(self.options.selectors.field);
  var inputErrorSelector = getDataAttrName(self.options.selectors.inputError);
  var errorSelector = getDataAttrName(self.options.selectors.error);
  var successSelector = getDataAttrName(self.options.selectors.success);

  self.$element.find('[name]').removeClass(errorClass);
  self.$element.find(fieldSelector).removeClass(errorClassField);
  self.$element.removeClass(self.options.classes.errorForm);

  var $errorSelector = $form.find(errorSelector);
  renderWithOptions($errorSelector, '', '', false, useJqueryToggle);

  var $inputErrorSelector = $form.find(inputErrorSelector);
  renderWithOptions($inputErrorSelector, '', '', false, useJqueryToggle);

  var $success = $form.find(successSelector);
  renderWithOptions($success, self.options.messages.success, '', true, useJqueryToggle, hideSuccessMessageTimer);
}

function renderWithOptions($selector, message, activeClass, isActive, useJqueryToggle, hideSuccessMessageTimer) {
  if (message) {
    $selector.html(message);
  }
  if (isActive) {
    $selector.addClass(activeClass);
  }
  else {
    $selector.removeClass(activeClass);
  }

  if (useJqueryToggle) {
    if (isActive) {
      $selector.show();
    }
    else {
      $selector.hide();
    }
  }

  if (hideSuccessMessageTimer) {
    setTimeout(function () {
      $selector.removeClass(activeClass);
      $selector.html('');
      if (useJqueryToggle) {
        $selector.hide();
      }
    }, hideSuccessMessageTimer)
  }
}

module.exports = {
  'errorRender': errorRender,
  'successRender': successRender
};
