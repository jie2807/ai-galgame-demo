/**
 * ScriptEngineBridge - Minimal stub implementation
 * Provides fallback when the full engine module is unavailable (e.g. non-file: protocol)
 */
export class ScriptEngineBridge {
    constructor() {
        this.messages = [];
        this._listeners = {};
        this.engine = {
            gameState: {
                setCurrentNPC: () => {},
                setMessages: () => {},
            },
            dialogueEngine: {
                isStreaming: false,
                addNarration: () => {},
            },
            cancelRequest: () => {},
        };
    }

    initialize() {
        console.log('[ScriptEngineBridge] Stub initialized');
    }

    setupGameData() {}

    on(event, callback) {
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(callback);
    }

    startGame() {}

    exitGame() {}

    getGameState() {
        return {
            currentNPCId: null,
            messages: this.messages,
            world: {
                location: null,
                weather: null,
                time: null,
                playerStatus: null,
            },
        };
    }

    sendMessage(userContent, onChunk, onComplete, onError) {
        if (onError) onError(new Error('ScriptEngineBridge stub: sendMessage not implemented'));
    }

    switchNPC() {}
}
