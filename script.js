/*
Challenge:
1. Move the data to a file called data.js 
and import it into index.js.
*/

import {catsData} from './data.js';
const emotionsContainer = document.getElementById('emotion-radios');

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

function highlightCheckedOption (e)  {
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
        for(let emotion of emotions) {
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