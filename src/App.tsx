import _ from "lodash";
import React, {
    LegacyRef,
    MutableRefObject,
    useEffect,
    useReducer,
    useRef,
} from "react";

//import castleWebm from "./media/videos/castle.webm";
//import castleMP4 from "./media/videos/castle.mp4";

import styles from "./app.module.css";

function App() {
    const canvas: any = document.getElementById("test");

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const parentRef = useRef<any>();
    const html = document.documentElement;
    const context = canvasRef.current?.getContext("2d");

    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

    const importAll = (r: any) => {
        let images: any = {};
        r.keys().forEach((item: string, index: any) => {
            images[item.replace("./", "")] = r(item);
        });
        return images;
    };

    const images = importAll(
        require.context(
            "./media/images/castle-frames/",
            false,
            /\.(png|jpe?g|svg)$/
        )
    );

    const frameCount = _.size(images);

    const currentFrame = (index: number) =>
        `ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

    const img = new Image();
    img.src = images[currentFrame(1)];
    img.onload = function () {
        context?.drawImage(
            img,
            0,
            0,
            canvasRef.current?.width!,
            canvasRef.current?.height!
        );
    };

    const updateFrame = (index: number) => {
        img.src = images[currentFrame(index)];
        context?.drawImage(
            img,
            0,
            0,
            canvasRef.current?.width!,
            canvasRef.current?.height!
        );
    };

    const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = images[currentFrame(i)];
        }
    };

    window.addEventListener("scroll", () => {
        const scrollTop = html.scrollTop;
        const maxScrollTop = html.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScrollTop;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.ceil(scrollFraction * frameCount)
        );

        requestAnimationFrame(() => updateFrame(frameIndex + 1));
    });

    preloadImages();

    useEffect(() => {
        //console.log(images[currentFrame(80)]);
        if (canvasRef.current?.width !== undefined)
            canvasRef.current.width = 1000;

        if (canvasRef.current?.height !== undefined)
            canvasRef.current.height = 1000;

        console.log(1);
        forceUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={parentRef}>
            <canvas id="test" ref={canvasRef} className={styles.video_main} />
        </div>
    );
}

export default App;
