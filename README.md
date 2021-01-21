# :seedling:MIA
> 웹툰 자동화를 위한 사진-애니메이션 자동 변환 웹 서비스, MIA의 repository입니다. 

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
