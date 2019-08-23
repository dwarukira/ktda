from django.core.management.base import BaseCommand , CommandError

import pandas as pd

class Command(BaseCommand):
    help = """ Create's a new school list """

    def add_arguments(self, parser):
        parser.add_argument('--filename', type=str)
        # parser.add_argument('--year', type=int)

    def handle(self, *args, **options):
        # TODO read the data from spreedsheet
        # - Create a school object for every value
        # - OR try buld insert
        filename = options["filename"]

        print(filename)

        try:
            df = pd.read_excel(filename, sheet_name="school")
        
        except Exception:
            raise CommandError(f"😔 Sorry could not read the file. {filename} ") 

        print(df)
        for index, row in df[0:].iterrows():
            print("------------------- \n" ,row[-1], "\n-------------------\n")
            # print(df.iloc[index])