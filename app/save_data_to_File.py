#!/usr/bin/env python3
"""Main module to process CSV and save period table"""

import data_etl

def main():
    # Define the input and output file paths
    input_file = '../SAIDI_SAIFI_raw_FY24_Q4_v2.csv'
    output_file = '../output.csv'

    # Process the CSV file to create the period table
    period_table= data_etl.read_file(input_file)


    print(f"Period table saved to {output_file}")

if __name__ == '__main__':
    main()
