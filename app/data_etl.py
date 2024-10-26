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

        print(period_month)
        print(period_table['Periodo de 06-01-2021 a 06-30-2021'])
        print(period_table)

        return period_table


def save_period_table_to_csv(period_table, output_file):
    """Saves the period_table dictionary to a CSV file.

    Args:
        period_table (dict): The dictionary containing period data.
        output_file (str): The path to the output CSV file.
    """
    with open(output_file, mode='w', newline='') as file:
        csv_writer = csv.writer(file)

        # Write the header
        csv_writer.writerow(['Period Month', 'Data'])

        # Iterate over the period_table dictionary
        for period_month, data_list in period_table.items():
            # Write the period month
            csv_writer.writerow([period_month])

            # Write the data for the period month
            for data in data_list:
                csv_writer.writerow([''] + data)  # Indent data rows for clarity

# Example usage
period_table = {
    'Periodo de 06-01-2021 a 06-30-2021': [['data1', 'data2'], ['data3', 'data4']],
    'Periodo de 07-01-2021 a 07-31-2021': [['data5', 'data6'], ['data7', 'data8']]
}

save_period_table_to_csv(period_table, 'output.csv')
