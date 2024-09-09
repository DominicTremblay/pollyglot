const TEXT_AREA_SELECTOR = '#webcrumbs textarea';
const RADIO_LANG_SELECTOR = 'input[name="language"]:checked';
const FORM_SELECTOR = '#webcrumbs form';
const TITLE1_SELECTOR = '#webcrumbs h2:nth-child(1)';
const TITLE2_SELECTOR = '#webcrumbs h2:nth-of-type(2)';

const inputForm = document.querySelector(FORM_SELECTOR);

const getTextInput = (selector) => {
  const input = document.querySelector(selector);
  return input.textContent;
};

const getSelectedLanguage = (selector) => {
  const selectedRadio = document.querySelector(selector);
  return selectedRadio ? selectedRadio.value : false;
};

const createPrompt = (userInput, language) => {
  return [
    {
      role: 'system',
      content: `You are a polyglot/expert translator. Translate the user input in between triple hash symbols into ${language}. Do not include the hash symbols into the response.`,
    },
    {
      role: 'user',
      content: `### ${userInput} ####`,
    },
  ];
};

const fetchTranslation = async (prompt) => {
  const url = `https://deploy.dominiccarmelt.workers.dev/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching translation', error);
  }
};

const displayTranslation = (translation) => {
  const title1 = document.querySelector(TITLE1_SELECTOR);
  title1.textContent = 'Original Text 👇';
  const title2 = document.querySelector(TITLE2_SELECTOR);
  title2.textContent = 'Your Translation 👇';
  const inputForm = document.querySelector(FORM_SELECTOR);
  const textArea = document.createElement('textarea');
  textArea.className =
    'w-full mt-2 mb-4 p-2 rounded-md border border-gray-300 bg-neutral-50';
  textArea.style.width = '100%';
  textArea.textContent = translation;
  textArea.rows = 3;
  textArea.disabled = true;
  console.log(textArea);

  const radioLabels = document.querySelectorAll('label[for]');
  const radioBtns = document.querySelectorAll('input[type="radio"]');

  radioLabels.forEach((label) => label.remove());
  radioBtns.forEach((btn) => btn.remove());
  title2.insertAdjacentElement('afterend', textArea);
  document.querySelector('button[type="submit"]').textContent = 'Start Over';
};

const translateText = async () => {
  const textInput = getTextInput(TEXT_AREA_SELECTOR);
  const selectedLanguage = getSelectedLanguage(RADIO_LANG_SELECTOR);
  const prompt = createPrompt(textInput, selectedLanguage);
  const translatedText = await fetchTranslation(prompt);
  displayTranslation(translatedText);
  document.querySelector(TEXT_AREA_SELECTOR).disabled = true;
};

const resetFrm = () => {
  console.log('Resetting the form');
  const div = document.querySelector('#webcrumbs');
  console.log(div);
  div.innerHTML = `
  <div class="w-[380px] rounded-lg shadow-lg bg-neutral-50 p-4">
        <header class="bg-blue-900 p-4 text-center rounded-t-lg">
          <img src="/assets/parrot.png" alt="Polly" class="inline-block align-middle" width="40" height="40" />
          <h1 class="inline-block align-middle font-title text-neutral-50 text-2xl ml-2">PollyGlot</h1>
          <p class="text-neutral-50 text-sm">Perfect Translation Every Time</p>
        </header>
        <div class="mt-4">
          <h2 class="font-title text-center text-blue-700">Text to translate <span class="inline-block">👇</span>
          </h2>
          <textarea class="w-full mt-2 mb-4 p-2 rounded-md border border-gray-300 bg-neutral-50" rows="3">How are you?</textarea>
          <h2 class="font-title text-center text-blue-700">Select language <span class="inline-block">👇</span>
          </h2>
          <form class="mt-2 mb-4 p-2 rounded-md">
            <div class="mb-2">
              <input type="radio" id="french" name="language" value="french" />
              <label for="french" class="ml-2">French <img src="/assets/fr-flag.png" alt="French"
                  class="inline-block align-middle ml-1" width="24" height="24" /></label>
            </div>
            <div class="mb-2">
              <input type="radio" id="spanish" name="language" value="spanish" />
              <label for="spanish" class="ml-2">Spanish <img src="/assets/sp-flag.png" alt="Spanish"
                  class="inline-block align-middle ml-1" width="24" height="24" /></label>
            </div>
            <div class="mb-2">
              <input type="radio" id="japanese" name="language" value="japanese" />
              <label for="japanese" class="ml-2">Japanese <img src="/assets/jpn-flag.png" alt="Japanese"
                  class="inline-block align-middle ml-1" width="24" height="24" /></label>
            </div>
            <button type="submit" name="submitBtn" class="w-full bg-blue-600 text-neutral-50 py-2 rounded-md font-title">Translate</button>
          </form>
        </div>
      </div>
  `;
};

document.addEventListener('submit', (event) => {
  if (event.target.matches(FORM_SELECTOR)) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const action = submitBtn.textContent;
    console.log({ action });

    if (action === 'Translate') {
      translateText();
    } else {
      resetFrm();
    }
  }
});
