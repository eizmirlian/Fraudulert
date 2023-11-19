import sklearn.preprocessing
import pandas as pd
import datetime
from model import fraud_classifier
import torch
import torch.utils.data as data
import torch.optim.lr_scheduler as lrs
import pickle

device = torch.device('cpu')

BATCH_SIZE = 30
LEARNING_RATE = .05
NUM_EPOCHS = 30
transPerSeries = 50

def parseDataset(transPerSeries):
    moreData = True
    UserID = 1
    df = pd.read_csv('C:/Users/Elias/OneDrive/Documents/2023-2024/Fraudulert/fraudulert-backend/updated_credit.csv') #load data here
    decomposedDataset = pd.DataFrame()
    enc = sklearn.preprocessing.OrdinalEncoder()
    sequences = []
    labels = []
    while moreData:
        userTrans = df.loc[df['id'] == UserID]
        if userTrans.shape[0] <= 0:
            moreData = False
        else:
            series = 0
            moreTransactions = True
            dateDiffs = []
            while moreTransactions:
                if transPerSeries + series > userTrans.shape[0]:
                    moreTransactions = False
                else:
                    seriesTrans = userTrans[series : series + transPerSeries]
                    X_discrete = seriesTrans[['merchant', 'category', 'city', 'state']]
                    X_discrete['citystate'] = X_discrete['city'] + X_discrete['state']
                    X_discrete = X_discrete[['merchant', 'category', 'citystate']]
                    #print(X_discrete)
                    X_enc = enc.fit_transform(X_discrete)
                    newDF = pd.DataFrame({'Merchant' : X_enc[:, 0], 'Category' : X_enc[:, 1], 'City' : X_enc[:, 2]})
                    #print(newDF)
                    X_dates = seriesTrans['trans_date_trans_time'].values
                    prevDate = None
                    if len(dateDiffs) == transPerSeries:
                        X_dates = [X_dates[transPerSeries - 2], X_dates[-1]]
                        dateDiffs = dateDiffs[1:]
                    else:
                        dateDiffs = [0]
                    for date in X_dates:
                        ymd = date.split(' ')[0].split('/')
                        time = date.split(' ')[1]
                        y = '20' + ymd[2]
                        m = ymd[0] if len(ymd[0]) > 1 else '0' + ymd[0]
                        d = ymd[1] if len(ymd[1]) > 1 else '0' + ymd[1]
                        isoformat = f'{y}-{m}-{d}'
                        dateObj = datetime.date.fromisoformat(isoformat)
                        time = '0' + time if len(time) <= 4 else time
                        timeObj = datetime.time.fromisoformat(time +':00')
                        DTobj = datetime.datetime.combine(dateObj, timeObj)
                        if prevDate != None:
                            diff = DTobj - prevDate
                            diff = diff.days + diff.seconds / 86400
                            dateDiffs.append(diff)

                        prevDate = DTobj
                        


                    dateDF = pd.DataFrame({'Date' : dateDiffs})
                    amountDF = pd.DataFrame({'Amount' : seriesTrans['amt'].values})
                    latlongDF = pd.DataFrame({'Latitude' : seriesTrans['lat'].values, 'Longitude' : seriesTrans['long'].values})
                    fraudDF = pd.DataFrame({'Label' : seriesTrans['is_fraud'].values})
                    idDF = pd.DataFrame({'UserID' : [UserID for i in range(transPerSeries)], 'Series' : [series for i in range(transPerSeries)]})
                    newDF = pd.concat([dateDF, amountDF, latlongDF, newDF], axis = 1)
                    #print(newDF)
                    labels.append(fraudDF.values[-1])
                    sequences.append(newDF)
                    series += 1
            UserID += 1

    with open('datasequences.obj', 'w') as f:
        pickle.dump(sequences, f)

    with open('labels.obj', 'w') as f:
        pickle.dump(labels, f)

parseDataset(transPerSeries)

with open('datasequences.obj', 'r') as f:
        sequences = pickle.load(f)

with open('labels.obj', 'r') as f:
        labels = pickle.load(f)

numSequences = len(sequences)
trainingLength = int(.8 * numSequences)
x_train = sequences[:trainingLength]
y_train = labels[:trainingLength]
x_test = sequences[trainingLength:]
y_test = labels[trainingLength:]

train_loader = data.DataLoader(data.TensorDataset(x_train), data.TensorDataset(y_train), shuffle= True, batch_size= 30)
test_loader = data.DataLoader(data.TensorDataset(x_test), data.TensorDataset(y_test), shuffle= True, batch_size= 30)

model = fraud_classifier(transPerSeries * 7, BATCH_SIZE, 20, 1, 2)

model.to(device)

# Creates the Adam optimizer and learning rate scheduler
optimizer = torch.optim.Adam(model.parameters(), lr= LEARNING_RATE, weight_decay=1e-5)
scheduler = lrs.CosineAnnealingLR(optimizer, 50, .00001)

loss_func = torch.nn.CrossEntropyLoss()

# Faciltates NUM_EPOCHs of training
for epoch in range(NUM_EPOCHS):
    # put the model in training mode
    model.train()

    sum_loss = 0
    # iterate through batches of the training data using the data loader
    for X, y in train_loader:
        # forward pass through the model
        y_pred = model(X)


        # calculates MSE loss of predicted vs actual price change
        loss = loss_func(y_pred, y)

        # propogates the loss backwards through model
        optimizer.zero_grad()
        loss.backward()
        sum_loss += loss.item()
        optimizer.step()

    # Reports the training loss
    print("Average Training Loss for Epoch " + str(epoch + 1) + ":", sum_loss / len(x_train))

    # Puts the model into evaluation mode
    model.eval()
    sum_err = 0
    count = 0
    with torch.no_grad():
        for X, y in test_loader:
            prediction = model(X)
            sum_err += loss_func(prediction, y)
            count += 1
    
    #scaled_predictions = predictions
    avg_val_err = sum_err / count
    print(f'Average validation error: {avg_val_err}')

torch.save(model.state_dict(), 'model_state_dict')







#y = df[[-1]]

