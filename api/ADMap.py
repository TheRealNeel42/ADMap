from subprocess import Popen, PIPE 
from flask import Flask, request
from flask_cors import CORS
import json
import re

app = Flask(__name__)
CORS(app)

#load package locations from config file
with open('../config.json') as config_file:
    cfg = json.load(config_file)


WINDAPSEARCH = cfg['windapsearch']
IMPACKET = cfg['impacket']
PORT = cfg['port']
GETNPUSERS = IMPACKET+'/GetNPUsers.py'
GETUSERSPNS = IMPACKET+'/GetUserSPNs.py'

#check IP return a boolean if an IP address is valid
def check_ip(ip):
	regex = '''^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.( 
	            25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.( 
	            25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.( 
	            25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)'''
	if(re.search(regex, ip)):  
		return True      
	else:  
		return False

@app.route('/')
def index():
    return "ADMap Online!"

@app.route('/users')
def users():
	dcip = request.args.get('dcip')

	if request.args.get('username'):
		username = request.args.get('username')
	else:
		username = ""

	if request.args.get('password'):
		password = request.args.get('password')
	else:
		password = ""

	#first check that ip was given
	if not dcip:
		no_dcip = []  
		no_dcip.append("No domain controller IP address given")
		no_dc_json = json.dumps(no_dcip)
		return no_dc_json
	#now check it is a valid IP
	if not check_ip(dcip):
		bad_dcip = []  
		bad_dcip.append("Invalid IP format")
		bad_dc_json = json.dumps(bad_dcip)
		return bad_dc_json

	if username and password:
		p = Popen([WINDAPSEARCH, '-u', username, '-p', password, '--dc-ip', dcip, '-U', '--full' ], stdin=PIPE, stdout=PIPE, stderr=PIPE) 
		output, err = p.communicate(b"input data that is passed to subprocess' stdin")
	else:
		p = Popen([WINDAPSEARCH, '--dc-ip', dcip, '-U', '--full'], stdin=PIPE, stdout=PIPE, stderr=PIPE) 
		output, err = p.communicate(b"input data that is passed to subprocess' stdin")		
	_output = []
	_output.append(output)
	users_json = json.dumps(_output)
	return users_json

@app.route('/userspns')
def userspns():
	dcip = request.args.get('dcip')

	if request.args.get('username'):
		username = request.args.get('username')
	else:
		username = ""

	if request.args.get('password'):
		password = request.args.get('password')
	else:
		password = ""

	#first check that ip was given
	if not dcip:
		no_dcip = []  
		no_dcip.append("No domain controller IP address given")
		no_dc_json = json.dumps(no_dcip)
		return no_dc_json
	#now check it is a valid IP
	if not check_ip(dcip):
		bad_dcip = []  
		bad_dcip.append("Invalid IP format")
		bad_dc_json = json.dumps(bad_dcip)
		return bad_dc_json

	if username and password:
		p = Popen([WINDAPSEARCH, '-u', username, '-p', password, '--dc-ip', dcip, '--user-spns'], stdin=PIPE, stdout=PIPE, stderr=PIPE) 
		output, err = p.communicate(b"input data that is passed to subprocess' stdin")

	else:
		p = Popen([WINDAPSEARCH, '--dc-ip', dcip, '--user-spns'], stdin=PIPE, stdout=PIPE, stderr=PIPE) 
		output, err = p.communicate(b"input data that is passed to subprocess' stdin") 		

	_output = []
	_output.append(output)
	spns_json = json.dumps(_output)
	return spns_json

@app.route('/asrep')
def asrep():
	dcip = request.args.get('dcip')
	domain = request.args.get('domain')

	#first check that ip was given
	if not dcip:
		no_dcip = []  
		no_dcip.append("No domain controller IP address given")
		no_dc_json = json.dumps(no_dcip)
		return no_dc_json
	#now check it is a valid IP
	if not check_ip(dcip):
		bad_dcip = []  
		bad_dcip.append("Invalid IP format")
		bad_dc_json = json.dumps(bad_dcip)
		return bad_dc_json

	#now check domain
	if not domain:
		no_domain = []  
		no_domain.append("No domain name was given")
		no_domain_json = json.dumps(no_domain)
		return no_domain_json

	domain = domain + '/'
	p = Popen([GETNPUSERS, domain, '-dc-ip', dcip], stdin=PIPE, stdout=PIPE, stderr=PIPE) 
	output, err = p.communicate(b"input data that is passed to subprocess' stdin") 	
	_output = []
	_output.append(output)
	asrep_json = json.dumps(_output)
	return asrep_json

@app.route('/kerberoast')
def kerberoast():
	dcip = request.args.get('dcip')
	domain = request.args.get('domain')
	username = request.args.get('username')
	password = request.args.get('password')


	#first check that ip was given
	if not dcip:
		no_dcip = []  
		no_dcip.append("No domain controller IP address given")
		no_dc_json = json.dumps(no_dcip)
		return no_dc_json
	if not domain:
		no_domain = []
		no_domain.append("No Domain name was given")
		no_domain_json = json.dumps(no_domain)
		return no_domain_json
	#now check it is a valid IP
	if not check_ip(dcip):
		bad_dcip = []  
		bad_dcip.append("Invalid IP format")
		bad_dc_json = json.dumps(bad_dcip)
		return bad_dc_json

	if username and password:
		target = domain+"/"+username+":"+password
		p = Popen([GETUSERSPNS, target], stdin=PIPE, stdout=PIPE, stderr=PIPE) 
		output, err = p.communicate(b"input data that is passed to subprocess' stdin")

	else:
		output = "No Username or password was given to kerberoast"	

	_output = []
	_output.append(output)
	spns_json = json.dumps(_output)
	return spns_json

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=PORT, debug=True)


