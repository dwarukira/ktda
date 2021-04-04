from django.db import models
import datetime
import uuid 
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator

import base64
import uuid

def make_id():
    return base64.b64encode(uuid.uuid4().bytes).decode("utf-8").rstrip('=').replace('/', 'r')


def current_year():
    return datetime.date.today().year

def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)    


def year_choices():
    return [(r,r) for r in range(1984, datetime.date.today().year+1)]

def compare_year(v):
    print(v)


class Factory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)



    def __str__(self):
        return f'{self.name}'

class University(models.Model):
    name = models.CharField(max_length=64)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return f'{self.name}'

class Form(models.Model):
    name = models.CharField(max_length=16)


    def __str__(self):
        return f'{self.name} - {self.year}'

class School(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    email = models.CharField(max_length=128, blank=True)
    phone = models.CharField(max_length=64, blank=True) 
    address = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return f'{self.name}'

class Student(models.Model):
    GENDER_CHOICES = (
        ("F", 'Female'),
        ("M", 'Male'),
        ('O', "Others")
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    student_id = models.CharField(max_length=50, unique=True, default=make_id,  db_index=True)


    name = models.CharField(max_length=64)
    factory = models.ForeignKey(Factory, on_delete=models.CASCADE)
    gender = models.CharField(max_length=2,
                                default='F',
                                choices=GENDER_CHOICES)

    
    kcpe = models.IntegerField() 
    kcse = models.CharField(max_length=64, null=True, blank=True)
    year = models.IntegerField('year', validators=[MinValueValidator(2013), max_value_current_year])
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students')
    university = models.ForeignKey(University, on_delete=models.CASCADE, blank=True, null=True, related_name='students')
    course_taken = models.CharField(max_length=64)
    contact =  models.CharField(max_length=50, blank=True)
    guardian_contact  = models.CharField(max_length=50, blank=True)
    kcpe_index = models.CharField("Index Number", max_length=30, blank=True, null=True)
    kcse_index = models.CharField("Index", max_length=30, blank=True, null=True)

    def get_years(self, f):
        seen = []

        for i in f:
            if i.year not in seen:
                seen.append(i.year)
        
        return seen

    @property
    def total_annual_fee(self):
        f = self.fee.all()
        years = self.get_years(f)
        total = []
        p = 0
        for i in years:
            l = list(filter(lambda d: d.year in [i], f))
            t = 0
            for j in l:
                t += j.ammount
            
            if p == 0:
                inc = 0
            else:
                inc = (t - p) / p    
            total.append({ "year": i, "total": t, "increase": inc * 100 })
            p = t

        return total

    @property
    def total_spent(self):
        total = self.total_annual_fee
        t = 0
        for i in total:
            t += i['total']

        return t



    def __str__(self):
        return f'{self.name}'


class SchoolPerformance(models.Model):
    TERM_CHOICES = (
        ("1","TERM 1"),
        ("2","TERM 2"),
        ("3","TERM 3")
    )

    FORM_CHOICES = (
        ("1","FORM 1"),
        ("2","FORM 2"),
        ("3","FORM 3"),
        ("4","FORM 4")
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='performance')
    form = models.CharField(max_length=2, default='1', choices=FORM_CHOICES)
    term = models.CharField(max_length=2,
                            default='1',
                            choices=TERM_CHOICES
    )
    year = models.IntegerField('year', validators=[MinValueValidator(2013), max_value_current_year])
    grade = models.CharField(max_length=4)
    document = models.ForeignKey('Document', blank=True, null=True, on_delete=models.SET_NULL, related_name='performance')


    def __str__(self):
        return f'{self.student.name} - {self.grade}'

class SchoolFees(models.Model):
    TERM_CHOICES = (
        ("1","TERM 1"),
        ("2","TERM 2"),
        ("3","TERM 3")
    )

    FORM_CHOICES = (
        ("1","FORM 1"),
        ("2","FORM 2"),
        ("3","FORM 3"),
        ("4","FORM 4")
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='fee')
    form = models.CharField(max_length=2, default='1', choices=FORM_CHOICES)
    term = models.CharField(max_length=2,
                            default='1',
                            choices=TERM_CHOICES
    )

    year = models.IntegerField('year', validators=[MinValueValidator(2013), max_value_current_year])
    # TODO change to money 
    ammount = models.DecimalField(max_digits=8, decimal_places=2)
    document = models.ForeignKey('Document', blank=True, null=True, on_delete=models.SET_NULL, related_name="fee")
    
    def __str__(self):
        return f'{self.student.name} - {self.ammount} - {self.year}'



def upload_path_handler(instance, filename):
    return f"documents/{instance.student.name}/{filename}"

class Document(models.Model):
    CONSET_DOC = 1
    PERF_DOC = 2
    APP_DOC = 3
    FEE_DOC = 4
    DOC_CHOICES = (
        (CONSET_DOC, "Conset form"),
        (PERF_DOC, "Perfomance "),
        (APP_DOC, "application details"),
        (FEE_DOC, "fee statement")

    )
    name = models.CharField(max_length=64, unique=False, null=True, blank=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='documents')
    desc = models.TextField(unique=False, null=True, blank=True)
    document = models.FileField(upload_to=upload_path_handler)
    doc_type = models.IntegerField(
                            default=FEE_DOC,
                            choices=DOC_CHOICES)


    def __str__(self):
        return f'{self.name} - {self.student} -  {str(self.fee)} -  {str(self.perfomance)}'


class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    image = models.ImageField(upload_to='images/users', default="images/users/user.png")

