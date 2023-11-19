import openai
api_key = "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"
openai.api_key = api_key
def getFraudExplanation(transaction, causes):
    prompt = ""
    prompt += "When running a fraudulent transaction detector on this transaction: "
    prompt += transaction
    prompt += ", the detector displayed that the transaction was most likely fraudulent"
    prompt += "for the following reasons: "
    for a in range(len(causes)):
        prompt += causes[a]
        if (not (a == len(causes) - 1)):
            prompt += ", "
        else:
            prompt += ". "
    prompt += "Why would those causes lead to a detector flagging this transaction as fraudulent?"
    messages = [{'role': 'user', 'content': prompt}]
    response = openai.ChatCompletion.create(model='gpt-3.5-turbo', messages= messages, temperature= 0,)
    score = response['choices'][0]['message']['content']
    return score

print(getFraudExplanation("id: 9, trans_date_trans_time: 1/18/19 0:23, merchant: Boyer PLC, category: shopping_net, amt: 978.96, city: Thompson, state: UT, lat: 38.9999, long: -109.615, city_pop: 46, trans_num: fbda3f1531d8d9186359a561e09077af, merch_lat: 38.893999, merch_long: -109.677707", ["amt, category"]))