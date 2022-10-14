const voiceSelect =
  document.querySelector<HTMLSelectElement>('[name="voices"]');
const speech = new SpeechSynthesisUtterance();

export function populateVoices() {
  const voices = speechSynthesis.getVoices();
  if (!voiceSelect) return;

  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = voice.name;
    voiceSelect.appendChild(option);
  });
}

populateVoices();

export async function speak(text: string) {
  return new Promise((resolve, reject) => {
    speech.text = text;
    speech.voice = speechSynthesis
      .getVoices()
      .find((voice) => voice.name === voiceSelect.value);
    speechSynthesis.speak(speech);
    console.log(speech);
    speech.addEventListener('mark', () => console.log('MARKD'));
    speech.addEventListener('end', resolve);
  });
}
