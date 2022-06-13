from django.apps import AppConfig


class AppSettingConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_setting'

    def ready(self):
        from . import signals
        from .ap_scheduler import start
        from .models import kintone_setting_model
        i = kintone_setting_model.objects.get(id=1)
        if i.automation_update_mode == 1:
            start()