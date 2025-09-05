import { Rectangle, Sprite, Texture } from "pixi.js";
import { MOVE_SPEED, STEP_SIZE } from "../contstants/game-world";
import { DirectionType } from "../types/common";

export const getWindowSize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
};

export const lerp = (start: number, end: number) => {
    return start + (end - start) * 0.07;
};

export const createFrame = (texture: Texture, column: number, row: number, width: number, height: number) => new Sprite(new Texture({ source: texture.source, frame: new Rectangle(column * width, row * height, width, height) }));

export const calculateNewTarget = (x: number, y: number, direction: DirectionType, delta: number) => {
    const step = MOVE_SPEED * STEP_SIZE * delta;
    return {
        x: x + (direction === "LEFT" ? -step : direction === "RIGHT" ? step : 0),
        y: y + (direction === "UP" ? -step : direction === "DOWN" ? step : 0),
    }
};