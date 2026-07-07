/**
 * SpriteSheetRenderer - 精灵图帧动画渲染器
 * 基于 PIXI.AnimatedSprite 实现，兼容 file:// 协议
 * 支持多动作、多方向帧动画
 */
class SpriteSheetRenderer {
    constructor(containerId) {
        this.containerId = containerId;
        this.app = null;
        this.currentSprite = null;
        this.isInitialized = false;
        this.isModelLoaded = false;
        this.isLoading = false;
        this.onLoadingComplete = null;
        this.onLoadingError = null;

        // 当前模型数据
        this._modelData = null;
        this._textures = {};        // 动作名 -> [PIXI.Texture]
        this._animConfig = {};      // 动作名 -> { frames, speed, loop }
        this._currentAction = null;
    }

    async initialize() {
        if (this.isInitialized) return;
        const container = document.getElementById(this.containerId);
        if (!container) throw new Error('Container not found: ' + this.containerId);

        await new Promise(resolve => {
            const check = () => {
                const rect = container.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) resolve();
                else requestAnimationFrame(check);
            };
            check();
        });

        const rect = container.getBoundingClientRect();
        this.app = new PIXI.Application({
            width: rect.width,
            height: rect.height,
            backgroundAlpha: 0,
            antialias: true,
            autoStart: true
        });
        container.appendChild(this.app.view);
        this.isInitialized = true;
    }

    /**
     * 加载精灵图模型
     * @param {string} modelKey - 模型标识，对应 SPRITE_MODEL_DATA 中的键
     * @param {object} options - 可选参数 { scale }
     */
    async loadModel(modelKey, options = {}) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        if (this.isLoading) throw new Error('Already loading');
        this.isLoading = true;

        try {
            // 清理旧模型
            if (this.currentSprite) {
                this.app.stage.removeChild(this.currentSprite);
                this.currentSprite.destroy();
                this.currentSprite = null;
            }
            this._textures = {};
            this._animConfig = {};

            // 获取模型数据
            if (typeof SPRITE_MODEL_DATA === 'undefined' || !SPRITE_MODEL_DATA[modelKey]) {
                throw new Error('模型数据未找到: ' + modelKey);
            }
            this._modelData = SPRITE_MODEL_DATA[modelKey];

            // 加载精灵图纹理
            const baseTexture = await this._loadBaseTexture(this._modelData.textureBase64);
            const spriteSheet = this._modelData.spriteSheet;

            // 解析精灵图，为每个动作创建纹理帧数组
            for (const actionName in spriteSheet.animations) {
                const animData = spriteSheet.animations[actionName];
                const frames = [];

                for (const frameRef of animData.frames) {
                    const frameData = spriteSheet.frames[frameRef];
                    if (!frameData) {
                        console.warn('[SpriteRenderer] Frame not found:', frameRef);
                        continue;
                    }
                    const texture = new PIXI.Texture(
                        baseTexture,
                        new PIXI.Rectangle(frameData.x, frameData.y, frameData.w, frameData.h)
                    );
                    frames.push(texture);
                }

                this._textures[actionName] = frames;
                this._animConfig[actionName] = {
                    speed: animData.speed || 0.1,
                    loop: animData.loop !== false
                };
            }

            // 创建 AnimatedSprite，默认播放 idle
            const defaultAction = this._modelData.defaultAction || 'idle';
            const defaultFrames = this._textures[defaultAction] || Object.values(this._textures)[0];
            if (!defaultFrames || defaultFrames.length === 0) {
                throw new Error('没有可用的动画帧');
            }

            this.currentSprite = new PIXI.AnimatedSprite(defaultFrames);
            this.currentSprite.animationSpeed = this._animConfig[defaultAction]?.speed || 0.1;
            this.currentSprite.loop = this._animConfig[defaultAction]?.loop !== false;
            this.currentSprite.anchor.set(0.5, 1.0); // 底部中心对齐

            // 缩放适配容器
            const scale = options.scale || this._calcFitScale();
            this.currentSprite.scale.set(scale);

            // 居中放置
            this._centerSprite();

            this.app.stage.addChild(this.currentSprite);
            this.currentSprite.play();

            this._currentAction = defaultAction;
            this.isModelLoaded = true;
            this.isLoading = false;
            if (this.onLoadingComplete) this.onLoadingComplete();
        } catch (e) {
            this.isLoading = false;
            if (this.onLoadingError) this.onLoadingError(e);
            throw e;
        }
    }

    /**
     * 播放指定动作
     */
    playAnimation(name, loop = true) {
        if (!this.currentSprite) return;
        const frames = this._textures[name];
        if (!frames || frames.length === 0) {
            console.warn('[SpriteRenderer] Animation not found:', name);
            return;
        }

        this.currentSprite.textures = frames;
        this.currentSprite.animationSpeed = this._animConfig[name]?.speed || 0.1;
        this.currentSprite.loop = loop;
        this.currentSprite.gotoAndPlay(0);
        this._currentAction = name;
    }

    /**
     * 添加动作到队列（精灵图方案中简化为直接切换）
     */
    addAnimation(name, loop = true, delay = 0) {
        if (delay > 0) {
            setTimeout(() => this.playAnimation(name, loop), delay * 1000);
        } else {
            this.playAnimation(name, loop);
        }
    }

    stopAnimation() {
        if (!this.currentSprite) return;
        this.currentSprite.stop();
    }

    /**
     * 精灵图方案不支持骨骼操作，提供空实现保持接口兼容
     */
    setBoneRotation(boneName, rotation) { /* not supported */ }
    setBonePosition(boneName, x, y) { /* not supported */ }
    resetPose() {
        this.playAnimation(this._modelData?.defaultAction || 'idle', true);
    }

    /**
     * 精灵图方案中皮肤通过不同精灵图集实现
     */
    setSkin(name) {
        // 可扩展：切换不同精灵图集
        console.log('[SpriteRenderer] Skin switch not yet implemented for:', name);
    }

    getAvailableAnimations() {
        return Object.keys(this._textures);
    }

    getAnimationLabels() {
        const labels = {};
        for (const key in this._textures) {
            labels[key] = this._modelData?.spriteSheet?.animations[key]?.label || key;
        }
        return labels;
    }

    getAvailableBones() {
        return []; // 精灵图方案无骨骼
    }

    getAvailableSkins() {
        return this._modelData?.skins || [];
    }

    getActionKeywordMap() {
        return this._modelData?.actionKeywordMap || {};
    }

    resize() {
        if (!this.app || !this.currentSprite) return;
        const container = document.getElementById(this.containerId);
        if (!container) return;
        const rect = container.getBoundingClientRect();
        this.app.renderer.resize(rect.width, rect.height);
        const scale = this._calcFitScale();
        this.currentSprite.scale.set(scale);
        this._centerSprite();
    }

    destroy() {
        if (this.currentSprite) {
            if (this.app && this.app.stage) this.app.stage.removeChild(this.currentSprite);
            this.currentSprite.destroy();
            this.currentSprite = null;
        }
        // 销毁纹理
        for (const key in this._textures) {
            this._textures[key].forEach(t => t.destroy());
        }
        this._textures = {};
        this._animConfig = {};
        if (this.app) {
            this.app.destroy(true, { children: true, texture: true });
            this.app = null;
        }
        this.isInitialized = false;
        this.isModelLoaded = false;
        this.isLoading = false;
        this._modelData = null;
    }

    // ========== 内部方法 ==========

    _loadBaseTexture(base64DataUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const baseTexture = new PIXI.BaseTexture(img);
                resolve(baseTexture);
            };
            img.onerror = (e) => reject(new Error('精灵图纹理加载失败: ' + (e.message || e)));
            img.src = base64DataUrl;
        });
    }

    _calcFitScale() {
        if (!this.currentSprite || !this.app) return 1;
        const containerRect = this.app.screen;
        const spriteW = this.currentSprite.texture.width;
        const spriteH = this.currentSprite.texture.height;
        if (spriteW === 0 || spriteH === 0) return 1;
        const scaleX = (containerRect.width * 0.8) / spriteW;
        const scaleY = (containerRect.height * 0.8) / spriteH;
        return Math.min(scaleX, scaleY);
    }

    _centerSprite() {
        if (!this.currentSprite || !this.app) return;
        const containerRect = this.app.screen;
        this.currentSprite.x = containerRect.width / 2;
        this.currentSprite.y = containerRect.height * 0.9; // 底部偏上
    }
}
