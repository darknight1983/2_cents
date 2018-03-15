


$(function() {

  $(document).on('click', '#save', function(e) {
    e.preventDefault();
    let link = $(this).parents('li').children('span').children('span').children('a').attr('href');
    let title = $(this).parents('li').children('.mdl-list__item-primary-content').data('title');

    let articleInfo = {
      headline: title,
      url: link
    };

    $.post('/save', articleInfo, (article) => {
      console.log(article);
    })
  })
});
