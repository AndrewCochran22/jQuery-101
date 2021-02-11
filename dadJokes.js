$(document).ready(() => {

    function getJoke() {
        return $.ajax({
            url: 'https://icanhazdadjoke.com/',
            headers: {
                'Accept': 'application/json'
            }
        }).then((data) => {
            console.log(data.joke);
            return data.joke;
        }).catch((error) => {
            return 'There was an error, please try again.'
        })
    }

    function searchJoke(term) {
        return $.ajax({
            url: 'https://icanhazdadjoke.com/search?term=' + term,
            headers: {
                'Accept': 'application/json'        
            }
        }).then(res => {
            return res.results.map(result => result.joke)
        }).catch(err => {
            console.log(err);
            return 'There was an error making the request';
        });
    }
    

    const $container = $('<div>')
    const $h1 = $('<h1>', { text: 'Dad Jokes' })

    // $(document.body).append($container);
    $container.appendTo(document.body);
    $container.append($h1);

    const $jokeButton = $("<button>Click for lolz</button>");
    $container.append($jokeButton);

    $jokeButton.on('click', () => {
        $('.joke').remove();

        getJoke().then((joke) => {
            $('<p>', {
                text: joke,
                class: "joke"
            })
                .hide()
                .appendTo($container)
                .fadeIn();
        })
    });

    const $jokeForm = $('<form>');
    const $jokeInput = $('<input>', {
        placeholder: 'Enter search term'
    })
    const $submitBtn = $('<button type="submit">Search</button>')

    $jokeForm
        .append($jokeInput)
        .append($submitBtn)
        .appendTo(document.body)
        .on('submit', (event) => {
            event.preventDefault();
            const searchTerm = $jokeInput.val();
            searchJoke(searchTerm)
                .then((jokesArray) => {
                    console.log(jokesArray)
                    $(jokesArray).each((index, joke) => {
                        $('<p>', {
                            text: joke,
                            class: "joke"
                        })
                            .hide()
                            .appendTo($container)
                            .fadeIn();
                    })
                })
        })
})