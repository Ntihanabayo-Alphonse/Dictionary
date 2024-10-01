const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.getElementById('result');
const btn = document.getElementById('search-btn');
const sound = document.getElementById('sound');
const word = document.getElementById('result-word');
const pronounce = document.getElementById('pronounce');
const wordMeaning = document.getElementById('word-meaning');
const wordExample = document.getElementById('word-example');
const Speech = document.getElementById('speech');
const notFound = document.getElementById('error');


async function dictionaryApp(){
    try{
        let inpword = document.querySelector('#inp-word').value;
        const response = await fetch(`${url}${inpword}`);
        const data = await response.json();

        word.innerText = inpword;
        Speech.innerText = data[0].meanings[0].partOfSpeech;
        pronounce.innerText = `${data[0].phonetic || data[0].phonetics[1].text}`;
        wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
        wordExample.innerHTML = `${data[0].meanings[0].definitions[0].example || '<a href="https://www.dictionary.com" target="_blank">Get more details here...</a>'}` ;
        
        sound.setAttribute('src', `${data[0].phonetics[0].audio || data[0].phonetics[1].audio}`);
        result.classList.add('show');
        notFound.innerText = '';
        
    }catch(err) {
        notFound.innerText = 'Word not found';
        result.classList.remove('show');
    }
}

btn.addEventListener('click', dictionaryApp);

function playSound(){
    sound.play();
}


