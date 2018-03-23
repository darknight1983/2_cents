


$(function() {

  $(document).on('click', '.save-button', function(e) {
    // Extract the id from the component so that you will know where the comment
    // needs to be saved.
    e.preventDefault();
    // Extract the data from the component
    let link = $(this).parents('.mdl-cell').children('.mdl-card__title')
                .children('a').attr('href');
    let title = $(this).parents('.mdl-cell').children('.mdl-card__supporting-text')
                .text().trim();

    let articleInfo = {
      headline: title,
      url: link
    };

    $.post('/save', articleInfo, (article) => {
      console.log(article);
    })
  })
});
