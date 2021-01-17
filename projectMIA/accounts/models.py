from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone



class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, user_id, user_name, user_email, password):
        if not user_id : 
            raise ValueError('아이디를 입력하세요.')
        user = self.model(
            user_id = user_id,
            user_name = user_name,
            user_email = user_email,
            password = password
        )
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, user_name, user_email, password):
        user = self.create_user(
            user_id = user_id,
            user_name = user_name,
            user_email = user_email,
            password = password
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user



class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()

    user_id = models.CharField(primary_key=True, max_length=36, unique=True)
    user_name = models.CharField(max_length=30, blank=True, null=True)
    user_email = models.CharField(max_length=50, blank=True, null=True)

    is_active = models.IntegerField(blank=True, null=True)
    is_admin = models.IntegerField(blank=True, null=True)
    is_superuser = models.IntegerField(blank=True, null=True)
    date_joined = models.DateField(blank=True, null=True)
    last_login = models.DateField(blank=True, null=True)

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['user_name', 'user_email']


    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        db_table = 'user'

    def __str__(self):
        return self.user_id
    
    def get_full_name(self):
        return self.user_id
    
    def get_short_name(self):
        return self.user_id

    @property
    def is_staff(self):
        return self.is_superuser



class UserGroups(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    group = models.ForeignKey('mia.AuthGroup', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user_groups'
        unique_together = (('user', 'group'),)


class UserUserPermissions(models.Model):
    user = models.ForeignKey(User, models.DO_NOTHING)
    permission = models.ForeignKey('mia.AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user_user_permissions'
        unique_together = (('user', 'permission'),)




