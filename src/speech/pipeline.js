import { WhisperTranscriber } from './transcriber.js';
import { openAIService } from '../services/openai-service.js';
import { generateSpeech } from './services/replicate-service.js';
import { saveAudioFile } from './utils/audio-utils.js';

export function createAudioPipeline(socket) {
  const transcriber = new WhisperTranscriber();
  let shouldStop = false;

  return {
    async processAudio(audioData) {
      try {
        shouldStop = false;
        console.log('Starting audio processing pipeline...');

        // 1. Transcription with Whisper
        console.log('Step 1: Transcribing audio...');
        const transcript = await transcriber.transcribe(audioData);
        if (!transcript || transcript.trim().length === 0) {
          console.log('No valid transcription detected');
          return;
        }
        console.log('Transcription received:', transcript);

        // Check if it's a stop command
        if (transcript.toLowerCase().includes('stop')) {
          console.log('Stop command detected');
          shouldStop = true;
          socket.emit('stop-audio');
          return;
        }

        if (shouldStop) return;

        // 2. Generate response with OpenAI
        console.log('Step 2: Generating AI response...');
        const response = await openAIService.generateResponse(transcript);
        console.log('AI Response generated:', response);

        if (shouldStop) return;

        // 3. Speech synthesis with XTTS-v2
        console.log('Step 3: Generating speech with XTTS-v2...');
        const audioOutput = await generateSpeech(response);
        if (!audioOutput) {
          throw new Error('No audio output generated from XTTS-v2');
        }
        console.log('Speech generation completed');

        if (shouldStop) return;

        // 4. Save and send audio
        console.log('Step 4: Saving and sending audio response...');
        const { filename } = await saveAudioFile(audioOutput);
        const audioUrl = `/audio/${filename}`;
        console.log('Sending audio response to client:', audioUrl);
        socket.emit('audio', { url: audioUrl });
        console.log('Audio pipeline completed successfully');

      } catch (error) {
        console.error('Error in audio pipeline:', error);
        socket.emit('error', { message: 'Sorry, an error occurred during audio processing.' });
      }
    },

    cleanup() {
      shouldStop = true;
      socket.emit('stop-audio');
    }
  };
}