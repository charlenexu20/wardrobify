from django.contrib import admin
from .models import BinVO, Shoes

@admin.register(Shoes)
class ShoesAdmin(admin.ModelAdmin):
    list_display = [
        "manufacturer_name",
        "model_name",
        "color",
        "photo",
        "bin",
    ]

@admin.register(BinVO)
class BinVO(admin.ModelAdmin):
    bins = [
        "import_href",
        "closet_name",
        "bin_num",
        "bin_size",
    ]
