# NOX AI - Voice Assistant

NOX is an advanced AI voice assistant that uses cutting-edge language models and speech recognition technology to provide natural conversations and voice interactions.

![NOX AI Logo](https://i.ibb.co/D8rTXs4/logo.jpg)

## Features

- 🎙️ **Voice Recognition**: Advanced speech recognition with high accuracy
- 🤖 **Natural Language Processing**: Powered by OpenAI's GPT-3.5 model
- 🗣️ **Text-to-Speech**: High-quality voice synthesis using XTTS-v2
- 🌐 **Real-time Processing**: Instant responses with WebSocket communication
- 🎨 **Beautiful UI**: Modern, responsive interface with dark/light theme support
- 👥 **Multi-user Support**: Handles multiple concurrent users

## Tech Stack

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - WebSocket (Socket.IO)
  - Web Audio API
  - FontAwesome Icons
  - Inter & JetBrains Mono Fonts

- **Backend**:
  - Node.js
  - Express.js
  - Socket.IO
  - OpenAI API
  - Replicate API (XTTS-v2)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nox-assistant.git
   cd nox-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   REPLICATE_API_TOKEN=your_replicate_api_token
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit `http://localhost:3000`

## Usage

1. Click the "Start" button to begin voice interaction
2. Speak naturally to NOX
3. Wait for NOX's voice response
4. Click "Stop" when finished

## Project Structure

```
nox-assistant/
├── src/
│   ├── config/           # Configuration settings
│   ├── public/           # Static files
│   ├── services/         # API services
│   ├── speech/           # Voice processing
│   └── server/           # Express server
├── temp/                 # Temporary audio files
└── package.json
```

## Development

- **Start Development Server**
  ```bash
  npm run dev
  ```

- **Build for Production**
  ```bash
  npm run build
  ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for gpt-4o-mini
- Replicate for XTTS-v2
- All contributors and supporters

## Contact

For support or inquiries, please open an issue in the GitHub repository.

