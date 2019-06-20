// variables
const tweetList = document.getElementById('tweet-list');



// event listeners
eventListeners();

function eventListeners() {
    document.querySelector('#form').addEventListener('submit', newTweet);

    tweetList.addEventListener('click', removeTweet);

    // Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}






// functions
function newTweet(e) {
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;

    // create textarea value
    const li = document.createElement('li');
    li.textContent = tweet;

    // create remove buttons
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    // add remove button to each tweet
    li.appendChild(removeBtn);

    // add tweet to the list
    tweetList.appendChild(li);

    // add tweet to local storage
    addTweetLocalStorage(tweet);

    alert("Tweet added");
    this.reset();

}

function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    // Remove tweet from local storage
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    tweets.push(tweet);

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage(tweet) {
    let tweets;
    

    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets
}

function localStorageOnLoad(tweet) {
    let tweets = getTweetsFromStorage();

    tweets.forEach(function(tweet) {
        // create textarea value
        const li = document.createElement('li');
        li.textContent = tweet;

        // create remove buttons
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        // add remove button to each tweet
        li.appendChild(removeBtn);

        // add tweet to the list
        tweetList.appendChild(li);

    })
}

function removeTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    // remove the X from the tweet
    const tweetDelete = tweet.substring(0, tweet.length -1);
    // loop through the tweets

    tweets.forEach(function(tweetLs, index) {
        if(tweetDelete === tweetLs) {
            tweets.splice(index, 1);
        }

    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}