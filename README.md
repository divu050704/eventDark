# ignisAssignment

## Screenshots

### Home page
> There are no events added yet
![image](https://github.com/divu050704/ignisAssignment/assets/70474633/d4974548-015a-461c-a251-7d55f7e827e8)

### Login to create new event after signup
> Signup
![image](https://github.com/divu050704/ignisAssignment/assets/70474633/e8494350-59e4-430f-9f32-adc1c89fa3ab)

> Login
![image](https://github.com/divu050704/ignisAssignment/assets/70474633/ebaa9e27-a2b9-435f-8542-c522b8c42348)

![image](https://github.com/divu050704/ignisAssignment/assets/70474633/5611d2b8-eaa7-49c7-85b4-8dd46856c0d2)

### Create new event

![image](https://github.com/divu050704/ignisAssignment/assets/70474633/479b7adb-2f85-4cf8-a788-779df326fd68)
> After adding multiple events by new user
![image](https://github.com/divu050704/ignisAssignment/assets/70474633/9a6b28c3-d25f-46b1-a297-bac564cce3a0)

> User tab for second user 
![image](https://github.com/divu050704/ignisAssignment/assets/70474633/b44e4c99-836b-4b35-92d6-604013b49fce)

### Like function
![image](https://github.com/divu050704/ignisAssignment/assets/70474633/bfc76ca9-8444-42f4-92b6-836007aa353c)
> Comfirmation in database for admin2 (user2)
![image](https://github.com/divu050704/ignisAssignment/assets/70474633/673d3906-f3c8-4f23-bdb8-5cb284e785c9)


## Installing development environemt
### Backend
- Edit `backend/ignis/settings.py` to add database credentials of MySQL.
- Craete database named `ignis` in MySQL.
- Now in `backend/` directory make migrations to the database
```console
python .\manage.py makemigrations 
```

- Migrate it to database
```console
python .\manage.py migrate
```

- Runuserver
```console
python .\manage.py runserver
```

- Backend work is done

### Frontend

- Move to `\Frontend\` directory.
- Install packages
```console
npm i
```
- Run dev server.
```console
npm run dev
```
- We are done... head to the Local URL.


## Important Files

### Frontend

#### jsFiles
- [App.jsx](https://github.com/divu050704/ignisAssignment/blob/main/Frontend/src/App.jsx)
- [Home.jsx](https://github.com/divu050704/ignisAssignment/blob/main/Frontend/src/components/Home.jsx)
- [Login.jsx](https://github.com/divu050704/ignisAssignment/blob/main/Frontend/src/components/Login.jsx)
- [Upload.jsx](https://github.com/divu050704/ignisAssignment/blob/main/Frontend/src/components/Upload.jsx)

#### CSS Files
- [Home.css](https://github.com/divu050704/ignisAssignment/blob/main/Frontend/src/css/Home.css)
- [Login.css](https://github.com/divu050704/ignisAssignment/blob/main/Frontend/src/css/Login.css)


### Backend
- [ignis/settings.py](https://github.com/divu050704/ignisAssignment/blob/main/backend/ignis/settings.py)
- [api/models.py](https://github.com/divu050704/ignisAssignment/blob/main/backend/api/models.py)
- [api/views.py](https://github.com/divu050704/ignisAssignment/blob/main/backend/api/views.py)
- [api/urls.py](https://github.com/divu050704/ignisAssignment/blob/main/backend/api/urls.py)

