{"id":"generated.js",
"sources":[
	{
		"name":"BoardGroup",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"instances":{"$ref":"../Class/BoardGroup"},
			"description":"A group of boards",
			"properties":{
				"name":{
					"type":"string"
					},
				"boards":{
					"type":"array"
					}
				}
			}
		},
	{
		"name":"Board",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"instances":{"$ref":"../Class/Board"},
			"description":"A discussion board",
			"properties":{
				"title":{
					"type":"string",
					"optional":false
					},
				"url":{
					"type":"string",
					"optional":false
					},
				"description":{
					"type":"string"
					}
				}
			}
		},
	{
		"name":"Thread",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"instances":{"$ref":"../Class/Thread"},
			"description":"A discussion thread on a board",
			"properties":{
				"posts":{
					"type":"array",
					"default":[]
					},
				"lastPost":{
					"type":"integer"
					},
				"board":{
					"type":"object"
					}
				}
			}
		},
	{
		"name":"Post",
		"extends":"Object",
		"schema":{
			"extends":{"$ref":"../Class/Object"},
			"prototype":{
				},
			"instances":{"$ref":"../Class/Post"},
			"description":"A post in a thread",
			"properties":{
				"name":{
					"type":"string"
					},
				"email":{
					"type":"string"
					},
				"tripcode":{
					"type":"string"
					},
				"nameblock":{
					"type":"string"
					},
				"subject":{
					"type":"string"
					},
				"message":{
					"type":"string"
					}
				}
			}
		}]
}