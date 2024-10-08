from django.contrib import admin
from api.models import UserData

class UserDataAdmin(admin.ModelAdmin):
    list_display = ('author','paid','paid_date',)  # Use a comma to define a tuple

# Register the model with the custom admin class
admin.site.register(UserData, UserDataAdmin)
