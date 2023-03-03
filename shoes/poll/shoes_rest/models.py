from django.db import models
from django.urls import reverse


class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=200)
    bin_num = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()

class Shoes(models.Model):
    manufacturer_name = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    photo = models.URLField(max_length=300)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )
    def get_api_url(self):
        return reverse("api_shoe", kwargs={"pk": self.pk})
