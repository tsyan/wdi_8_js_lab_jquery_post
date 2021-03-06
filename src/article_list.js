var GA = GA || {};

GA.ArticleList = {};

GA.ArticleList.initialize = function(getUrl, articleListEl) {
  this.url = getUrl,
  this.articleListEl = articleListEl;

  $('#get-articles').click(this.getArticles.bind(this));
  $('#get-articles').trigger('click');
  $('#new-article').submit(this.createArticle.bind(this));
};

GA.ArticleList.getArticles = function(event) {
  var articlesHTML = '';

  $.get(this.url, function( data ) {
    var articles = data.articles;

     for(var i = 0; i < articles.length; i++) {
       article = new GA.Article(articles[i].id, articles[i].title, articles[i].body);
       articlesHTML += article.createHTML();
     };

    this.articleListEl.empty();
    this.articleListEl.append(articlesHTML);
  }.bind(this));
};


GA.ArticleList.createArticle = function(event) {
  var $form = $(event.target),
      $title = $form.find("input[name='title']"),
      $body = $form.find("input[name='body']"),
      action = $form.attr('action'),
      articleListEl = this.articleListEl;

  event.preventDefault();

  $.ajax({
    type: "POST",
    url: this.url + '/articles',
    data: {article:  {title: $title.val(), body: $body.val()}},
    dataType: 'json'
  })
    .done(function(data){
      var article = new GA.Article(
        data.article.id,
        data.article.title,
        data.article.body);

      articleListEl.append(article.createHTML());
    });
};
