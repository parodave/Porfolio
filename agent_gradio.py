import gradio as gr
from transformers import pipeline

qa_agent = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def answer(context, question):
    result = qa_agent(question=question, context=context)
    return result['answer']

iface = gr.Interface(
    fn=answer,
    inputs=[gr.Textbox(lines=3, label="Contexte"), gr.Textbox(lines=2, label="Question")],
    outputs="text"
)

iface.launch(share=True)
