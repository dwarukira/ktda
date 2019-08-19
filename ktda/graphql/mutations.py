import graphene
from ktda.students.models import Student, Factory, School, SchoolFees, SchoolPerformance
import datetime
from .types import (
        StudentInputType, 
        StudentType, 
        FeeInputType, 
        SchoolFeesType, 
        PerformanceInputType, 
        SchoolPerformanceType,
        SendMessageInputType
)


from ktda.students.sms import send_sms
from jinja2 import Template


class CreateStudents(graphene.Mutation):
    
    class Arguments:
        input = StudentInputType(
            description="Fields required to create a student.", required=True
        )
    
    student = graphene.Field(StudentType)

    # TODO better error handling
    def mutate(self, info, input):
        factory = Factory.objects.get(pk=input.factory) 
        input['factory'] = factory


        school = School.objects.get(pk=input.school) 
        input['school'] = school


        qs = Student.objects.create(**input, year=datetime.date.today().year)
        
        return CreateStudents(student=qs)

class CreateFee(graphene.Mutation):
    
    class Arguments:
        input = FeeInputType(
            description="Fields required to create a fee for a student.", required=True
        )
    
    fee = graphene.Field(SchoolFeesType)
    
    def mutate(self, info, input):
        student = input["student"]
    
        student = Student.objects.get(student_id=student) 
        input["student"] = student

        qs = SchoolFees.objects.create(**input)

        return CreateFee(
            fee = qs
        )


class CreatePerformance(graphene.Mutation):

    class Arguments:
        input = PerformanceInputType(
            description="Field required to crea s student performance", required=True
        )

    performance = graphene.Field(SchoolPerformanceType)


    # TODO better error handling
    def mutate(self, info, input):
        student = Student.objects.get(student_id = input.student)
        input['student'] = student

        print(input)
        p =  SchoolPerformance.objects.create(**input)
        return CreatePerformance(
            performance = p 
        )

class SendSms(graphene.Mutation):

    class Arguments:
        input = SendMessageInputType(
            description="", required=True
        )

    ok = graphene.Boolean()

    def mutate(self, info, input):
        template = Template(input.message)
        message = template.render(name='John Doe')
        send_sms(message,["+254713131343"])

        return True




class Mutation(graphene.ObjectType):
    create_student = CreateStudents.Field()
    create_fee = CreateFee.Field()
    create_performance = CreatePerformance.Field()

    send_sms = SendSms.Field()