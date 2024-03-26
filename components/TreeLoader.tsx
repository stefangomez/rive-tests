import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";

export default function TreeLoader({ progress }: any) {
  const riveSrcUrl = `https://darling-eclair-a61c34.netlify.app/tree_loading_bar.riv`;
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
      progressInput.value = progress;
    }
  }, [progress, progressInput]);

  return <RiveComponent />;
}
