# from django.apps import AppConfig
# import html
# import pathlib
# import os
# import sys

# import tensorflow as tf # tensorflow 1.13.1+
# import cv2
# import dlib
# import numpy as np
# import matplotlib.pyplot as plt
# from glob import glob

# from .selfie2anime.UGATIT_noargs import UGATIT

# tf.logging.set_verbosity(tf.logging.ERROR)

# class Selfie2AnimeConfig(AppConfig):
#     folder_path=os.path.dirname(os.path.realpath(__file__)).replace('\\','/') #이게 mia까지.
#     checkpoint_path=folder_path+'/selfie2anime/checkpoint/UGATIT_selfie2anime_lsgan_4resblock_6dis_1_1_10_10_1000_sn_smoothing/UGATIT.model-1000000'

#     tf.reset_default_graph()
#     sess = tf.Session(config=tf.ConfigProto(allow_soft_placement=True))

#     gan = UGATIT()
#     gan.build_model()

#     saver = tf.train.Saver()
#     saver.restore(sess, checkpoint_path)
#     print(os.path.dirname(os.path.realpath(__file__)))

#     def ready(self):
#         pass
        
# class MiaConfig(AppConfig):
#     name = 'mia'