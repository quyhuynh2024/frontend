import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((idx) => (idx > steps.length - 1 ? idx : idx + 1));
  }

  function back() {
    setCurrentStepIndex((idx) => (idx <= 0 ? idx : idx - 1));
  }
  function goTo(index: number) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
    goTo,
  };
}
