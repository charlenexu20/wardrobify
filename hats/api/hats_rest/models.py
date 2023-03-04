from django.db import models

# Create your models here.
class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True, blank=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.closet_name} {self.section_number} {self.shelf_number}"


class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )
