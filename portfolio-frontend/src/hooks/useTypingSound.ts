import { useState, useCallback } from 'react';

export const useTypingSound = () => {
    const [soundEnabled, setSoundEnabled] = useState(false);

    const playTypingSound = useCallback(() => {
        if (!soundEnabled) return;

        try {
            // Create a short, high-frequency click sound using Web Audio API
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime); // randomize slightly

            gain.gain.setValueAtTime(0.01, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            console.error("Audio block", e);
        }
    }, [soundEnabled]);

    const toggleSound = () => setSoundEnabled(prev => !prev);

    return { soundEnabled, playTypingSound, toggleSound };
};
