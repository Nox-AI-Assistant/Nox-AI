import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAudioPipeline } from '../speech/pipeline.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
export const io = new Server(server);

// Store user sessions
const userSessions = new Map();

app.use(express.static(join(__dirname, '../public')));
app.use('/audio', express.static(join(__dirname, '../../temp')));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Create a new audio pipeline instance for this user
  const userPipeline = createAudioPipeline(socket);
  userSessions.set(socket.id, {
    pipeline: userPipeline,
    isProcessing: false
  });

  socket.on('audio-data', async (audioData) => {
    const userSession = userSessions.get(socket.id);
    if (!userSession) return;

    try {
      if (userSession.isProcessing) {
        console.log('Already processing audio for user:', socket.id);
        return;
      }

      userSession.isProcessing = true;
      console.log('Processing audio for user:', socket.id);
      
      // Convert data to Buffer if needed
      const buffer = Buffer.isBuffer(audioData) ? audioData : Buffer.from(audioData);
      await userSession.pipeline.processAudio(buffer);
      
    } catch (error) {
      console.error('Error processing audio for user:', socket.id, error);
      socket.emit('error', { message: 'Error processing audio' });
    } finally {
      userSession.isProcessing = false;
    }
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    const userSession = userSessions.get(socket.id);
    if (userSession) {
      userSession.pipeline.cleanup();
      userSessions.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});