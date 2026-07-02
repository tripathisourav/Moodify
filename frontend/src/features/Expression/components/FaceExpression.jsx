import { useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import './face.scss'

export default function FaceExpression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Ready");
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);

    async function startCamera() {
        await init({ landmarkerRef, videoRef, streamRef });
        setIsCameraOn(true);
        setExpression("Camera Active");
    }

    async function handleDetect() {
        setIsDetecting(true);
        setExpression("Analyzing...");

        const exp = detect({
            landmarkerRef,
            videoRef,
            setExpression,
        });

        if (!exp) {
            setIsDetecting(false);
            return;
        }

        // Stop camera
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject
                .getTracks()
                .forEach((track) => track.stop());
        }

        setIsCameraOn(false);
        setIsDetecting(false);
        setExpression(`Detected: ${exp}`);

        onClick(exp);
    }

    return (
        <div className="face">

            {/* Video */}
            <div className="face__video-wrap">
                <video
                    ref={videoRef}
                    className="face__video"
                    playsInline
                    autoPlay
                />

                {/* Overlay */}
                <div className="face__overlay">
                    <p className="face__status">{expression}</p>

                    {!isCameraOn ? (
                        <button className="face__btn" onClick={startCamera}>
                            🎥 Start Camera
                        </button>
                    ) : (
                        <button
                            className="face__btn face__btn--detect"
                            onClick={handleDetect}
                            disabled={isDetecting}
                        >
                            {isDetecting ? "Detecting..." : "🧠 Detect Mood"}
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}