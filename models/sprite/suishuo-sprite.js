/**
 * 精灵图模型数据 - 角色帧动画
 * 使用 Canvas 动态生成精灵图纹理，无需外部图片文件
 * 完全兼容 file:// 协议
 */
var SPRITE_MODEL_DATA = {};

(function() {
    'use strict';

    // ========== 精灵图生成器 ==========
    // 使用 Canvas 绘制简单的人物角色帧动画

    var FRAME_W = 128;
    var FRAME_H = 192;
    var COLS = 8;
    var ROWS = 12;

    /**
     * 绘制一个简单的人物角色
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - 帧左上角x
     * @param {number} y - 帧左上角y
     * @param {object} pose - 姿势参数
     */
    function drawCharacter(ctx, x, y, pose) {
        var cx = x + FRAME_W / 2;
        var baseY = y + FRAME_H - 8;

        var headOffX = (pose.headX || 0) * 2;
        var headOffY = (pose.headY || 0) * 2;
        var bodyLean = pose.bodyLean || 0;
        var leftArmAngle = pose.leftArmAngle || 0;
        var rightArmAngle = pose.rightArmAngle || 0;
        var leftLegAngle = pose.leftLegAngle || 0;
        var rightLegAngle = pose.rightLegAngle || 0;
        var eyeState = pose.eyeState || 'open';
        var mouthState = pose.mouthState || 'smile';

        // 颜色
        var hairColor = '#4a2c6e';
        var hairColorLight = '#6b4a8e';
        var hairColorDark = '#2a1650';
        var skinColor = '#fce4c8';
        var skinShadow = '#e8c8a8';
        var dressColor = '#6b3fa0';
        var dressColor2 = '#8b5fc0';
        var dressColor3 = '#5a2e88';
        var dressHighlight = '#a87fd0';
        var shoeColor = '#3a2060';
        var eyeColor = '#6b3fa0';
        var outlineColor = 'rgba(30, 15, 40, 0.4)';

        ctx.save();
        ctx.translate(cx, baseY);

        // 身体倾斜
        ctx.rotate(bodyLean * Math.PI / 180);

        // ---- 阴影 ----
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.ellipse(0, -2, 18, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // ---- 腿 ----
        ctx.save();
        // 左腿
        ctx.save();
        ctx.translate(-12, -40);
        ctx.rotate(leftLegAngle * Math.PI / 180);
        // 腿部轮廓
        ctx.fillStyle = skinShadow;
        ctx.fillRect(-4, 2, 8, 30);
        ctx.fillStyle = skinColor;
        ctx.fillRect(-3, 0, 6, 28);
        // 腿部阴影
        ctx.fillStyle = skinShadow;
        ctx.fillRect(1, 0, 2, 28);
        // 鞋子
        ctx.fillStyle = shoeColor;
        ctx.beginPath();
        ctx.moveTo(-5, 26);
        ctx.lineTo(-5, 32);
        ctx.quadraticCurveTo(-5, 34, -2, 34);
        ctx.lineTo(5, 34);
        ctx.quadraticCurveTo(7, 34, 7, 32);
        ctx.lineTo(6, 26);
        ctx.closePath();
        ctx.fill();
        // 鞋子高光
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(-3, 27, 4, 3);
        // 鞋子轮廓
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();

        // 右腿
        ctx.save();
        ctx.translate(12, -40);
        ctx.rotate(rightLegAngle * Math.PI / 180);
        ctx.fillStyle = skinShadow;
        ctx.fillRect(-4, 2, 8, 30);
        ctx.fillStyle = skinColor;
        ctx.fillRect(-3, 0, 6, 28);
        ctx.fillStyle = skinShadow;
        ctx.fillRect(1, 0, 2, 28);
        ctx.fillStyle = shoeColor;
        ctx.beginPath();
        ctx.moveTo(-5, 26);
        ctx.lineTo(-5, 32);
        ctx.quadraticCurveTo(-5, 34, -2, 34);
        ctx.lineTo(5, 34);
        ctx.quadraticCurveTo(7, 34, 7, 32);
        ctx.lineTo(6, 26);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(-3, 27, 4, 3);
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
        ctx.restore();

        // ---- 身体/裙子 ----
        // 裙子阴影
        ctx.fillStyle = dressColor3;
        ctx.beginPath();
        ctx.moveTo(-18, -20);
        ctx.quadraticCurveTo(-20, -10, -22, 0);
        ctx.lineTo(22, 0);
        ctx.quadraticCurveTo(20, -10, 18, -20);
        ctx.closePath();
        ctx.fill();

        // 裙子主体
        ctx.fillStyle = dressColor;
        ctx.beginPath();
        ctx.moveTo(-16, -20);
        ctx.quadraticCurveTo(-18, -10, -20, 0);
        ctx.lineTo(20, 0);
        ctx.quadraticCurveTo(18, -10, 16, -20);
        ctx.closePath();
        ctx.fill();

        // 裙子褶皱
        ctx.strokeStyle = dressColor3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-8, -18);
        ctx.quadraticCurveTo(-10, -8, -12, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.quadraticCurveTo(0, -10, 0, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(8, -18);
        ctx.quadraticCurveTo(10, -8, 12, 0);
        ctx.stroke();

        // 裙子高光
        ctx.fillStyle = dressHighlight;
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.moveTo(-4, -20);
        ctx.quadraticCurveTo(-6, -10, -8, 0);
        ctx.lineTo(-2, 0);
        ctx.quadraticCurveTo(0, -10, 0, -20);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        // 裙子轮廓
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-16, -20);
        ctx.quadraticCurveTo(-18, -10, -20, 0);
        ctx.lineTo(20, 0);
        ctx.quadraticCurveTo(18, -10, 16, -20);
        ctx.closePath();
        ctx.stroke();

        // 上身
        ctx.fillStyle = dressColor2;
        ctx.beginPath();
        ctx.moveTo(-14, -36);
        ctx.lineTo(-16, -20);
        ctx.lineTo(16, -20);
        ctx.lineTo(14, -36);
        ctx.closePath();
        ctx.fill();

        // 上身阴影
        ctx.fillStyle = dressColor;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(2, -36, 12, 16);
        ctx.globalAlpha = 1;

        // 上身轮廓
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-14, -36);
        ctx.lineTo(-16, -20);
        ctx.lineTo(16, -20);
        ctx.lineTo(14, -36);
        ctx.closePath();
        ctx.stroke();

        // 领口装饰
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(-6, -36);
        ctx.quadraticCurveTo(-2, -32, 0, -30);
        ctx.quadraticCurveTo(2, -32, 6, -36);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(200,180,220,0.5)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // 领口丝带
        ctx.fillStyle = '#c44a3a';
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.lineTo(-4, -26);
        ctx.lineTo(0, -28);
        ctx.lineTo(4, -26);
        ctx.closePath();
        ctx.fill();

        // ---- 手臂 ----
        // 左臂
        ctx.save();
        ctx.translate(-14, -34);
        ctx.rotate(leftArmAngle * Math.PI / 180);
        // 袖子
        ctx.fillStyle = dressColor2;
        ctx.fillRect(-4, 0, 8, 8);
        // 手臂
        ctx.fillStyle = skinColor;
        ctx.fillRect(-3, 6, 6, 22);
        // 手臂阴影
        ctx.fillStyle = skinShadow;
        ctx.fillRect(1, 6, 2, 22);
        // 手
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(0, 30, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        // 手指轮廓
        ctx.strokeStyle = skinShadow;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-2, 33);
        ctx.quadraticCurveTo(-3, 35, -1, 35);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 34);
        ctx.quadraticCurveTo(1, 36, 2, 35);
        ctx.stroke();
        // 袖口装饰
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.4;
        ctx.fillRect(-4, 6, 8, 2);
        ctx.globalAlpha = 1;
        ctx.restore();

        // 右臂
        ctx.save();
        ctx.translate(14, -34);
        ctx.rotate(rightArmAngle * Math.PI / 180);
        ctx.fillStyle = dressColor2;
        ctx.fillRect(-4, 0, 8, 8);
        ctx.fillStyle = skinColor;
        ctx.fillRect(-3, 6, 6, 22);
        ctx.fillStyle = skinShadow;
        ctx.fillRect(1, 6, 2, 22);
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(0, 30, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = skinShadow;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-2, 33);
        ctx.quadraticCurveTo(-3, 35, -1, 35);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 34);
        ctx.quadraticCurveTo(1, 36, 2, 35);
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.4;
        ctx.fillRect(-4, 6, 8, 2);
        ctx.globalAlpha = 1;
        ctx.restore();

        // ---- 头 ----
        var headX = headOffX;
        var headY = -68 + headOffY;

        // 头发（后层）- 长发
        ctx.fillStyle = hairColorDark;
        ctx.beginPath();
        ctx.ellipse(headX - 2, headY + 16, 20, 28, -0.05, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(headX + 2, headY + 16, 20, 28, 0.05, 0, Math.PI * 2);
        ctx.fill();

        // 头发后层主体
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.ellipse(headX, headY - 2, 22, 26, 0, 0, Math.PI * 2);
        ctx.fill();

        // 脸
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.ellipse(headX, headY + 4, 17, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        // 脸部阴影
        ctx.fillStyle = skinShadow;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.ellipse(headX + 4, headY + 8, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // 头发（前层/刘海）
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.ellipse(headX, headY - 8, 20, 14, 0, Math.PI, Math.PI * 2);
        ctx.fill();

        // 刘海细节 - 多层
        ctx.fillStyle = hairColorLight;
        ctx.beginPath();
        ctx.moveTo(headX - 18, headY - 2);
        ctx.quadraticCurveTo(headX - 14, headY + 6, headX - 8, headY - 1);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(headX + 18, headY - 2);
        ctx.quadraticCurveTo(headX + 14, headY + 6, headX + 8, headY - 1);
        ctx.closePath();
        ctx.fill();

        // 中间刘海
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.moveTo(headX - 6, headY - 10);
        ctx.quadraticCurveTo(headX - 2, headY + 2, headX + 2, headY - 2);
        ctx.quadraticCurveTo(headX + 4, headY + 4, headX + 6, headY - 10);
        ctx.closePath();
        ctx.fill();

        // 头发高光
        ctx.fillStyle = hairColorLight;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.ellipse(headX - 6, headY - 10, 8, 4, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // 头发光泽条纹
        ctx.strokeStyle = 'rgba(180, 150, 220, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(headX - 10, headY - 12);
        ctx.quadraticCurveTo(headX - 8, headY - 6, headX - 12, headY + 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(headX + 8, headY - 12);
        ctx.quadraticCurveTo(headX + 10, headY - 4, headX + 14, headY + 4);
        ctx.stroke();

        // 侧发
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.moveTo(headX - 18, headY - 4);
        ctx.quadraticCurveTo(headX - 22, headY + 10, headX - 18, headY + 30);
        ctx.quadraticCurveTo(headX - 16, headY + 20, headX - 14, headY + 4);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(headX + 18, headY - 4);
        ctx.quadraticCurveTo(headX + 22, headY + 10, headX + 18, headY + 30);
        ctx.quadraticCurveTo(headX + 16, headY + 20, headX + 14, headY + 4);
        ctx.closePath();
        ctx.fill();

        // 眼睛
        if (eyeState === 'open') {
            // 眼白
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.ellipse(headX - 7, headY + 3, 5.5, 6.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(headX + 7, headY + 3, 5.5, 6.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // 虹膜
            ctx.fillStyle = eyeColor;
            ctx.beginPath();
            ctx.ellipse(headX - 7, headY + 4, 4, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(headX + 7, headY + 4, 4, 5, 0, 0, Math.PI * 2);
            ctx.fill();

            // 瞳孔
            ctx.fillStyle = '#1a0a30';
            ctx.beginPath();
            ctx.arc(headX - 7, headY + 4.5, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX + 7, headY + 4.5, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // 高光
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.ellipse(headX - 5.5, headY + 2, 2, 1.5, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(headX + 8.5, headY + 2, 2, 1.5, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX - 8, headY + 5, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(headX + 6, headY + 5, 1, 0, Math.PI * 2);
            ctx.fill();

            // 上眼线
            ctx.strokeStyle = '#2a1650';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(headX - 12, headY + 1);
            ctx.quadraticCurveTo(headX - 7, headY - 2, headX - 2, headY + 1);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(headX + 2, headY + 1);
            ctx.quadraticCurveTo(headX + 7, headY - 2, headX + 12, headY + 1);
            ctx.stroke();

            // 睫毛
            ctx.strokeStyle = '#2a1650';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(headX - 12, headY + 1);
            ctx.lineTo(headX - 13, headY - 1);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(headX + 12, headY + 1);
            ctx.lineTo(headX + 13, headY - 1);
            ctx.stroke();

            // 下眼线
            ctx.strokeStyle = 'rgba(42, 22, 80, 0.3)';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(headX - 11, headY + 5);
            ctx.quadraticCurveTo(headX - 7, headY + 8, headX - 3, headY + 5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(headX + 3, headY + 5);
            ctx.quadraticCurveTo(headX + 7, headY + 8, headX + 11, headY + 5);
            ctx.stroke();

        } else if (eyeState === 'closed') {
            ctx.strokeStyle = eyeColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(headX - 7, headY + 3, 5, 0.05 * Math.PI, 0.95 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(headX + 7, headY + 3, 5, 0.05 * Math.PI, 0.95 * Math.PI);
            ctx.stroke();
            // 睫毛
            ctx.strokeStyle = '#2a1650';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(headX - 12, headY + 3);
            ctx.lineTo(headX - 13, headY + 1);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(headX + 12, headY + 3);
            ctx.lineTo(headX + 13, headY + 1);
            ctx.stroke();
        } else if (eyeState === 'half') {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.ellipse(headX - 7, headY + 4, 5.5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(headX + 7, headY + 4, 5.5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = eyeColor;
            ctx.beginPath();
            ctx.ellipse(headX - 7, headY + 4, 3, 2.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(headX + 7, headY + 4, 3, 2.5, 0, 0, Math.PI * 2);
            ctx.fill();
            // 半闭眼线
            ctx.strokeStyle = '#2a1650';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(headX - 12, headY + 2);
            ctx.quadraticCurveTo(headX - 7, headY - 1, headX - 2, headY + 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(headX + 2, headY + 2);
            ctx.quadraticCurveTo(headX + 7, headY - 1, headX + 12, headY + 2);
            ctx.stroke();
        }

        // 眉毛
        ctx.strokeStyle = '#8b6f5e';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(headX - 12, headY - 3);
        ctx.quadraticCurveTo(headX - 7, headY - 6, headX - 2, headY - 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(headX + 2, headY - 3);
        ctx.quadraticCurveTo(headX + 7, headY - 6, headX + 12, headY - 3);
        ctx.stroke();

        // 鼻子
        ctx.strokeStyle = 'rgba(196, 168, 130, 0.5)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(headX, headY + 6);
        ctx.quadraticCurveTo(headX - 1, headY + 9, headX, headY + 10);
        ctx.stroke();

        // 嘴巴
        if (mouthState === 'smile') {
            ctx.strokeStyle = '#c08080';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(headX - 4, headY + 13);
            ctx.quadraticCurveTo(headX, headY + 16, headX + 4, headY + 13);
            ctx.stroke();
            // 嘴唇高光
            ctx.fillStyle = 'rgba(224, 180, 180, 0.3)';
            ctx.beginPath();
            ctx.ellipse(headX, headY + 14, 3, 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (mouthState === 'open') {
            ctx.fillStyle = '#a06060';
            ctx.beginPath();
            ctx.ellipse(headX, headY + 14, 4, 3.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#804040';
            ctx.beginPath();
            ctx.ellipse(headX, headY + 14.5, 2.5, 2, 0, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.strokeStyle = '#c08080';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(headX - 3, headY + 13);
            ctx.lineTo(headX + 3, headY + 13);
            ctx.stroke();
        }

        // 腮红
        ctx.fillStyle = 'rgba(255, 150, 150, 0.2)';
        ctx.beginPath();
        ctx.ellipse(headX - 12, headY + 8, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(headX + 12, headY + 8, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // 头部轮廓
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(headX, headY + 4, 17, 18, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    /**
     * 生成精灵图并返回 data URL
     */
    function generateSpriteSheet() {
        var canvas = document.createElement('canvas');
        canvas.width = FRAME_W * COLS;
        canvas.height = FRAME_H * ROWS;
        var ctx = canvas.getContext('2d');

        // 清空
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 定义所有动作的帧序列
        var animations = {
            'idle': {
                label: '待机',
                speed: 0.08,
                loop: true,
                frames: []
            },
            'walk': {
                label: '行走',
                speed: 0.12,
                loop: true,
                frames: []
            },
            'run': {
                label: '跑步',
                speed: 0.18,
                loop: true,
                frames: []
            },
            'wave': {
                label: '挥手',
                speed: 0.1,
                loop: false,
                frames: []
            },
            'bow': {
                label: '鞠躬',
                speed: 0.08,
                loop: false,
                frames: []
            },
            'nod': {
                label: '点头',
                speed: 0.1,
                loop: false,
                frames: []
            },
            'jump': {
                label: '跳跃',
                speed: 0.12,
                loop: false,
                frames: []
            },
            'clap': {
                label: '鼓掌',
                speed: 0.15,
                loop: true,
                frames: []
            },
            'think': {
                label: '思考',
                speed: 0.06,
                loop: true,
                frames: []
            },
            'cheer': {
                label: '欢呼',
                speed: 0.14,
                loop: false,
                frames: []
            },
            'sit': {
                label: '坐下',
                speed: 0.06,
                loop: true,
                frames: []
            },
            'dance': {
                label: '跳舞',
                speed: 0.14,
                loop: true,
                frames: []
            },
            'attack': {
                label: '攻击',
                speed: 0.16,
                loop: false,
                frames: []
            },
            'death': {
                label: '倒下',
                speed: 0.06,
                loop: false,
                frames: []
            }
        };

        var frameIndex = 0;
        var frameMap = {};

        // ---- idle: 6帧，微微呼吸 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 6;
            var breathe = Math.sin(t * Math.PI * 2) * 1.5;
            var blink = (i === 3) ? 'half' : 'open';
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'idle_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                headY: breathe,
                eyeState: blink,
                mouthState: 'smile'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['idle'].frames.push(fname);
            frameIndex++;
        }

        // ---- walk: 8帧 ----
        for (var i = 0; i < 8; i++) {
            var t = i / 8;
            var legSwing = Math.sin(t * Math.PI * 2) * 20;
            var armSwing = Math.sin(t * Math.PI * 2) * 15;
            var bodyBob = Math.abs(Math.sin(t * Math.PI * 2)) * 2;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'walk_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                leftLegAngle: legSwing,
                rightLegAngle: -legSwing,
                leftArmAngle: -armSwing,
                rightArmAngle: armSwing,
                headY: -bodyBob,
                mouthState: 'neutral'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['walk'].frames.push(fname);
            frameIndex++;
        }

        // ---- run: 6帧 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 6;
            var legSwing = Math.sin(t * Math.PI * 2) * 35;
            var armSwing = Math.sin(t * Math.PI * 2) * 25;
            var bodyBob = Math.abs(Math.sin(t * Math.PI * 2)) * 4;
            var bodyLean = 5;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'run_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                leftLegAngle: legSwing,
                rightLegAngle: -legSwing,
                leftArmAngle: -armSwing,
                rightArmAngle: armSwing,
                headY: -bodyBob,
                bodyLean: bodyLean,
                mouthState: 'open'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['run'].frames.push(fname);
            frameIndex++;
        }

        // ---- wave: 6帧 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 5;
            var waveAngle = -60 + Math.sin(t * Math.PI) * 40;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'wave_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                rightArmAngle: waveAngle,
                headX: 2,
                mouthState: 'smile'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['wave'].frames.push(fname);
            frameIndex++;
        }

        // ---- bow: 6帧 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 5;
            var lean = Math.sin(t * Math.PI) * 25;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'bow_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                bodyLean: lean,
                headY: Math.sin(t * Math.PI) * 8,
                leftArmAngle: 10,
                rightArmAngle: -10,
                eyeState: t > 0.3 && t < 0.7 ? 'closed' : 'open',
                mouthState: 'neutral'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['bow'].frames.push(fname);
            frameIndex++;
        }

        // ---- nod: 4帧 ----
        for (var i = 0; i < 4; i++) {
            var t = i / 3;
            var nodY = Math.sin(t * Math.PI) * 6;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'nod_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                headY: nodY,
                eyeState: t > 0.3 && t < 0.7 ? 'half' : 'open',
                mouthState: 'smile'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['nod'].frames.push(fname);
            frameIndex++;
        }

        // ---- jump: 8帧 ----
        for (var i = 0; i < 8; i++) {
            var t = i / 7;
            var jumpY, armA;
            if (t < 0.25) {
                // 蓄力
                jumpY = t * 4 * 3;
                armA = 10;
            } else if (t < 0.5) {
                // 起跳
                jumpY = 3 - (t - 0.25) * 4 * 20;
                armA = -40;
            } else if (t < 0.75) {
                // 最高点
                jumpY = -17 + (t - 0.5) * 4 * 10;
                armA = -30;
            } else {
                // 落地
                jumpY = -7 + (t - 0.75) * 4 * 10;
                armA = 5;
            }
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'jump_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                headY: jumpY,
                leftArmAngle: armA,
                rightArmAngle: armA,
                mouthState: t > 0.3 && t < 0.7 ? 'open' : 'smile'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['jump'].frames.push(fname);
            frameIndex++;
        }

        // ---- clap: 6帧 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 6;
            var spread = Math.abs(Math.sin(t * Math.PI * 2)) * 30;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'clap_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                leftArmAngle: -spread + 10,
                rightArmAngle: spread - 10,
                mouthState: 'smile',
                eyeState: 'open'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['clap'].frames.push(fname);
            frameIndex++;
        }

        // ---- think: 6帧 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 6;
            var headTilt = Math.sin(t * Math.PI * 2) * 3;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'think_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                headX: headTilt,
                headY: 2,
                leftArmAngle: -40,
                rightArmAngle: 5,
                eyeState: 'half',
                mouthState: 'neutral'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['think'].frames.push(fname);
            frameIndex++;
        }

        // ---- cheer: 6帧 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 5;
            var armUp = -50 - Math.sin(t * Math.PI) * 30;
            var bounce = Math.abs(Math.sin(t * Math.PI)) * 5;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'cheer_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                leftArmAngle: armUp,
                rightArmAngle: armUp,
                headY: -bounce,
                mouthState: 'open',
                eyeState: 'open'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['cheer'].frames.push(fname);
            frameIndex++;
        }

        // ---- sit: 4帧 ----
        for (var i = 0; i < 4; i++) {
            var t = i / 3;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'sit_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                leftLegAngle: 40,
                rightLegAngle: -20,
                leftArmAngle: 5,
                rightArmAngle: -5,
                headY: 4,
                mouthState: 'smile',
                eyeState: i === 2 ? 'half' : 'open'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['sit'].frames.push(fname);
            frameIndex++;
        }

        // ---- dance: 8帧 ----
        for (var i = 0; i < 8; i++) {
            var t = i / 8;
            var sway = Math.sin(t * Math.PI * 2) * 8;
            var armL = Math.sin(t * Math.PI * 2) * 30 - 20;
            var armR = Math.sin(t * Math.PI * 2 + Math.PI) * 30 - 20;
            var legL = Math.sin(t * Math.PI * 2) * 15;
            var legR = Math.sin(t * Math.PI * 2 + Math.PI) * 15;
            var bounce = Math.abs(Math.sin(t * Math.PI * 4)) * 3;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'dance_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                bodyLean: sway,
                leftArmAngle: armL,
                rightArmAngle: armR,
                leftLegAngle: legL,
                rightLegAngle: legR,
                headY: -bounce,
                headX: sway * 0.3,
                mouthState: 'smile'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['dance'].frames.push(fname);
            frameIndex++;
        }

        // ---- attack: 6帧 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 5;
            var armSwing;
            if (t < 0.4) {
                armSwing = 30; // 蓄力
            } else {
                armSwing = 30 - (t - 0.4) / 0.6 * 90; // 挥出
            }
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'attack_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                rightArmAngle: armSwing,
                bodyLean: t > 0.4 ? 8 : -3,
                leftLegAngle: t > 0.4 ? 10 : 0,
                rightLegAngle: t > 0.4 ? -15 : 0,
                mouthState: t > 0.3 ? 'open' : 'neutral',
                eyeState: 'open'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['attack'].frames.push(fname);
            frameIndex++;
        }

        // ---- death: 6帧 ----
        for (var i = 0; i < 6; i++) {
            var t = i / 5;
            var lean = t * 60;
            var fallY = t * 15;
            var row = Math.floor(frameIndex / COLS);
            var col = frameIndex % COLS;
            var fname = 'death_' + i;
            drawCharacter(ctx, col * FRAME_W, row * FRAME_H, {
                bodyLean: lean,
                headY: fallY,
                leftArmAngle: t * 20,
                rightArmAngle: t * 30,
                eyeState: t > 0.5 ? 'closed' : 'half',
                mouthState: t > 0.3 ? 'open' : 'neutral'
            });
            frameMap[fname] = { x: col * FRAME_W, y: row * FRAME_H, w: FRAME_W, h: FRAME_H };
            animations['death'].frames.push(fname);
            frameIndex++;
        }

        return {
            textureDataUrl: canvas.toDataURL('image/png'),
            spriteSheet: {
                frames: frameMap,
                animations: animations
            }
        };
    }

    // 生成模型数据
    var data = generateSpriteSheet();

    SPRITE_MODEL_DATA['suishuo'] = {
        name: '随说',
        defaultAction: 'idle',
        textureBase64: data.textureDataUrl,
        spriteSheet: data.spriteSheet,
        skins: ['default'],
        actionKeywordMap: {
            '待机': 'idle', '休息': 'idle', '站好': 'idle',
            '挥手': 'wave', '打招呼': 'wave',
            '鞠躬': 'bow', '行礼': 'bow',
            '点头': 'nod', '同意': 'nod',
            '摇头': 'nod', '不同意': 'nod',
            '跳': 'jump', '跳跃': 'jump',
            '鼓掌': 'clap', '拍手': 'clap',
            '思考': 'think',
            '欢呼': 'cheer', '加油': 'cheer',
            '走': 'walk', '行走': 'walk', '走路': 'walk',
            '跑': 'run', '跑步': 'run',
            '跳舞': 'dance', '舞蹈': 'dance',
            '坐': 'sit', '坐下': 'sit',
            '攻击': 'attack', '战斗': 'attack',
            '死亡': 'death', '倒下': 'death',
        }
    };

})();
