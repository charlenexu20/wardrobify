
from .models import Shoes, BinVO
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


class BinEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "id",
        "import_href",
        "closet_name",
        "bin_num",
        "bin_size",
    ]
class ShoesEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "id",
        "manufacturer_name",
        "model_name",
        "color",
        "photo",
        "bin",
    ]
    encoders = {
        "bin": BinEncoder(),
    }

class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "id",
        "manufacturer_name",
        "model_name",
        "color",
        "photo",
        "bin",
    ]
    encoders = {
        "bin": BinEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_shoes(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes":shoes},
            encoder = ShoesEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)


        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Sorry this bin isn't available"}
            )
        shoes = Shoes.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_shoe(request, pk):
    if request.method == "GET":
        try:
            shoes = Shoes.objects.get(id=pk)
            return JsonResponse(
                shoes,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Sorry this shoe does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        count, _ = Shoes.objects.filter(id=pk).delete()
        return JsonResponse({"successfully deleted!": count > 0})

@require_http_methods(["GET"])
def api_binVO(request):
    if request.method == "GET":
        bin = BinVO.objects.all()
        return JsonResponse(
            {"Bins": bin},
            encoder=BinEncoder,
            safe=False
        )
