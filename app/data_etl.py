import csv, re

def read_file(filepath):
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        csv_reader = list(csv_reader)
        period_table = {}

        # starting and endpoint for tables locations
        sp, ep = 3, 10

        # Loop for col
        for j in range(3, 78):
            # define storage
            period_month = ''
            temp_list=[]

            # loop for rows
            for i in range(21):
                if i == 3:
                    temp_table = csv_reader[i][sp:ep]
                    if len(temp_table) > 0:
                        temp_month = temp_table[0].rstrip()
                        date_regex = r"\d{2}-\d{2}-\d{4}"
                        matches = re.finditer(date_regex, temp_month, re.MULTILINE)
                        for matchNum, match in enumerate(matches, start=1):
                            period_month = match.group()
                        temp_list.append(temp_table)
                elif i > 3:
                    temp_table = csv_reader[i][sp:ep]
                    if len(temp_table) > 0:
                        temp_list.append(temp_table)
            period_table[period_month]=temp_list
            # break
            ep+=8
            sp+=8

        temp_data = {}
        for period, table in period_table.items():
            if table and period:
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

                temp_data[period] = {
                    'transmision': transmission_data,
                    'distribucion': distribution_data
                    }
        return temp_data

def group_data_by_period(data):
    grouped_data = {}
    for k, v in data.items():
        data_distribution = v['distribucion']
        data_transmission = v['transmision']
        data_d = {
            row[0].lower().replace(' ', '_'): {
                "saidi": row[1],
                "saifi": row[2]
            }
            for row in data_distribution[2:]
        }
        data_t = {
            row[0].lower().replace(' ', '_'): {
                "saidi": row[1],
                "saifi": row[2]
            }
            for row in data_transmission[2:]
        }
        grouped_data[k] = {
            'transmision': data_t,
            'distribucion': data_d
            }
    return dict(grouped_data)

def group_data_by_region(data):
    grouped_data = {}
    for date, categories in data.items():
        for category, regions in categories.items():
            for region, metrics in regions.items():
                if region not in grouped_data:
                    grouped_data[region] = {}
                if date not in grouped_data[region]:
                    grouped_data[region][date] = {}
                grouped_data[region][date][category] = metrics
    return dict(grouped_data)

def clean_data(temp_data):
    clean_data = {}
    grouped_by_period = group_data_by_period(temp_data)
    grouped_by_region = group_data_by_region(grouped_by_period)
    clean_data['by_period'] = grouped_by_period
    clean_data['by_region'] = grouped_by_region
    return clean_data


# Extract overall data
def overall_data(filepath):
    """This function extract the overall data from the file"""
    with open(filepath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        csv_reader = list(csv_reader)
        overall = {} # Create a dictionary to store the overall data

        #Starting and endpoint for tables locations
        sp, ep = 3, 6
