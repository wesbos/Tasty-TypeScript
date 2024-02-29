import { tsParticles } from 'tsparticles-engine';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';

export async function celebrate() {
  await loadConfettiPreset(tsParticles);
  await tsParticles.load('tsparticles', {
    emitters: [
      {
        position: {
          x: 50,
          y: 0,
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

window.celebrate = celebrate;
