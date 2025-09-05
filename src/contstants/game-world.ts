import { DirectionType } from "../types/common";

export const TILE_SIZE = 128;

export const FRAME_HEIGHT = 64;

export const FRAME_WIDTH = 64;

export const TOTAL_HERO_MOVE_FRAMES = 9;

export const ANIMATION_SPEED = 0.2;

export const STEP_SIZE = 1;

export const MOVE_SPEED = 5;

export const DIRECTION_KEYS: Record<string, DirectionType> = {
    KeyW: "UP",
    KeyS: "DOWN",
    KeyA: "LEFT",
    KeyD: "RIGHT",
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT"
};