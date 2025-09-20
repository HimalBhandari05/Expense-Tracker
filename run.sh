cd Backend
gnome-terminal -- bash -c "source venv/bin/activate && python3 manage.py runserver && exec bash"


cd ../Frontend
gnome-terminal -- bash -c "npm run dev; exec bash"