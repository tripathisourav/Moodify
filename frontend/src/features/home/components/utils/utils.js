import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  )

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  })

  streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true })
  videoRef.current.srcObject = streamRef.current
  await videoRef.current.play()
}

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
  if (!landmarkerRef.current || !videoRef.current) return null

  const results = landmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now()
  )

  if (!results.faceBlendshapes?.length) return null

  const shapes = results.faceBlendshapes[0].categories
  const get = (name) => shapes.find((b) => b.categoryName === name)?.score ?? 0

  const smileLeft  = get("mouthSmileLeft")
  const smileRight = get("mouthSmileRight")
  const jawOpen    = get("jawOpen")
  const browUp     = get("browInnerUp")
  const frownLeft  = get("mouthFrownLeft")
  const frownRight = get("mouthFrownRight")

  let expression = "neutral"
  if (smileLeft > 0.5 && smileRight > 0.5)             expression = "happy"
  else if (jawOpen > 0.2 && browUp > 0.2)               expression = "surprised"
  else if (frownLeft > 0.0001 && frownRight > 0.0001)   expression = "sad"

  setExpression(expression)

  // return both so MoodPanel can compute confidence bars
  return {
    expression,
    rawScores: { smileLeft, smileRight, jawOpen, browUp, frownLeft, frownRight },
  }
}