import sklearn.preprocessing
import pandas as pd
import datetime
from model import fraud_classifier
import torch.utils.data as data

transPerSeries = 5
moreData = True
UserID = 1
df = pd.read_csv('C:/Users/Elias/OneDrive/Documents/2023-2024/Fraudulert/fraudulert-backend/credit_card_fraud.csv') #load data here
decomposedDataset = pd.DataFrame()
enc = sklearn.preprocessing.OrdinalEncoder()
while moreData:
    userTrans = df.loc[df['id'] == UserID]
    if userTrans.shape[0] <= 0:
        moreData = False
    else:
        series = 1
        moreTransactions = True
        while moreTransactions:
            if transPerSeries * series > userTrans.shape[0]:
                moreTransactions = False
            else:
                seriesTrans = userTrans[(series - 1) * transPerSeries : (series) * transPerSeries]
                X_discrete = seriesTrans[['merchant', 'category', 'city', 'state']]
                X_discrete['citystate'] = X_discrete['city'] + X_discrete['state']
                X_discrete = X_discrete[['merchant', 'category', 'citystate']]
                #print(X_discrete)
                X_enc = enc.fit_transform(X_discrete)
                newDF = pd.DataFrame({'Merchant' : X_enc[:, 0], 'Category' : X_enc[:, 1], 'City' : X_enc[:, 2]})
                #print(newDF)
                X_dates = seriesTrans['trans_date_trans_time']
                prevDate = None
                dateDiffs = []
                for date in X_dates:
                    ymd = date.split(' ')[0].split('/')
                    time = date.split(' ')[1]
                    y = '20' + ymd[2]
                    m = ymd[1] if len(ymd[1]) > 1 else '0' + ymd[1]
                    d = ymd[0] if len(ymd[0]) > 1 else '0' + ymd[0]
                    isoformat = f'{y}-{m}-{d}'
                    dateObj = datetime.date.fromisoformat(isoformat)
                    time = '0' + time if len(time) <= 4 else time
                    timeObj = datetime.time.fromisoformat(time +':00')
                    DTobj = datetime.datetime.combine(dateObj, timeObj)
                    if prevDate != None:
                        diff = DTobj - prevDate
                        diff = diff.days + diff.seconds / 86400
                    else:
                        diff = 0
                    prevDate = DTobj
                    dateDiffs.append(diff)
                dateDF = pd.DataFrame({'Date' : dateDiffs})
                amountDF = pd.DataFrame({'Amount' : seriesTrans['amt'].values})
                latlongDF = pd.DataFrame({'Latitude' : seriesTrans['lat'].values, 'Longitude' : seriesTrans['long'].values})
                fraudDF = pd.DataFrame({'Label' : seriesTrans['is_fraud'].values})
                idDF = pd.DataFrame({'UserID' : [UserID for i in range(transPerSeries)], 'Series' : [series for i in range(transPerSeries)]})
                newDF = pd.concat([idDF, dateDF, amountDF, latlongDF, newDF, fraudDF], axis = 1)
                #print(newDF)

                series += 1
                decomposedDataset = pd.concat([decomposedDataset, newDF], axis = 0, ignore_index= True)
        UserID += 1
print(decomposedDataset)

decomposedDataset.groupby()
train_loader = data.DataLoader(data.TensorDataset(decomposedDataset))






#y = df[[-1]]

