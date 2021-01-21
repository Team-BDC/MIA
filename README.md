# :seedling:MIA
> 웹툰 자동화를 위한 사진-애니메이션 자동 변환 웹 서비스, MIA의 repository입니다. <br />
> 웹캠과 파일 업로드를 통해 누구나 사진을 애니메이션화 시킬 수 있으며, 회원은 결과물을 갤러리에서 모아 볼 수 있습니다. <br />
> MIA와 함께 애니메이션 캐릭터가 된 자신을 만나보세요!

## Content 
> - [0. Requirements](#requirements) 
> - [1. (Mac) Project Setup](#mac-project-setup)
> - [2. (Windows) Project Setup](#windows-project-setup)
> - [3. EndPoints](#backend-endpoints)
> - [4. References](#references)

## requirements

> - BACKEND (Django APP Server)
>   - Python 3.7
>   - Django==3.1.5
>   - Django REST Framework==3.12.2
>   - Django REST Knox==4.1.0
>  <br/>
> 
> - FRONTEND (React Webapp Client)
>   - React 17.0.1
>   - React DOM 17.0.1
>   - Axios 0.21.1
>   - React Redux 7.2.2
>  <br/>
>
> - AI
>   - tensorflow==1.14(<=1.15.2)
>   - python 3.7
>   - numpy==1.16.4
>   - scipy==1.4.1
>   - keras==2.3.1
>   - pillow==latest
>   - cmake(for window)
>   - dlib(for window)
>   - pywin32(for window)
> <br/>
>
> - 기타 요구사항
>   - MySQL 8.0.22
>   - Docker 20.10.2

## mac project setup
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
  
  ### 1-5. DB : setting

 - init.sql : 스키마 생성 ->
   MySQL 8.0 Command Line Client 
  ```
  mysql> create schema 'miadb'
  ```
   MySQL Workbench에서 해당 파일 불러와서 실행(Execute)


 - settings.py(MIA/projectMIA/setting.py) : 
   user, password 수정
  
  
## windows project setup 
### 2-1. 환경 세팅

- git clone 

  ```
  $ git clone https://github.com/Team-BDC/MIA
  $ cd MIA
  ```
  
- 가상환경 생성 및 활성화 

  ```
  $ python -m venv venv
  $ source venv/bin/activate
  (venv) $
  ```
- 필요 패키지 설치

  ```
  (venv) $ cd projectMIA
  (venv) $ pip install -r requirements.txt
  ```
 
### 2-2. Backend : Django 세팅
- Django Setup

  ```
  (venv) $ python manage.py makemigrations
  (venv) $ python manage.py migrate
  (venv) $ python manage.py collectstatic
  ```
  
 - Django Admin

  ```
  (venv) $ python manage.py createsuperuser
  ```
  
 - Runserver

  ```
  (venv) $ python manage.py runserver
  ```
  
### 2-3. Frontend : React 세팅
- yarn 설치 및 구동

  ```
  (venv) $ npm install -g yarn
  (venv) $ yarn install
  (venv) $ yarn start
  ```
  
### 2-4. Docker
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
  
  ### 2-5. DB : setting

 - init.sql : 스키마 생성 ->
   MySQL 8.0 Command Line Client 
  ```
  mysql> create schema 'miadb'
  ```
   MySQL Workbench에서 해당 파일 불러와서 실행(Execute)


 - settings.py(MIA/projectMIA/setting.py) : 
   user, password 수정
   
## backend endpoints
> - 회원(User) 리소스 관련 API
> 
>   |  HTTP |  Path |  Method |  Permission |  목적 |
>   | --- | --- | --- | --- | --- |
>   |**POST** |/api/v1/user/register| CREATE | Access Token |하나의 User 생성|
>   |**POST** |/api/v1/user/login| OPTIONS | Access Token |하나의 User 접속|
>   |**GET** |/api/v1/user/user| VALIDATE | Access Token |현재 접속 중인 User 조회|

> - 인증(Token 발급 및 갱신) 관련 API
> 
>   |  HTTP |  Path |  Method |  Permission |  목적 |
>   | --- | --- | --- | --- | --- |
>   |**POST** |/api/v1/user/auth/login| OPTIONS | None |ID 토큰을 받아 KNOX를 반환|
>   |**POST** |/api/v1/user/auth/logout| OPTIONS | Access Token |하나의 User 로그아웃|
>   |**POST** |/api/v1/user/auth/logoutall| OPTIONS | Access Token |전체 User 로그아웃 |

> - 변환 관련 API
> 
>   |  HTTP |  Path |  Method |  Permission |  목적 |
>   | --- | --- | --- | --- | --- |
>   |**GET,POST** |/api/v1/mia/gallery_test| OPTIONS | (테스트용)갤러리 호출|
>   |**GET,POST** |/api/v1/mia/model| OPTIONS | None |사진 변환 모델 호출|

## references
