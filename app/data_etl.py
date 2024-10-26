import csv
import flask

def read_file(filepath):
    with open(filepath) as csv_file:
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

        # print(period_month)
        # # print(period_table['Periodo de 06-01-2021 a 06-30-2021'])
        # print(period_table)
        clean_data={}
        for period, table in period_table.items():
            if table and period:
                # print(period)
                distribution_header = table[2][:3]
                transmission_header = table[2][4:]

                # Extracting data for Distribution and Transmission
                distribution_data = [[period]]
                transmission_data = [[period]]
                distribution_data.append(distribution_header)
                transmission_data.append(transmission_header)

                for row in table[3:]:
                    distribution_data.append(row[:3])
                    transmission_data.append(row[4:])

                clean_data[period] = {'transmission': transmission_data, 'distribution': distribution_data}


                # # Display the results
                # print("Distribution Data:")
                # for row in distribution_data:
                #     print(row)

                # print("\nTransmission Data:")
                # for row in transmission_data:
                #     print(row)
        print(clean_data)
        return clean_data


