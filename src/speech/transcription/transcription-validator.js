export class TranscriptionValidator {
  constructor() {
    // Words or phrases to ignore
    this.invalidPatterns = [
      'subtitles',
      'amara.org',
      'community',
      'created by',
      'translated by',
      'transcribed by',
      'translation',
      'transcription'
    ];
    
    // Minimum length for valid transcription
    this.minLength = 2;
  }

  isValid(transcript) {
    if (!transcript || typeof transcript !== 'string') {
      return false;
    }

    const text = transcript.toLowerCase().trim();
    
    // Check minimum length
    if (text.length < this.minLength) {
      return false;
    }

    // Check invalid patterns
    for (const pattern of this.invalidPatterns) {
      if (text.includes(pattern.toLowerCase())) {
        console.log(`Invalid transcription detected: ${text}`);
        return false;
      }
    }

    return true;
  }

  clean(transcript) {
    if (!transcript) return '';
    
    // Clean special characters and multiple spaces
    let cleaned = transcript
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\u00C0-\u017F]/g, ''); // Keep letters, numbers, spaces and accents
      
    return cleaned;
  }
}