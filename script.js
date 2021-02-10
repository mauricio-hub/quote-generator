const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//loading
function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//remove loading

function removeLoading(){
    //si loader hidden es false entoncer quoteContainer sera falso
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//get quote 

async function getQuote(){
    showLoading()
	//evitando error has been blocked by CORS policy con proxyUrl
	 const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(proxyUrl+apiUrl);
		const data = await response.json()
		//console.log(data)
		//pasando data a los elementos
		//
		 if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
		//reduciendo el tamaño de fuente accediendo al css
		if (data.quoteText.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoading()
    }
    catch (error) {
        getQuote();
    }

}
//funcion para twittear frase 
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


//even listenner
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQuote();

