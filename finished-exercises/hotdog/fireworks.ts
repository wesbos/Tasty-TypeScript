import { tsParticles } from 'tsparticles-engine';
import { loadFireworksPreset } from 'tsparticles-preset-fireworks';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';

loadFireworksPreset(tsParticles);
export async function celebrate() {
  await loadConfettiPreset(tsParticles);
  const x = Math.round(window.innerWidth / 20);
  const y = 0;
  console.log(x, y);
  await tsParticles.load('tsparticles', {
    emitters: [
      {
        position: {
          x,
          y,
        },
        life: {
          duration: 20, // 20 seconds
          count: 0, // unlimited
        },
        rate: {
          quantity: 25,
          delay: 0,
        },
      },
    ],
    preset: 'confetti',
    particles: {
      color: {
        value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E'],
      },
    },
  });
}
