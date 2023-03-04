from django.shortcuts import render
from .models import Hat, LocationVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    ]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style",
        "color",
        "picture_url",
        "id",
    ]

    def get_extra_data(self, o):
        return {
            "location": o.location.closet_name
        }


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder = HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            print(location_href)
            location = LocationVO.objects.get(import_href=location_href)
            print(location)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Location does not exist"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_hat(request, pk):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=pk)
        except Hat.DoesNotExist:
            return JsonResponse(
                {"message": "Hat doesn not exist"}
            )
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
