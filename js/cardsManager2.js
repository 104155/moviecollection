// get JSON movie data into a string
var movies = JSON.parse(movieList);

function addEventListeners() {
    //add eventlistener to sort buttons
    document.getElementById('sortDesc').addEventListener("click", function (e) {
        displaySortedCards(sortDescending);
        checkRanking();
        toggleBtnActive(e);
    });

    document.getElementById('sortAsc').addEventListener("click", function (e) {
        displaySortedCards(sortAscending);
        toggleBtnActive(e);
    });

    //add eventlisteners to all card like buttons
    for (let i = 0; i < movies.length; i++) {
        document.querySelectorAll(".likeBtn")[i].addEventListener("click", function (e) {
            displayLikes(e);
        });

    }
}

//create html card structure
function createCards(movies) {
    for (let i = 0; i < movies.length; i++) {
        createCard(i, movies);
    }
}

//create html card structure
function createCard(index, movies) {

    //div dvdContainer
    let dvdContainer = document.createElement("div");
    document.querySelector(".cardsContainer").appendChild(dvdContainer);
    dvdContainer.setAttribute("class", "dvdContainer cardsItem");

    //div rank container
    let rank = document.createElement("div");
    dvdContainer.appendChild(rank);
    rank.setAttribute("class", "rankContainer");

    //div comment container
    let commentContainer = document.createElement("div");
    dvdContainer.appendChild(commentContainer);
    commentContainer.setAttribute("class", "commentContainer");

    //img comment arrow
    let imgArrow = document.createElement("div");
    commentContainer.appendChild(imgArrow);
    imgArrow.setAttribute("class", "arrowImg");

    //p comment text
    let commentText = document.createElement("p");
    let commentTextNode = document.createTextNode(movies[index].comment);
    commentText.appendChild(commentTextNode);
    commentContainer.appendChild(commentText);
    commentText.setAttribute("class", "commentText");

    //div coverContainer
    let coverContainer = document.createElement("div");
    dvdContainer.appendChild(coverContainer);
    coverContainer.setAttribute("class", "coverContainer");

    //img coverImg
    let imgContainer = document.createElement("img");
    coverContainer.appendChild(imgContainer);
    imgContainer.setAttribute("src", movies[index].image);
    imgContainer.setAttribute("class", "coverImg");

    //div dvd highlight
    let highlight = document.createElement("div");
    coverContainer.appendChild(highlight);
    highlight.setAttribute("class", "highlight");

    //div likeBtn container
    let likeContainer = document.createElement("div");
    dvdContainer.appendChild(likeContainer);
    likeContainer.setAttribute("class", "likeContainer");

    //a likeBtn
    let likeBtn = document.createElement("a");
    likeContainer.appendChild(likeBtn);
    likeBtn.setAttribute("class", "likeBtn");
    likeBtn.setAttribute("id", index);

    //img likeImg
    let likeImg = document.createElement("img");
    likeBtn.appendChild(likeImg);
    likeImg.setAttribute("src", "img/LikeHand.png");
    likeImg.setAttribute("class", "likeImg");

    //like text
    let likeTxt = document.createElement("p");
    let likeTxtTextNode = document.createTextNode(movies[index].likes);
    likeTxt.appendChild(likeTxtTextNode);
    likeBtn.appendChild(likeTxt);
    likeTxt.setAttribute("class", "likeTxt");
}

//count likes of ONE movie & save back into movies array
function countUpAndSave(index) {
    let likes = movies[index].likes;
    likes++;
    movies[index].likes = likes;
    return likes;
}

//display the number of likes in browser when button is clicked
function displayLikes(event) {
    let likeBtn = event.target.parentNode;
    let id = likeBtn.getAttribute('id');
    likeBtn.querySelector('.likeTxt').innerHTML = countUpAndSave(id);
}

//display sorted cards DESCENDING || ASCENDING
function displaySortedCards(sortFunction) {
    sortFunction(movies);
    removeAll();
    createCards(movies);
    rebuildCardsAndBoard();
    addEventListeners();
}

//implement sort function "asc"
function sortAscending(arr) {
    arr.sort(compareAscending);
}

function compareAscending(obj1, obj2) {
    return obj1.likes - obj2.likes;
}

//implement sort function "desc"
function sortDescending(arr) {
    arr.sort(compareDescending);
}

function compareDescending(obj1, obj2) {
    return obj2.likes - obj1.likes;
}

//clear all cards
function removeAll() {
    document.querySelector(".cardsContainer").innerHTML = "";
}

//add active css to clicked sort button
function toggleBtnActive(event) {
    let btnActive = event.target;
    //remove active from all sort btns
    let allSortBtns = document.querySelectorAll('button[id*="sort"]');
    for (let i = 0; i < allSortBtns.length; i++) {
        allSortBtns[i].setAttribute("class", "buttonSpacer lato");
    }
    //set active attribute
    btnActive.setAttribute("class", "active buttonSpacer lato");
}

