# ignisAssignment

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
