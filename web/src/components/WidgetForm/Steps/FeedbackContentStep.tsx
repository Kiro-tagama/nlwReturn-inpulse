import { FormEvent, useState } from "react";
import { ArrowLeft, Camera } from "phosphor-react"
import { FeedbackType, feedbackTypes } from ".."
import { ClosedButton } from "../../ClosedButton"
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";

interface FeedbackContentStepProps{
  feedbackType:FeedbackType;
  onFeedbackRestartRequest:()=>void;
  onFeedbackSent: ()=>void;
}

export function FeedbackContentStep(props:FeedbackContentStepProps){
  const [screenshot,setScreenshot]=useState<string | null>(null)

  const feedbackTypeInfo = feedbackTypes[props.feedbackType]

  const [comment, setComment] =useState('')
  const [isSendingFeedback, setIsSendingFeedback]=useState(false)

  async function handleSubmitFeedback(event: FormEvent){
    event.preventDefault();
    setIsSendingFeedback(true)
    // console.log({
    //   screenshot,
    //   comment,
    // })

    await api.post('/feedbacks',{
      type:props.feedbackType,
      comment,
      screenshot
    })
    
    setIsSendingFeedback(false)
    props.onFeedbackSent()
  }

  return(
    <>
    <header>
      <button 
      onClick={props.onFeedbackRestartRequest}
      type='button' 
      className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
        <ArrowLeft weight="bold" className="w-4 h-4"/>
      </button>

      <span  className="text-xl leading-6 flex items-center gap-2">
        <img
          className="w-6 h-6"
          src={feedbackTypeInfo.image.source} 
          alt={feedbackTypeInfo.image.alt}
        />
        {feedbackTypeInfo.title}
      </span>
      <ClosedButton/>
    </header>

    <form onSubmit={handleSubmitFeedback} className="py-4 w-full">
      <textarea
        onChange={event=>setComment(event.target.value)}
        placeholder="Conte com detalhes o que está acontecendo..."
        className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:right-1 focus:outline-none resize-none  scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
      />
      <footer className="flex gap-2 mt-2">
        <ScreenshotButton
          screenshot={screenshot}
          onScreenshotTook={setScreenshot}
        />
        <button 
        className="p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transitio-colors 
        disabled:opacity-50 disabled:hover:bg-brand-500
        "
        type="submit"
        disabled={comment.length === 0 || isSendingFeedback}
        >
          {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
        </button>
      </footer>
    </form>
    </>
  )
}

//1.13.30 do video stage2