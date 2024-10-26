import csv

with open('../SAIDI_SAIFI_raw_FY24_Q4.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        print(row[3:10])
        
    print(f'Processed {line_count} lines.')