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
  return new Promise((resolve) => {
    speech.text = text;
    const voice = speechSynthesis
      .getVoices()
      .find((singleVoice) => singleVoice.name === voiceSelect?.value);

    if (voice) speech.voice = voice;
    speechSynthesis.speak(speech);
    console.log(speech);
    speech.addEventListener('mark', () => console.log('MARKED'));
    speech.addEventListener('end', resolve);
  });
}
