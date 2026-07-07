class Live2DRenderer {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.app = null;
        this.currentModel = null;
        this.isInitialized = false;
        this.isLoading = false;
        this.isModelLoaded = false;
        this.onLoadingStart = null;
        this.onLoadingComplete = null;
        this.onLoadingError = null;
        this._lipSyncAnimFrame = null;
        this._audioContext = null;
        this._analyser = null;
        this._lipSyncMode = null;
        this._textLipSyncTimer = null;
        this._eyeTrackingActive = false;
        this._eyeTargetX = 0;
        this._eyeTargetY = 0;
        this._eyeCurrentX = 0;
        this._eyeCurrentY = 0;
        this._eyeTrackingFrame = null;
        this._breathingFrame = null;
        this._blinkTimer = null;
        this._idleSuspended = false;
        this._lipSyncActive = false;
        this._paused = false;
    }

    async initialize() {
        if (this.isInitialized) {
            return;
        }

        const canvas = document.getElementById(this.canvasId);
        if (!canvas) {
            throw new Error('Canvas element not found: ' + this.canvasId);
        }

        if (typeof PIXI === 'undefined') {
            throw new Error('PixiJS is not loaded');
        }

        if (typeof PIXI.live2d === 'undefined') {
            throw new Error('pixi-live2d-display is not loaded');
        }

        const parent = canvas.parentElement;
        let w = parent ? parent.clientWidth : 0;
        let h = parent ? parent.clientHeight : 0;
        console.log('[Live2DRenderer] Canvas parent initial size:', w, 'x', h);

        if (w === 0 || h === 0) {
            console.log('[Live2DRenderer] Waiting for canvas parent to have size...');
            await new Promise((resolve) => {
                let elapsed = 0;
                const check = () => {
                    w = parent ? parent.clientWidth : 0;
                    h = parent ? parent.clientHeight : 0;
                    if (w > 0 && h > 0) {
                        console.log('[Live2DRenderer] Canvas parent now has size:', w, 'x', h);
                        resolve();
                    } else if (elapsed >= 10000) {
                        console.warn('[Live2DRenderer] Timeout waiting for canvas size, proceeding with fallback');
                        resolve();
                    } else {
                        elapsed += 100;
                        setTimeout(check, 100);
                    }
                };
                check();
            });
        }

        w = parent ? parent.clientWidth : 0;
        h = parent ? parent.clientHeight : 0;
        if (w === 0 || h === 0) {
            w = Math.max(300, window.innerWidth * 0.3);
            h = Math.max(400, window.innerHeight * 0.7);
            console.log('[Live2DRenderer] Using fallback size:', w, 'x', h);
        }

        this.app = new PIXI.Application({
            view: canvas,
            autoStart: true,
            width: w,
            height: h,
            transparent: true,
            antialias: true,
            backgroundAlpha: 0
        });

        console.log('[Live2DRenderer] PIXI.Application created, renderer size:', this.app.renderer.width, 'x', this.app.renderer.height);

        this.isInitialized = true;
        console.log('[Live2DRenderer] Initialized, PIXI version:', PIXI.VERSION);
    }

    async loadModel(modelUrl, options = {}) {
        if (!this.isInitialized) {
            await this.initialize();
        }

        if (this.isLoading) {
            console.warn('[Live2DRenderer] Model is already loading');
            return;
        }

        this.isLoading = true;
        this.isModelLoaded = false;

        const container = this.app.view.parentElement;
        let displayWidth = container ? container.clientWidth : 0;
        let displayHeight = container ? container.clientHeight : 0;

        if (displayWidth === 0 || displayHeight === 0) {
            displayWidth = this.app.renderer.width;
            displayHeight = this.app.renderer.height;
        }

        if (displayWidth === 0 || displayHeight === 0) {
            displayWidth = Math.max(300, window.innerWidth * 0.3);
            displayHeight = Math.max(400, window.innerHeight * 0.7);
        }

        console.log('[Live2DRenderer] Loading model, display size:', displayWidth, 'x', displayHeight);

        if (this.onLoadingStart) {
            this.onLoadingStart();
        }

        try {
            if (this.currentModel) {
                this.currentModel.removeAllListeners();
                this.app.stage.removeChild(this.currentModel);
                this.currentModel.destroy();
                this.currentModel = null;
            }

            console.log('[Live2DRenderer] Loading model from:', modelUrl);
            const model = await PIXI.live2d.Live2DModel.from(modelUrl, {
                autoInteract: options.autoInteract !== undefined ? options.autoInteract : true,
                ...options
            });

            this.currentModel = model;
            this.app.stage.addChild(model);

            const currentWidth = container ? container.clientWidth : displayWidth;
            const currentHeight = container ? container.clientHeight : displayHeight;
            const effectiveWidth = currentWidth > 0 ? currentWidth : displayWidth;
            const effectiveHeight = currentHeight > 0 ? currentHeight : displayHeight;

            const modelW = model.width || 300;
            const modelH = model.height || 500;
            const scale = Math.min(
                effectiveWidth / modelW,
                effectiveHeight / modelH
            ) * (options.scale || 0.85);

            model.anchor.set(0.5, 0.5);
            model.scale.set(scale);
            model.x = effectiveWidth / 2;
            model.y = effectiveHeight / 2;

            console.log('[Live2DRenderer] Model placed - scale:', scale.toFixed(3), 'pos:', model.x.toFixed(0) + ',' + model.y.toFixed(0), 'display:', effectiveWidth + 'x' + effectiveHeight);

            this.isModelLoaded = true;

            if (this.onLoadingComplete) {
                this.onLoadingComplete(model);
            }

            console.log('[Live2DRenderer] Model loaded successfully:', model.internalModel?.name || 'unknown');
            return model;
        } catch (error) {
            console.error('[Live2DRenderer] Failed to load model:', error);
            if (this.onLoadingError) {
                this.onLoadingError(error);
            }
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    resize() {
        if (!this.app || !this.currentModel) return;

        const container = this.app.view.parentElement;
        if (!container) return;

        const currentWidth = container.clientWidth;
        const currentHeight = container.clientHeight;
        if (currentWidth === 0 || currentHeight === 0) return;

        this.app.renderer.resize(currentWidth, currentHeight);

        const origW = this.currentModel.width / this.currentModel.scale.x;
        const origH = this.currentModel.height / this.currentModel.scale.y;
        const scale = Math.min(
            currentWidth / origW,
            currentHeight / origH
        ) * 0.85;

        this.currentModel.anchor.set(0.5, 0.5);
        this.currentModel.scale.set(scale);
        this.currentModel.x = currentWidth / 2;
        this.currentModel.y = currentHeight / 2;

        console.log('[Live2DRenderer] Resized to:', currentWidth, 'x', currentHeight);
    }

    unloadModel() {
        this.stopLipSync();
        this.stopTextLipSync();
        this.stopEyeTracking();
        this.stopBreathing();
        this.stopBlinking();
        if (this.currentModel) {
            this.currentModel.removeAllListeners();
            if (this.app && this.app.stage) {
                this.app.stage.removeChild(this.currentModel);
            }
            this.currentModel.destroy();
            this.currentModel = null;
            this.isModelLoaded = false;
            this.isLoading = false;
            console.log('[Live2DRenderer] Model unloaded');
        }
    }

    playMotion(motionName, priority = 2) {
        if (!this.currentModel) {
            console.warn('[Live2DRenderer] No model loaded');
            return false;
        }

        try {
            this.currentModel.motion(motionName, priority);
            return true;
        } catch (error) {
            console.warn(`[Live2DRenderer] Motion "${motionName}" failed:`, error.message);
            return false;
        }
    }

    playExpression(expressionIndex) {
        if (!this.currentModel) {
            console.warn('[Live2DRenderer] No model loaded');
            return false;
        }

        try {
            this.currentModel.expression(expressionIndex);
            return true;
        } catch (error) {
            console.warn(`[Live2DRenderer] Expression ${expressionIndex} failed:`, error.message);
            return false;
        }
    }

    getAvailableMotions() {
        if (!this.currentModel || !this.currentModel.internalModel) {
            return [];
        }

        const settings = this.currentModel.internalModel.settings;
        if (settings && settings.motions) {
            return Object.keys(settings.motions);
        }
        return [];
    }

    getAvailableExpressions() {
        if (!this.currentModel || !this.currentModel.internalModel) {
            return [];
        }

        const settings = this.currentModel.internalModel.settings;
        if (settings && settings.expressions) {
            return settings.expressions.map((exp, i) => ({
                index: i,
                name: exp.name || `Expression ${i}`
            }));
        }
        return [];
    }

    getModelName() {
        if (!this.currentModel || !this.currentModel.internalModel) {
            return null;
        }
        return this.currentModel.internalModel.name;
    }

    setParameterValueById(paramId, value) {
        if (!this.currentModel || !this.currentModel.internalModel || !this.currentModel.internalModel.coreModel) {
            return;
        }
        const coreModel = this.currentModel.internalModel.coreModel;
        value = Math.max(-1, Math.min(1, value));
        try {
            coreModel.setParameterValueById(paramId, value);
        } catch (e) {}
    }

    startLipSync(audioSource) {
        this.stopLipSync();
        if (!this.currentModel) return;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) {
                this._lipSyncMode = 'text';
                return;
            }
            this._audioContext = new AudioCtx();
            this._analyser = this._audioContext.createAnalyser();
            this._analyser.fftSize = 256;
            const source = this._audioContext.createMediaStreamSource(audioSource);
            source.connect(this._analyser);
            this._lipSyncActive = true;
            const dataArray = new Uint8Array(this._analyser.fftSize);
            const updateLipSync = () => {
                if (!this._lipSyncActive) return;
                this._analyser.getByteTimeDomainData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    const v = (dataArray[i] - 128) / 128;
                    sum += v * v;
                }
                const rms = Math.sqrt(sum / dataArray.length);
                const mouthOpen = Math.min(1, rms * 5);
                this.setParameterValueById('ParamMouthOpenY', mouthOpen);
                this._lipSyncAnimFrame = requestAnimationFrame(updateLipSync);
            };
            this._lipSyncAnimFrame = requestAnimationFrame(updateLipSync);
        } catch (e) {
            this._lipSyncMode = 'text';
        }
    }

    stopLipSync() {
        this._lipSyncActive = false;
        if (this._lipSyncAnimFrame) {
            cancelAnimationFrame(this._lipSyncAnimFrame);
            this._lipSyncAnimFrame = null;
        }
        this.setParameterValueById('ParamMouthOpenY', 0);
        if (this._audioContext) {
            try {
                this._audioContext.close();
            } catch (e) {}
            this._audioContext = null;
        }
        this._analyser = null;
    }

    startTextLipSync(text) {
        this.stopTextLipSync();
        if (!this.currentModel || !text) return;
        let i = 0;
        this._textLipSyncTimer = setInterval(() => {
            if (i >= text.length) {
                this.stopTextLipSync();
                return;
            }
            const ch = text[i];
            if (ch === '。' || ch === '，' || ch === '.' || ch === ',') {
                this.setParameterValueById('ParamMouthOpenY', 0);
                setTimeout(() => {
                    this.setParameterValueById('ParamMouthOpenY', 0);
                }, 300);
            } else {
                const open = 0.4 + Math.random() * 0.4;
                this.setParameterValueById('ParamMouthOpenY', open);
            }
            i++;
        }, 150);
    }

    stopTextLipSync() {
        if (this._textLipSyncTimer) {
            clearInterval(this._textLipSyncTimer);
            this._textLipSyncTimer = null;
        }
        this.setParameterValueById('ParamMouthOpenY', 0);
    }

    startEyeTracking() {
        this.stopEyeTracking();
        if (!this.currentModel) return;
        const canvas = this.app.view;
        const container = canvas.parentElement;
        if (!container) return;
        this._eyeTrackingActive = true;
        this._eyeCurrentX = 0;
        this._eyeCurrentY = 0;
        this._eyeTargetX = 0;
        this._eyeTargetY = 0;
        this._eyeTrackingContainer = container;
        const onMove = (e) => {
            if (!this._eyeTrackingActive) return;
            const rect = canvas.getBoundingClientRect();
            let clientX, clientY;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            this._eyeTargetX = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width / 2)));
            this._eyeTargetY = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height / 2)));
        };
        container.addEventListener('mousemove', onMove);
        container.addEventListener('touchmove', onMove);
        this._eyeTrackingHandler = onMove;
        const lerp = (a, b, t) => a + (b - a) * t;
        const updateTracking = () => {
            if (!this._eyeTrackingActive) return;
            this._eyeCurrentX = lerp(this._eyeCurrentX, this._eyeTargetX, 0.1);
            this._eyeCurrentY = lerp(this._eyeCurrentY, this._eyeTargetY, 0.1);
            this.setParameterValueById('ParamAngleX', this._eyeCurrentX * 30);
            this.setParameterValueById('ParamAngleY', -this._eyeCurrentY * 30);
            this.setParameterValueById('ParamEyeBallX', this._eyeCurrentX);
            this.setParameterValueById('ParamEyeBallY', -this._eyeCurrentY);
            this.setParameterValueById('ParamBodyAngleX', this._eyeCurrentX * 10);
            this._eyeTrackingFrame = requestAnimationFrame(updateTracking);
        };
        this._eyeTrackingFrame = requestAnimationFrame(updateTracking);
    }

    stopEyeTracking() {
        this._eyeTrackingActive = false;
        if (this._eyeTrackingFrame) {
            cancelAnimationFrame(this._eyeTrackingFrame);
            this._eyeTrackingFrame = null;
        }
        if (this._eyeTrackingHandler) {
            const container = this._eyeTrackingContainer;
            if (container) {
                container.removeEventListener('mousemove', this._eyeTrackingHandler);
                container.removeEventListener('touchmove', this._eyeTrackingHandler);
            }
            this._eyeTrackingHandler = null;
            this._eyeTrackingContainer = null;
        }
        this.setParameterValueById('ParamAngleX', 0);
        this.setParameterValueById('ParamAngleY', 0);
        this.setParameterValueById('ParamEyeBallX', 0);
        this.setParameterValueById('ParamEyeBallY', 0);
        this.setParameterValueById('ParamBodyAngleX', 0);
        this._eyeTargetX = 0;
        this._eyeTargetY = 0;
        this._eyeCurrentX = 0;
        this._eyeCurrentY = 0;
    }

    startBreathing() {
        this.stopBreathing();
        if (!this.currentModel) return;
        const updateBreathing = (timestamp) => {
            if (!this.currentModel) return;
            const breath = Math.sin(timestamp / 1000 * Math.PI * 0.5) * 0.5 + 0.5;
            const bodyAngleZ = Math.sin(timestamp / 3000) * 3;
            this.setParameterValueById('ParamBreath', breath);
            this.setParameterValueById('ParamBodyAngleZ', bodyAngleZ);
            this._breathingFrame = requestAnimationFrame(updateBreathing);
        };
        this._breathingFrame = requestAnimationFrame(updateBreathing);
    }

    stopBreathing() {
        if (this._breathingFrame) {
            cancelAnimationFrame(this._breathingFrame);
            this._breathingFrame = null;
        }
    }

    startBlinking() {
        this.stopBlinking();
        if (!this.currentModel) return;
        const scheduleBlink = () => {
            const delay = 2000 + Math.random() * 3000;
            this._blinkTimer = setTimeout(() => {
                if (!this.currentModel) return;
                this.setParameterValueById('ParamEyeLOpen', 0);
                this.setParameterValueById('ParamEyeROpen', 0);
                setTimeout(() => {
                    this.setParameterValueById('ParamEyeLOpen', 1);
                    this.setParameterValueById('ParamEyeROpen', 1);
                    scheduleBlink();
                }, 100);
            }, delay);
        };
        scheduleBlink();
    }

    stopBlinking() {
        if (this._blinkTimer) {
            clearTimeout(this._blinkTimer);
            this._blinkTimer = null;
        }
    }

    suspendIdleAnimations() {
        this.stopBreathing();
        this.stopBlinking();
        this._idleSuspended = true;
    }

    pause() {
        if (this.app && this.app.ticker) {
            this.app.ticker.stop();
        }
        this.stopBreathing();
        this.stopBlinking();
        this.stopEyeTracking();
        this.stopLipSync();
        this.stopTextLipSync();
        this._paused = true;
        console.log('[Live2DRenderer] Paused');
    }

    resume() {
        if (this.app && this.app.ticker) {
            this.app.ticker.start();
        }
        if (this._paused) {
            this.startBreathing();
            this.startBlinking();
            this.startEyeTracking();
            this._paused = false;
        }
        console.log('[Live2DRenderer] Resumed');
    }

    resumeIdleAnimations() {
        if (this._idleSuspended) return;
        this.startBreathing();
        this.startBlinking();
        this._idleSuspended = false;
    }

    setPosition(x, y) {
        if (this.currentModel) {
            this.currentModel.x = x;
            this.currentModel.y = y;
        }
    }

    moveBy(dx, dy) {
        if (this.currentModel) {
            this.currentModel.x += dx;
            this.currentModel.y += dy;
        }
    }

    getPosition() {
        if (this.currentModel) {
            return { x: this.currentModel.x, y: this.currentModel.y };
        }
        return { x: 0, y: 0 };
    }

    setScale(scale) {
        if (this.currentModel) {
            this.currentModel.scale.set(scale);
        }
    }

    getScale() {
        if (this.currentModel && this.currentModel.scale) {
            return this.currentModel.scale.x;
        }
        return 1;
    }

    destroy() {
        this.stopLipSync();
        this.stopTextLipSync();
        this.stopEyeTracking();
        this.stopBreathing();
        this.stopBlinking();
        this.unloadModel();
        if (this.app) {
            this.app.destroy(true);
            this.app = null;
        }
        this.isInitialized = false;
        console.log('[Live2DRenderer] Destroyed');
    }
}
