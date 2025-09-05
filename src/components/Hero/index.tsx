import { extend, useTick } from "@pixi/react";
import { Container, Texture, Sprite } from "pixi.js";
import { useEffect, useState } from "react";
import { calculateNewTarget } from "../../helpers/common";
import { useHeroControls } from "./useHeroControls";
import { PositionType } from "../../types/common";
import { useHeroAnimation } from "./useHeroAnimation";
import { ANIMATION_SPEED, FRAME_HEIGHT, FRAME_WIDTH, TOTAL_HERO_MOVE_FRAMES } from "../../contstants/game-world";

extend({
    Container,
    Sprite,
});

type HeroPropsType = {
    texture: Texture,
    onMove: (x: number, y: number) => void,
    startPosition: PositionType
};

export const Hero = ({ texture, onMove, startPosition }: HeroPropsType) => {
    const [position, setPosition] = useState<PositionType>(startPosition)
    const { direction } = useHeroControls();
    const { sprite, updateSprite } = useHeroAnimation({
        texture,
        frameHeight: FRAME_HEIGHT,
        frameWidth: FRAME_WIDTH,
        totalFrames: TOTAL_HERO_MOVE_FRAMES,
        animationSpeed: ANIMATION_SPEED
    });

    useEffect(() => {
        onMove(position.x, position.y);
    }, [onMove]);

    useTick((ticker) => {
        if (direction) {
            const newPos = calculateNewTarget(position.x, position.y, direction, ticker.deltaTime);
            setPosition(newPos);
            onMove(newPos.x, newPos.y);
        }
        updateSprite(direction);
    });

    return (
        <pixiContainer>
            {sprite &&
                <pixiSprite
                    texture={sprite.texture}
                    x={position.x}
                    y={position.y}
                />
            }
        </pixiContainer>
    )
};