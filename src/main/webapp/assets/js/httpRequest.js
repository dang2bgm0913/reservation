let xhrRequest = {
		xhr : null,
		getXMLHttpRequest : function() {
			if (window.ActiveXObject) {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e1) {
						return null;
					}
				}
			} else if (window.XMLHttpRequest) {
				return new XMLHttpRequest();
			} else {
				return null;
			}
		},

		send : function(info, params, callback) {
			xhr = xhrRequest.getXMLHttpRequest();
			var httpParams = (params == null || params == '') ? null : params;
			xhr.open(info.method, info.url, true);
//			xhr.setRequestHeader('Content-Type',
//					'application/x-www-form-urlencoded; charset=UTF-8');
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
//					console.log(this.responseText);
					callback(this.responseText);
				}
			};
			xhr.send(info.method == 'POST' ? httpParams : null);
		}
	}

