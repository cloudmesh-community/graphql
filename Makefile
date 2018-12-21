install:
	cd cloudmesh-graphql-server; pip install -r requirements.txt
	cd app; npm install --save-dev node-sass
	cd app; npm install; npm run build


test:
	@echo "==============================================================================="
	@echo "Start Service"
	@echo "==============================================================================="
	osascript -e 'tell application "Terminal" to do script "cd $(PWD); cd cloudmesh-graphql-server; python app.py"'
	@echo "==============================================================================="
	@echo "Start GUI"
	@echo "==============================================================================="
	osascript -e 'tell application "Terminal" to do script "cd $(PWD); cd app; npm start"'
	@echo "==============================================================================="
	@echo "Start browser"
	@echo "==============================================================================="
	@echo "Go to http://localhost:5000/graphql/"
