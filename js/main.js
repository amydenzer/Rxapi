document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const brandName = document.querySelector('input[type=text]').value // Assuming the input type is text for brand name
  const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(brandName)}&limit=5`

  // Elements
  const genericNameElement = document.querySelector('h3');

  // Clear previous data
  genericNameElement.innerText = 'Searching...'


  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if(data.results && data.results.length > 0) {
          console.log(data.results);
          let genericNamesText = '';
          for(let i = 0; i < data.results.length; i++) {
            if(data.results[i].openfda && data.results[i].openfda.generic_name) {
              genericNamesText += `Entry ${i + 1}: ${data.results[i].openfda.generic_name.join(', ')}\n`;
            }
          }
          if(genericNamesText) {
            genericNameElement.innerText = genericNamesText;
          } else {
            genericNameElement.innerText = 'No generic names listed for this brand.';
          }
        } else {
          genericNameElement.innerText = 'No generic names found for this brand.';
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
          genericNameElement.innerText = 'Failed to fetch data. Please try again later.'
      });
}


//make it look waaaaayyy better. make this your own.
//look on NASA api website - they have sooo many other apis