import { useEffect, useRef, useState } from "react";

export function useCompareSlider(initial = 50) {
    const [sliderPos, setSliderPos] = useState(initial);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const clamp = (num: number) => Math.max(0, Math.min(100, num));

    const setFromClientX = (clientX: number) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pos = ((clientX - rect.left) / rect.width) * 100;
        setSliderPos(clamp(pos));
    };

    const onMouseMove = (e: MouseEvent) => isDragging && setFromClientX(e.clientX);
    const onTouchMove = (e: TouchEvent) => {isDragging && e.touches[0] && setFromClientX(e.touches[0].clientX);};

    useEffect(() => {
        if (!isDragging) return;
        const stop = () => setIsDragging(false);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("mouseup", stop);
        document.addEventListener("touchend", stop);
    
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", stop);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", stop);
        };
    }, [isDragging]);

    return { sliderPos, setSliderPos, containerRef, dragStart: () => setIsDragging(true) };
}