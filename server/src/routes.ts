import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import {PrismaFeedbackRepository} from './repositories/prisma/prisma-feedbacks-repository'
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router()

routes.post('/feedbacks',async (req,res)=>{
  //desestruturação 
  const {type,comment,screenshot}=req.body

  try{
  const prismaFeedbacksRepository= new PrismaFeedbackRepository()
  const nodemailerMailAdapter= new NodemailerMailAdapter()

  const submiteFeedbackUseCase= new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  )

  await submiteFeedbackUseCase.execute({
    type,comment,screenshot
  })
  return res.status(201).send()

  }catch (err){
    console.log(err);
    return res.status(500).send()
  }
  
})