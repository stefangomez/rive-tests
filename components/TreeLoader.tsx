import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";

export default function TreeLoader({ progress }: any) {
  const riveSrcUrl = `${process.env.NEXT_PUBLIC_BUILD_HOST}/tree_loading_bar.riv`;
  const { rive, RiveComponent } = useRive(
    {
      src: riveSrcUrl,
      autoplay: true,
      stateMachines: ["Loading"],
    },
    { fitCanvasToArtboardHeight: false }
  );

  const progressInput = useStateMachineInput(
    rive,
    "Loading",
    "Progress",
    progress
  );
  useStateMachineInput(rive, "Loading", "Downloading", true);

  useEffect(() => {
    if (progressInput && progressInput.value !== progress) {
      if (progress >= 100) {
        // Hack because original Rive state machine has a bug when progress value === 100
        progressInput.value = 101;
      } else {
        progressInput.value = progress;
      }
    }
  }, [progress, progressInput]);

  return <RiveComponent />;
}
