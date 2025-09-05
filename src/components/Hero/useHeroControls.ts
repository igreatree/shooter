import { useEffect, useState } from "react";
import { DirectionType } from "../../types/common";
import { DIRECTION_KEYS } from "../../contstants/game-world";

export const useHeroControls = () => {
    const [heldDirection, setHeldDirection] = useState<DirectionType[]>([]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent, isKeyDown: boolean) => {
            e.preventDefault();
            const direction = DIRECTION_KEYS[e.code];
            if (!direction) return;
            setHeldDirection((prev) => {
                if (isKeyDown) {
                    return prev.includes(direction) ? prev : [direction, ...prev];
                }
                return prev.filter((dir) => dir !== direction)
            })
        };
        const handleKeyDown = (e: KeyboardEvent) => handleKey(e, true);
        const handleKeyUp = (e: KeyboardEvent) => handleKey(e, false);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, []);

    return { direction: heldDirection[0] || null };
};