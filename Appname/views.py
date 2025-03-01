from django.shortcuts import render

def first_page(request):
    return render(request, 'Appname/پرداخت آنلاین - موسسه خیریه محک.html')

def second_page(request):
    return render(request, 'Appname/آسان پرداخت پرشین (آپ).html')