//add dynamic movie ranking
function checkRanking() {
    //get all card elements into an array
    let allItems = document.querySelectorAll('.cardsItem');
    let cardDistances = [];
    let likes = [];
    let likesWithoutFirst = [];
    let likesWithoutSecond = [];
    let maxLikes;
    let posMaxLikes;
    let distMaxLikes;
    let cardsContainer = document.querySelector('.cardsContainer');

    //get card distances (if distances are taken later in combination with inserting the board element values are uncorrect!)
    for (let i = 0; i < allItems.length; i++) {
        let topDistance = parseInt(allItems[i].getBoundingClientRect().top); //x.top, x.right, x.bottom, x.left
        cardDistances.push(topDistance);
    }

    //get likes
    for (let i = 0; i < movies.length; i++) {
        likes.push(movies[i].likes);
    }

    maxLikes = Math.max(...likes);

    //get elements distance and go to first element with same distance insert rankspace div
    for (let i = 0; i < likes.length; i++) {
        //Max likes pos & distance
        if (likes[i] == maxLikes) {
            posMaxLikes = i;
            distMaxLikes = cardDistances[i];
            //fist card in row same distance insert space
            for (let i = 0; i < cardDistances.length; i++) {
                if (distMaxLikes == cardDistances[i]) {

                    let ranksSpace = document.createElement('div');
                    cardsContainer.insertBefore(ranksSpace, document.querySelector("[id='" + i + "']").parentNode.parentNode);
                    ranksSpace.setAttribute("class", "ranks");

                    //modify dvd container
                    let cardMaxLikes = document.querySelector("[id='" + posMaxLikes + "']").parentNode.parentNode;
                    cardMaxLikes.setAttribute("style", "z-index: 1");

                    //modify rank container
                    let rankContainer = cardMaxLikes.querySelector(".rankContainer");
                    rankContainer.setAttribute("class", "rankOneContainer");

                    //add text
                    let text = document.createElement("p");
                    let textNode = document.createTextNode("THE BEST!!");
                    text.appendChild(textNode);
                    rankContainer.appendChild(text);
                    text.setAttribute("class", "rankTxt");

                    //add symbol 
                    let symbol = document.createElement("div");
                    rankContainer.appendChild(symbol);
                    symbol.setAttribute("class", "rankSymbol");
                    break;
                }
            }
        }

        //second not dynamic has to be sort descending first
        if (movies[1].likes > 0 && movies[1].likes <= maxLikes) {
            let cardMaxLikes = document.getElementById(1).parentNode.parentNode;

            //modify rank container
            let rankContainer = cardMaxLikes.querySelector(".rankContainer");
            console.log(rankContainer);
            rankContainer.setAttribute("class", "rankContainer rank rankTwo"); 
        }

        //third not dynamic has to be sort descending first
        if (movies[2].likes > 0 && movies[2].likes <= movies[1].likes) {
            let cardMaxLikes = document.getElementById(2).parentNode.parentNode;

            //modify rank container
            let rankContainer = cardMaxLikes.querySelector(".rankContainer");
            console.log(rankContainer);
            rankContainer.setAttribute("class", "rankContainer rank rankThree");
        }
    }
}


//Execute bevore "checkRanking"! adds a card board under every card row
function rebuildCardsAndBoard() {

    //get all card elements into an array
    let cards = document.querySelectorAll('.dvdContainer');
    let distanceOfCards = [];

    //get card distances (if distances are taken later in combination with inserting the board element values are uncorrect!)
    for (let i = 0; i < cards.length; i++) {
        let topDistance = parseInt(cards[i].getBoundingClientRect().top); //x.top, x.right, x.bottom, x.left
        distanceOfCards.push(topDistance);
    }

    //delete content of cardsContainer
    removeAll();

    //iterate through all cards and distances insert a cardboard when distances are not matching
    for (let i = 0; i < cards.length; i++) {

        //get top distance of each card
        let num1 = distanceOfCards[i];
        let num2 = distanceOfCards[i + 1];

        //insert div element after row
        if (num1 == num2) {
            createCard(i, movies);
        } else {
            createCard(i, movies);

            ////////////////////////////////////////////
            //insert board
            ////////////////////////////////////////////
            let board = document.createElement("div");
            document.querySelector('.cardsContainer').appendChild(board);
            board.setAttribute("class", "cardBoard cardsItem");
        }
    }
}

//initialize document
function documentReady() {
    createCards(movies);
    displaySortedCards(sortDescending);
    checkRanking();
    addEventListeners();
}
documentReady();





