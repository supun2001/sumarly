from django.contrib import admin
from django.utils import timezone
from datetime import timedelta
from api.models import UserData

class UserDataAdmin(admin.ModelAdmin):
    list_display = ('author', 'paid', 'paid_date')  # Display these fields in the list view
    search_fields = ('author__username', 'paid_date')  # Add search functionality

    # Custom admin action to check and update paid_date and paid status
    def update_paid_status(self, request, queryset):
        # Get the current date
        today = timezone.now().date()

        # Iterate through selected user data
        for user_data in queryset:
            # Check if the paid date is more than 30 days old
            if user_data.paid_date.date() < today - timedelta(days=30):
                # Update the paid date to today and set paid to False
                user_data.paid_date = today
                user_data.paid = False
                user_data.save()

        # Add a success message
        self.message_user(request, "Selected records have been updated where applicable.")

    # Short description for the action button
    update_paid_status.short_description = "Check and update paid status for 30+ day old payments"

    # Register the custom action
    actions = [update_paid_status]

# Register the model with the custom admin class
admin.site.register(UserData, UserDataAdmin)
