export default class MemoryHandler {
  constructor(limit = 20) {
    this.memory = [];
    this.limit = limit;
  }

  store(message) {
    this.memory.push(message);
    if (this.memory.length > this.limit) {
      this.memory.shift();
    }
  }

  buildPrompt(latestMessages) {
    const memoryContext = this.memory
      .map(m => `${m.sender === 'user' ? 'You' : 'Diabot'}: ${m.text}`)
      .join('\n');
    const current = latestMessages
      .map(m => `${m.sender === 'user' ? 'You' : 'Diabot'}: ${m.text}`)
      .join('\n');

    return `${memoryContext}\n${current}`;
  }
}