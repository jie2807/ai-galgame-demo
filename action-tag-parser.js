class ActionTagParser {
    constructor() {
        this.actionTagPattern = /\[([a-zA-Z_][a-zA-Z0-9_]*)(?::([a-zA-Z_][a-zA-Z0-9_]*))?\]/g;
        this.actionMapping = {
            'smile': { type: 'motion', value: 'smile', intensity: 1.0 },
            'laugh': { type: 'motion', value: 'laugh', intensity: 1.0 },
            'happy': { type: 'motion', value: 'happy', intensity: 1.0 },
            'sad': { type: 'motion', value: 'sad', intensity: 1.0 },
            'cry': { type: 'motion', value: 'cry', intensity: 1.0 },
            'angry': { type: 'motion', value: 'angry', intensity: 1.0 },
            'surprised': { type: 'motion', value: 'surprised', intensity: 1.0 },
            'shock': { type: 'motion', value: 'shock', intensity: 1.0 },
            'wave': { type: 'motion', value: 'wave', intensity: 1.0 },
            'nod': { type: 'motion', value: 'nod', intensity: 1.0 },
            'shake_head': { type: 'motion', value: 'shake_head', intensity: 1.0 },
            'bow': { type: 'motion', value: 'bow', intensity: 1.0 },
            'think': { type: 'motion', value: 'think', intensity: 1.0 },
            'idle': { type: 'motion', value: 'idle', intensity: 1.0 },
            'tap_body': { type: 'motion', value: 'tap_body', intensity: 1.0 },
            'flick_head': { type: 'motion', value: 'flick_head', intensity: 1.0 },
            'pinch_in': { type: 'motion', value: 'pinch_in', intensity: 1.0 },
            'pinch_out': { type: 'motion', value: 'pinch_out', intensity: 1.0 },
            'expression_0': { type: 'expression', value: 0, intensity: 1.0 },
            'expression_1': { type: 'expression', value: 1, intensity: 1.0 },
            'expression_2': { type: 'expression', value: 2, intensity: 1.0 },
            'expression_3': { type: 'expression', value: 3, intensity: 1.0 },
            'expression_4': { type: 'expression', value: 4, intensity: 1.0 },
            'expression_5': { type: 'expression', value: 5, intensity: 1.0 },
            'shy': { type: 'expression', value: 'shy', intensity: 0.6 },
            'proud': { type: 'expression', value: 'proud', intensity: 0.7 },
            'nervous': { type: 'expression', value: 'nervous', intensity: 0.5 },
            'point': { type: 'motion', value: 'point' },
            'clap': { type: 'motion', value: 'clap' },
            'look_away': { type: 'eye', value: 'look_away', paramX: 15, paramY: 0 },
            'look_down': { type: 'eye', value: 'look_down', paramX: 0, paramY: 10 },
            'look_at_player': { type: 'eye', value: 'look_at_player', paramX: 0, paramY: 0 }
        };
        this.fallbackAction = { type: 'motion', value: 'idle', intensity: 1.0 };
    }

    parse(content) {
        if (!content) {
            return { cleanContent: content, actions: [] };
        }

        const actions = [];
        const intensityModifiers = {
            'weak': 0.5,
            'medium': 0.75,
            'strong': 1.0
        };
        let match;

        while ((match = this.actionTagPattern.exec(content)) !== null) {
            const rawTag = match[1];
            const tag = rawTag.toLowerCase();
            const modifier = match[2] ? match[2].toLowerCase() : null;

            let action;
            if (this.actionMapping[tag]) {
                action = { ...this.actionMapping[tag] };
            } else {
                action = { ...this.fallbackAction };
            }

            action.tag = rawTag;

            if (modifier && intensityModifiers[modifier] !== undefined) {
                action.intensity = (action.intensity || 1.0) * intensityModifiers[modifier];
            }

            if (!action.intensity) {
                action.intensity = 1.0;
            }

            actions.push(action);
        }

        const cleanContent = content.replace(this.actionTagPattern, '').trim();

        return {
            cleanContent,
            actions
        };
    }

    parseAndExecute(content, live2dRenderer) {
        const result = this.parse(content);

        if (!live2dRenderer) {
            return result;
        }

        if (result.actions.length > 0) {
            result.actions.forEach(action => {
                if (action.type === 'motion') {
                    live2dRenderer.playMotion(action.value);
                } else if (action.type === 'expression') {
                    live2dRenderer.playExpression(action.value);
                } else if (action.type === 'eye') {
                    live2dRenderer.setParameterValueById('ParamAngleX', action.paramX * action.intensity);
                    live2dRenderer.setParameterValueById('ParamAngleY', action.paramY * action.intensity);
                }
            });
        }

        return result;
    }

    addMapping(tag, action) {
        this.actionMapping[tag.toLowerCase()] = action;
    }

    setFallbackAction(action) {
        this.fallbackAction = action;
    }
}
