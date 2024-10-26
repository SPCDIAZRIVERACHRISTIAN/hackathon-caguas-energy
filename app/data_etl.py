import csv

with open('../SAIDI_SAIFI_raw_FY24_Q4.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    csv_reader = list(csv_reader)
    #title = csv_reader[3]
    
    period_month = ''
    period_table = []

    for i in range(21):
        if i == 3:
            temp_table = csv_reader[i][3:10]
            temp_month = temp_table[0]
            period_month = temp_month
            period_table.append(temp_table)
        elif i > 3:
            temp_table = csv_reader[i][3:10]
            period_table.append(temp_table)

    print(period_month)
    print(period_table)