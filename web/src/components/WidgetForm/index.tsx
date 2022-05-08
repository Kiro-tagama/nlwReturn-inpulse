import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { ClosedButton } from "../ClosedButton";

import bugSvg from '../../assets/bug.svg'
import ideaSvg from '../../assets/idea.svg'
import thoughtSvg from '../../assets/thought.svg'

import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes={
  BUG: {
    title: 'Problema',
    image: {
      source: bugSvg,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: { 
    title: 'ideia', 
    image: { 
      source: ideaSvg,
      alt: 'Imagem de um lâmpada' } },

  OTHER: { 
    title: 'Outro',
    image: { 
      source: thoughtSvg,
      alt: 'Imagem de um pensamento' } },

}

// Object.entries(feedbackTypes) =>
/*
  *[[BUG,{...}],[IDEA,{...}],[OTHER,{...}]]
*/

export type FeedbackType= keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedbackType, setFeedbackType]=useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent]=useState(false)

  function handleRestartFeedback(){
    setFeedbackSent (false);
    setFeedbackType (null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      
      {feedbackSent ? <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/> :
        (
          <>
          {!feedbackType?(
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
          ):(
            <FeedbackContentStep 
              feedbackType={feedbackType}
              onFeedbackRestartRequest={handleRestartFeedback} 
              onFeedbackSent={()=>setFeedbackSent(true)}
            />
          )}
          </>
        )
      }

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  )
}