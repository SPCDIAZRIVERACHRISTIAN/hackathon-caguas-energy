import csv

with open('../SAIDI_SAIFI_raw_FY24_Q4_v2.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    csv_reader = list(csv_reader)
    #title = csv_reader[3]
    period_table = {}
    # starting point for tables locations
    sp=3
    ep=10
    # end starting point

    # Loop for col
    for j in range(3, 78):
        # define storage
        period_month = ''
        temp_list=[]

        # loop for rows
        for i in range(21):
            if i == 3:
                temp_table = csv_reader[i][sp:ep]
                if len(temp_table) >0:
                    temp_month =temp_table[0].rstrip()
                    period_month = temp_month
                    temp_list.append(temp_table)
            elif i > 3:
                temp_table = csv_reader[i][sp:ep]
                if len(temp_table) >0:
                    temp_list.append(temp_table)
        period_table[period_month]=temp_list
        # break
        ep+=8
        sp+=8

    print(period_month)
    print(period_table['Periodo de 06-01-2021 a 06-30-2021'])
    print(period_table)
