import torch
import torch.nn as nn

class fraud_classifier(nn.Module):

    def __init__(self, input_size, batch_size, hidden_size, output_size, num_layers= 3):
        super(fraud_classifier, self).__init__()
        self.inputSize = input_size
        self.batchSize = batch_size
        self.hiddenSize = hidden_size
        self.outputSize = output_size
        self.numLayers = num_layers

        self.linear = nn.Linear(self.inputSize, self.inputSize)
        self.hidden = nn.LSTM(self.inputSize, self.hiddenSize, self.numLayers, bidirectional= True, dropout= .15)
        self.tanh = nn.Tanh()

        self.linear = nn.Linear(hidden_size * 2, output_size * 2)
        self.linear_out = nn.Linear(output_size * 2, output_size)


    def init_hidden(self):
        return (torch.zeros(self.num_layers, self.batch_size, self.hidden_size),
                torch.zeros(self.num_layers, self.batch_size, self.hidden_size))
    
    
    def forward(self, input):
        init_out = self.init_linear(input)

        lstm_out, self.hidden = self.lstm_layers(init_out)

        act_out = self.tanh_act(lstm_out)

        lin_out = self.linear(act_out)

        y_pred = self.linear_out(lin_out)

        return y_pred