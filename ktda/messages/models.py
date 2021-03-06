from django.db import models


class Template(models.Model):
    body =  models.TextField(verbose_name="Body")
    name = models.CharField(max_length=50)


    def __str__(self) -> str:
        return self.name
        

