import {AccordionKey} from "@/keys";

export type Step = symbol | string

export type Accordion = {
    emitAccordionNextStepEvent:  () => void;
    emitAccordionPreviousStepEvent: () => void;
    isActiveStep: (step:Step) => boolean;
    isPreviousStep: (step:Step) => boolean;
    isFirstStep: (step:Step) => boolean;
    isLastStep: (step:Step) => boolean;
    step:Step;
    steps:Step[] ;
}
export type AccordionProvide = {
    [AccordionKey]: Accordion
}