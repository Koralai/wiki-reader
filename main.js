$(function() { 
    var articleTitleIndex = 1;
    var wikiAPISearch = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=";    

    $( ".search-terms-input" ).autocomplete({
      source: function (request, response) {
        $.getJSON(wikiAPISearch + request.term)
          .done(function( data ) {
            response(data[articleTitleIndex]);
          })
          .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
          });
      }
    });

    $( "form" ).submit(function( event ) {
      event.preventDefault();
      var searchTerm = $(".search-terms-input").val();

        $.getJSON(wikiAPISearch + searchTerm)
        .done(function( data ) {
          $(".search-result-container").empty();
          
          var indexLength = data[1].length;
          for (var i = 0; i < indexLength; i++) {
            $(".search-result-container").append(
              '<div class="search-result">' + 
                '<div class="color-bar"></div>' +
                '<div class="search-result-text">' +
                  '<h3>' + data[1][i] + '<a href="' + data[3][i] + '" rel="noopener noreferrer" target="_blank" class="article-link">→</a>' + '</h3>' +
                  '<p>' + data[2][i] + '</p>' +
                '</div>' +
              '</div>'
            );

            console.log(data[1][i] + data[2][i] + data[3][i]);
          }

        })
        .fail(function( jqxhr, textStatus, error ) {
          var err = textStatus + ", " + error;
          console.log( "Request Failed: " + err );
        });

    });

});