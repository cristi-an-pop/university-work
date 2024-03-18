import pandas as pd
from sklearn import preprocessing

data_file = pd.read_csv("WA_Fn-UseC_-Telco-Customer-Churn.csv")

columns = ['customerID', 'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'tenure', 'PhoneService',
           'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport',
           'StreamingTV', 'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod', 'MonthlyCharges', 'TotalCharges', 'Churn']

enc = preprocessing.OrdinalEncoder()
data_file[columns] = enc.fit_transform(data_file[columns])

num_columns = ['tenure', 'MonthlyCharges', 'TotalCharges']
scaler = preprocessing.StandardScaler()
data_file[num_columns] = scaler.fit_transform(data_file[num_columns])

print(data_file)
