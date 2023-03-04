# Wardrobify

Team:

* Alissa Renteria - Shoes microservice
* Charlene Xu - Hats microservice

## Design

## Shoes microservice
I Created two seperate models, one for Shoes and a BinVO.

For shoes, the required details needed to be input were the manufacturer name, model name, color and photo url however, it also needed a bin field which would link it to the BinVO model.

The BinVO model had the job of storing all the different information provided from the Bin in my Wardrobes and then would create a unique reference.

This would then provide a bin size, a unique bin number and the name of where it is stored aka the closet. I decided to input a bin size to see how much is being stored within that specific bin!
## Hats microservice

- Install Django app into Django project settings
- Create models in models.py with LocationVO and Hats
- Make function views to show the list of hats and detail of hat in views.py
- Configure the views in a URLs file in the Django app
- Include the URLs from the Django app into Django project's URLs
- Register in admin.py
- Check Insomnia to see an empty list of hats
- Create HatForm.js and HatsList.js in src
- Import both forms to App.js
- Route the existing navigation links to my components in Nav.js
- Test all out and make everything works fine
