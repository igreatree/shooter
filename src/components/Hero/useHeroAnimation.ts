import { Sprite, Texture } from "pixi.js";
import { useRef, useState } from "react";
import { DirectionType } from "../../types/common";
import { createFrame } from "../../helpers/common";

type useHeroAnimationProps = {
    texture: Texture,
    frameWidth: number,
    frameHeight: number,
    totalFrames: number,
    animationSpeed: number
};

const deafaultColumn = 1;
const deafaultRow = 8;

export const useHeroAnimation = ({ texture, frameWidth, frameHeight, totalFrames, animationSpeed }: useHeroAnimationProps) => {
    const [sprite, setSprite] = useState<Sprite>(createFrame(texture, deafaultColumn, deafaultRow, frameWidth, frameHeight));
    const frameRef = useRef(0);
    const elapsedTimeRef = useRef(0);
    const lastRowDirection = useRef<number | null>(0);

    const createSprite = (row: number, column: number) => {
        const newSprite = createFrame(texture, column, row, frameWidth, frameHeight)
        newSprite.width = frameWidth;
        newSprite.height = frameHeight;

        return newSprite;
    };

    const getRowByDirection = (direction: DirectionType | null) => {
        switch (direction) {
            case "UP":
                return 8;
            case "LEFT":
                return 9;
            case "DOWN":
                return 10;
            case "RIGHT":
                return 11;
            default:
                return 10;
        }
    }

    const updateSprite = (direction: DirectionType | null) => {
        if (!direction && !lastRowDirection.current) return;
        let column = 0, row = getRowByDirection(null);
        if (direction) {
            row = getRowByDirection(direction);
            lastRowDirection.current = row;
            elapsedTimeRef.current += animationSpeed;
            if (elapsedTimeRef.current >= 1) {
                elapsedTimeRef.current = 0;
                frameRef.current = (frameRef.current + 1) % totalFrames;
            }
            column = frameRef.current === 0 ? 1 : frameRef.current;
        } else if (lastRowDirection.current) {
            row = lastRowDirection.current;
            lastRowDirection.current = null;
        }

        const newSprite = createSprite(row, column);
        setSprite(newSprite);
    };

    return { sprite, updateSprite }
};