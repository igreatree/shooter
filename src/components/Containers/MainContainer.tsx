import { extend } from "@pixi/react";
import { Assets, Container, Graphics, Texture, TilingSprite } from "pixi.js";
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import tilesetAsset from "../../assets/tileset-grass.png";
import heroAsset from "../../assets/player-body-with-head.png";
import { Hero } from "../Hero";
import { lerp } from "../../helpers/common";
import { SizeType } from "../../types/common";

extend({
    Container,
    TilingSprite,
});

type MainContainerPropsType = {
    size: SizeType
};

export const MainContainer = ({ size, children }: PropsWithChildren<MainContainerPropsType>) => {
    const [tilesetTexture, setTilesetTexture] = useState<Texture | null>(null);
    const startHeroPosition = { x: Math.floor(size.width / 2), y: Math.floor(size.height / 2) };
    const [heroTexture, setHeroTexture] = useState<Texture | null>(null);
    const [heroPosition, setHeroPosition] = useState(startHeroPosition);
    const containerRef = useRef<Graphics>(null);

    const updateHeroPosition = useCallback((x: number, y: number) => {
        setHeroPosition({ x, y });
    }, []);

    useEffect(() => {
        (async () => {
            const tilesetImage = await Assets.load(tilesetAsset);
            const heroImage = await Assets.load(heroAsset);
            setTilesetTexture(tilesetImage);
            setHeroTexture(heroImage);
        })();
    }, []);

    return (
        <pixiContainer
            ref={containerRef}
            x={lerp(containerRef.current ? containerRef.current.x : 0, size.width / 2 - heroPosition.x)}
            y={lerp(containerRef.current ? containerRef.current.y : 0, size.height / 2 - heroPosition.y)}
        >
            {tilesetTexture &&
                <pixiTilingSprite
                    width={size.width}
                    height={size.height}
                    texture={tilesetTexture}
                />
            }
            {children}
            {heroTexture &&
                <Hero
                    startPosition={startHeroPosition}
                    texture={heroTexture}
                    onMove={updateHeroPosition}
                />
            }
        </pixiContainer>
    )
};