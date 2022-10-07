/*
Challenge:
1. Move the data to a file called data.js 
and import it into index.js.
*/

import {
    catsData
} from './data.js';
const emotionsContainer = document.getElementById('emotion-radios');
const getImgBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

/*
Challenge:
1. Add an eventListener to emotionRadios that will listen 
out for any *change* in our radio buttons. When it detects
a change, it should log out the id of the element that 
was selected.
⚠️️ ️T️h️is won't work if the eventListener is listening out for a 
'click'. Google what event to listen for - I've already 
given you a clue!
*/
emotionsContainer.addEventListener('change', highlightCheckedOption);

/*
Challenge:
1. Wire up the X button in the modal so
it closes the modal.
*/
memeModalCloseBtn.addEventListener('click', closeModal);

//closes the modal when anywhere on the madal is clicked
document.addEventListener('click', (e) => {
    if (e.target === memeModal) {
        closeModal();
    }
});

/*
Challenge:
1. Set up an eventlistener which calls a new
function called "getMatchingCatsArray" when
the "Get Image" button is clicked.
2. getMatchingCatsArray should save the value
of the checked radio input to a const and 
log out that const.
*/
getImgBtn.addEventListener('click', renderCat);


function highlightCheckedOption(e) {
    /*
    Challenge:
    1. Create an array of all items that have 
    the "radio" class.
    2. Iterate over the array and remove the 
    "highlight" class from each one.
    */
   const itemsArray = document.getElementsByClassName('radio');
   for (let item of itemsArray) {
       item.classList.remove('highlight');
    }

    /*
    Challenge:
    1. highlightCheckedOption should take control 
    of the selected radio input and add the CSS
    class of "highlight" to its classlist
    */
   document.getElementById(e.target.id).parentElement.classList.add('highlight');
}
function closeModal() {
    memeModal.style.display = 'none';
}

function renderCat() {
    const catObject = getSingleCatObject();
    console.log(catObject);
    memeModalInner.innerHTML =
        `<img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}">
    `;
    memeModal.style.display = 'flex';
    /*
    Challenge:
    1. Take the object that is returned by 
    getSingleCatObject and save it to a const 
    called "catObject".
    2. Set memeModalInner’s innerHTML to the HTML 
    string below, remembering to insert the relevant 
    data from catObject to replace the UPPERCASE text.
    3. Set memeModal’s display property to "flex". 
    
        `<img 
            class="cat-img" 
            src="./images/CAT IMAGE"
            alt="CAT ALT TEXT"
            >`
    */
}
function getSingleCatObject() {
    /*
    Challenge:
    1. Inside this function, call getMatchingCatsArray 
    and save whatever it returns to a const called 
    “catsArray”. 
    */
    const catsArray = getMatchingCatsArray();
    // console.log(catsArray);
    /*
    Challenge:
    1. Set up an if to check if there is only one
    cat object in the array. If there is, log
    out that cat object (but not the whole array!)
    {}
    Test: "happy", animated GIFS only checked.
    */
    if (catsArray.length === 1) {
        console.log(catsArray[0]);
        return catsArray[0];
    } else {
        /*
        Challenge:
        1. If catsArray has more than one object, 
        select an object at random and log it out.
        */
        let randomCat = Math.floor(Math.random() * catsArray.length);
        console.log(catsArray[randomCat]);
        return catsArray[randomCat];
    }
}

function getMatchingCatsArray(e) {
    /*
    Challenge:
    1. Add code to getMatchingCatsArray so 
    that the two existing lines of code 
    only run if an emotion has been selected.
    */
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        console.log(selectedEmotion);

        /*
        Challenge:
        1. Take control of the gifs only option checkbox.
        2. Set up a const in getMatchingCatsArray to store 
        a boolean which will be set to true if the 
        "gifs only" option is checked and false if it's
        not. (Think what a good name for this const would 
        be.)
        3. Log it out to check it's working.
        */

        const isGif = gifsOnlyOption.checked;
        console.log(isGif);

        /*
        Challenge:
        1. Use the .filter() and .includes() methods to get 
        an array of cats which have the selected emotion
        in their emotionTags array. 
        2. Store this array in a const and log it out to check
        it's working. Think: what would be a good name for the
        const?
        */
        const matchingCatsArray = catsData.filter(selectedCat => {
            /*
            Challenge:
            1. Change the .filter() method's function so it returns an 
            array that only has GIFs if the 'GIFs only' option is 
            checked. If the 'GIFs only' option is not checked, it
            should return an array of all matches as it does now.
            */
            if (isGif && selectedCat.emotionTags.includes(selectedEmotion)) {
                return selectedCat.isGif;
            }
            return selectedCat.emotionTags.includes(selectedEmotion)
        });

        return matchingCatsArray;
    }
}

function getEmotionsArray(cats) {
    /*
    Challenge:
    1. Set up a const and initialise it with 
    an empty array.
    2. Instead of logging out each emotion, 
    push each one to the new array.
    */

    const emotionsArray = [];

    /*
    Challenge:
    1. Set up a "for of" in getEmotionsArray to iterate 
    over the data.
    2. For now, just log out each cat object individually.
    */
    for (let cat of cats) {
        // console.log(cat);

        /*
        Challenge:
        1. Add a nested "for of" to log out just 
        the emotions from the emotionTags array 
        in each object.
        */
        for (let emotion of cat.emotionTags) {

            /*
            Challenge:
            1. Refactor this nested for of so that an 
            emotion is only pushed to emotionsArray
            if it is not already in emotionsArray.
            Extra kudos if you use the "logical not"
            operator - feel free to google it!
            */
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(cats) {
    /*
    Challenge:
    1. Have the new function "renderEmotionsRadios" 
    take in a single parameter. Name that parameter
    "cats". 
    2. Inside renderEmotionsRadios, set up a const called 
    "emotions" and set it equals to whatever is returned 
    by calling getEmotionsArray, passing in "cats" as an 
    argument.
    3. Take control of the 'emotion-radios' div.
    4. In renderEmotionsRadios, set up a let 
    to hold our string of HTML. You can initialise
    it with an empty string.
    3. Iterate over "emotions" and put each emotion 
    in a <p> tag and then add them to the let you 
    in step 2. 
    4. Render the string to the 'emotion-radios' div.
    
    */
    const emotions = getEmotionsArray(cats);
    let emotionItems = '';
    for (let emotion of emotions) {
        /*
        Challenge:
        1. Swap out `<p>${emotion}</p>` for HTML
        that will render a radio input for each
        emotion. Remember to use "type", "id", 
        "value", and "name" properties on each radio.
        ("id" and "value" can both be set to the
        "emotion").
        2. Remember to give each radio a label.
        (What property does a label need?)
        3. Enclose each individual radio input in this div:
        <div class="radio">
            **RADIO HERE**
        </div>
        */
        // emotionItems += `<p>${emotion}</p>`;
        emotionItems +=
            `
            <div class="radio">
            <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
            </div>
            `;
    }
    emotionsContainer.innerHTML = emotionItems;
}

renderEmotionsRadios(catsData);