import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy=jest.fn()
const sendMailSpy=jest.fn()


const subnitFeedback=new SubmitFeedbackUseCase(
  {create: createFeedbackSpy },
  {sendMail: sendMailSpy} 
)
describe('Submit feedback', ()=>{
  it('should be able to submit a feedback',async ()=>{

    await expect(subnitFeedback.execute({
      type:'BUG',
      comment:'teste unitario',
      screenshot:'data:image/png;base64,fdsfsfsdfffsdf'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without type',async ()=>{

    await expect(subnitFeedback.execute({
      type:'',
      comment:'teste unitario',
      screenshot:'data:image/png;base64,fdsfsfsdfffsdf'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment',async ()=>{

    await expect(subnitFeedback.execute({
      type:'BUG',
      comment:'',
      screenshot:'data:image/png;base64,fdsfsfsdfffsdf'
    })).rejects.toThrow()
  })

  it('should be able to submit feedback with an invalid screenshot',async ()=>{

    await expect(subnitFeedback.execute({
      type:'BUG',
      comment:'teste unitario',
      screenshot:'teste.png'
    })).rejects.toThrow()
  })
})