# :seedling:MIA
> 웹툰 자동화를 위한 사진-애니메이션 자동 변환 웹 서비스, MIA의 repository입니다. 

## Content 
> - [0. Requirements](#0.-Requirements) 
> - [1. (Mac) Project Setup](#1.-Project-Setup-(Mac))
> - [2. (Windows) Project Setup](#2.-Project-Setup-(Windows))

## 0. Requirements
> - BACKEND (Django APP Server)
> - FRONTEND (React Webapp Client)
> - DB (MySQL)
> - AI

## 1. Project Setup (Mac)
### 1-1. 환경 세팅

- git clone 

  ```
  $ git clone https://github.com/Team-BDC/MIA
  $ cd MIA
  ```
  
- 가상환경 생성 및 활성화 

  ```
  $ python3 -m venv venv
  $ source venv/bin/activate
  (venv) $
  ```
- 필요 패키지 설치

  ```
  (venv) $ cd projectMIA
  (venv) $ pip3 install -r requirements.txt
  ```
 
### 1-2. Backend : Django 세팅
- Django Setup

  ```
  (venv) $ python3 manage.py makemigrations
  (venv) $ python3 manage.py migrate
  (venv) $ python3 manage.py collectstatic
  ```
  
 - Django Admin

  ```
  (venv) $ python3 manage.py createsuperuser
  ```
  
 - Runserver

  ```
  (venv) $ python3 manage.py runserver
  ```
  
### 1-3. Frontend : React 세팅
- yarn 설치 및 구동

  ```
  (venv) $ npm install -g yarn
  (venv) $ yarn install
  (venv) $ yarn start
  ```
  
### 1-4. Docker
- docker compose build&up

  ```
  (venv) $ cd MIA
  (venv) $ docker-compose up --build
  ```
 - docker compose 실행

  ```
  (venv) $ docker-compose up 
  ```
  
 - docker compose 중지

  ```
  (venv) $ docker-compose stop 
  ```
  
  ### 1-4. DB : setting

 - init.sql : 스키마 생성 ->
   MySQL 8.0 Command Line Client 
  ```
  mysql> create schema 'miadb'
  ```
   MySQL Workbench에서 해당 파일 불러와서 실행(Execute)


 - settings.py(MIA/projectMIA/setting.py) : 
   user, password 수정
  
  
## 2. Project Setup (Windows)
