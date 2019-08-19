from django.core.management.base import BaseCommand, CommandError
import pandas as pd
from ktda.students.models import Factory, School, University, Student

def getGender(data):
    if data == 'F':
        return 'F'
    if data == 'M':
        return 'M'
    if data == 'Male':
        return 'M'
    if data == 'Female':
        return 'F'
    
    return 'O'

class Command(BaseCommand):
    help = 'Drops all the data and create again using a spressheet file provides. Use the command with alots of care'


    def add_arguments(self, parser):
        parser.add_argument('--filename', type=str)
        parser.add_argument('--year', type=int)
    
    def create_factory(self, name):
        return Factory.objects.get_or_create(name=name)

    def  create_school(self, name, email, phone, address):
        return School.objects.get_or_create(name=name, email=email, phone=phone, address=address)

    def create_uni(self, name):
        return  University.objects.get_or_create(name= name)

    def create_performance(self, school_performance, student, year):
        p_c = 0
        year = year
        form = 1
        for i in range(len(school_performance)):
            year_check = i // 3
            t = 1
            if p_c != year_check:
                year += 1 
                form += 1 
            p_c = year_check
            
            if i % 3 == 0:
                t = 1
            if i % 3 == 1:
                t  =  2
            if i % 3 == 2:
                t = 3
            p_value = school_performance[i]
           
            if(p_value != p_value):
                print("The Value can't be saved, Because i think it docent exist yet ", p_value)
            else: 
                student.performance.create(form=form, year=year, grade=school_performance[i], term=t)

    def create_fee(self, school_fee, student, year):
        p_year_check = 0
        year = year
        form = 1
        for i in range(len(school_fee)):
            year_check = i // 3
            t = 1
            if p_year_check != year_check:
                year += 1 
                form += 1 
            p_year_check = year_check
            
            if i % 3 == 0:
                t = 1
            if i % 3 == 1:
                t  =  2
            if i % 3 == 2:
                t = 3
            f_value = school_fee[i]
            if f_value != f_value:
                print("The Value can't be saved, Because i think it docent exist yet ", f_value)
            else:
                student.fee.create(form=form, year=year, ammount=school_fee[i], term=t)
    

    def handle(self, *args, **options):
            filename = options['filename']
            year = options['year']
            print(filename)
            if  not filename:
                self.stdout.write(self.style.ERROR(f'😡 What did you want me to do. Pliz provide a file and year to read from.'))
                return
            
            try:
                dfs = pd.read_excel(filename, sheet_name=str(year))
               
            except Exception:

                raise CommandError(f"😔 Sorry could not read the file. {filename} ")
            
            self.stdout.write(self.style.SUCCESS(f'🔥 Read the file {filename} - ${year}'))

            for index, row in dfs[2:].iterrows():
                factory = row[1]
                gender = getGender(row[3])
                name = row[2]
                school = row[4]
                kcpe = row[5]

                school_performance = row[6: 18]

                kcse = row[18]
                fee = row[19: 31]
                uni = row[31]
                course = row[32]
                contact = row[33]
                g_contact = row[34]
                school_c = row[35]
                s_a = row[36]

                f = self.create_factory(factory)[0]
                # TODO fix email and phone
                school = self.create_school(school, "", "", s_a)[0]
                if uni != uni:
                    uni = None

                else:
                    uni = self.create_uni(uni)[0]
                if kcse != kcse:
                    kcse = None
                student = Student.objects.create(name=name, 
                                                        gender=gender, 
                                                        kcse=kcse, 
                                                        kcpe=kcpe, 
                                                        school=school, 
                                                        factory=f, 
                                                        year=year,
                                                        university=uni, 
                                                        course_taken=course,
                                                        contact=contact,
                                                        guardian_contact=g_contact
                                                        )
                student.save()
                self.create_performance(school_performance, student, year)
                self.create_fee(fee, student, year)
                self.stdout.write(self.style.SUCCESS(f'New {student.name} 🚀'))